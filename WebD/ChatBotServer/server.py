from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import torch
import transformers
from transformers import pipeline
from langchain_huggingface import HuggingFacePipeline
from PyPDF2 import PdfReader
from langchain.text_splitter import SpacyTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, jsonify
from pyngrok import ngrok
import os
from dotenv import load_dotenv
import torch
import huggingface_hub

load_dotenv()

# Get tokens from environment variables
huggingface_token = os.getenv("HUGGINGFACE_TOKEN")
ngrok_token = os.getenv("NGROK_AUTH_TOKEN")

print(torch.cuda.is_available())  # This should return True if GPU is available
print(torch.cuda.device_count())  # This shows the number of GPUs available
print(torch.cuda.current_device())  # This shows the index of the current GPU
print(torch.cuda.get_device_name(0))  # This prints the name of your GPU


huggingface_hub.login(huggingface_token)

model_name = "meta-llama/Llama-3.2-3B"

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True, bnb_4bit_use_double_quant=True, bnb_4bit_quant_type="nf4", bnb_4bit_compute_dtype=torch.bfloat16
)

tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.add_special_tokens({'pad_token': '<PAD>'})

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    quantization_config=bnb_config
)

pline = pipeline(
    model=model,
    tokenizer=tokenizer,
    return_full_text=True,
    task='text-generation',
    max_new_tokens=512,
    temperature=0.7,
    top_p=0.95,
    repetition_penalty=1.15
    # use_cache=True
)

llm = HuggingFacePipeline(pipeline=pline)

embedder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

client = chromadb.Client()

collection = client.create_collection("document1")

def getchunks(text):
    splitter = SpacyTextSplitter(
        separator="\n\n",
        chunk_size=100,
        chunk_overlap=20,
        length_function=len,
    )
    return splitter.split_text(text)

def load_data_convert_to_chunks(pdf):
  text = ""
  for page in pdf.pages:
    text+=page.extract_text()
  return getchunks(text)

def generate_embeddings(text):
  return embedder.encode(text, convert_to_tensor=True)

def store_to_db(text):

  for i, chunk in enumerate(text):
    embedding = generate_embeddings(chunk).tolist()
    collection.add(
        documents = [chunk],
        embeddings = [embedding],
        ids = [f'{i}']
    )

def get_related_query(query):
  embeds = generate_embeddings(query)
  # print(query)
  # print(embeds)
  results = collection.query(
      # query_embeddings = [embeds.tolist()],
      query_texts = query,
      n_results = 3
  )
  # print(results['documents'])
  return results['documents']

def get_answer(query, context):
    print("------------------------")
    # context_text = " ".join(context)  # Join if context is a list
    prompt = f'''Context: {context}

Query: {query}

Based on the provided context, explain the answer in detail, focusing on the key concepts and providing a comprehensive explanation.
Answer:

'''
    # input = tokenizer(prompt, return_tensors='pt')
    # output = model.generate(**input, max_length=300)
    # return tokenizer.decode(output[0], skip_special_tokens=True)
    return llm.predict(prompt)


def answer_query(query):
  context = (get_related_query(query))
  answer = get_answer(query, context)
  return answer

  
def server_multiple_pdfs(pdfs):
  with ThreadPoolExecutor() as executor:
        results = list(executor.map(lambda pdf: store_to_db(load_data_convert_to_chunks(pdf)), pdfs))


pdf1 = PdfReader('./testing_pdf.pdf')
server_multiple_pdfs([pdf1])

ngrok.set_auth_token(ngrok_token)


app = Flask(__name__)

@app.route("/addData", methods=["POST"])
def update_knowledge_base():
    data = request.json
    newData = data.get("newdata")
    if newData:
        print(newData)
        chunks = getchunks(text=newData)
        store_to_db(chunks)
        return jsonify({"message": "Data added successfully"}), 200
    else:
        return jsonify({"message": "Couldn't add text"}), 400

@app.route("/query", methods=["POST"])
def query_api():
    data = request.json
    query = data.get("query")
    if query:
        answer = answer_query(query)
        return jsonify({"query": query, "answer": answer}), 200
    else:
        return jsonify({"error": "No query provided"}), 400

if __name__ == '__main__':
    port = 5000
    ngrok.set_auth_token(ngrok_token)
    public_url = ngrok.connect(port)
    print(f"Ngrok Tunnel URL: {public_url}")

    app.run(host='0.0.0.0', port=port)