import requests
from PyPDF2 import PdfReader
from langchain.text_splitter import SpacyTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Get tokens from environment variables
gemini_api_key = "AIzaSyB060WZBPz_EswunsAdpVwQxRAI4-5wf_4"

# Initialize Sentence Transformer embedder and ChromaDB client
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
        text += page.extract_text()
    return getchunks(text)

def generate_embeddings(text):
    return embedder.encode(text, convert_to_tensor=True)

def store_to_db(text):
    for i, chunk in enumerate(text):
        embedding = generate_embeddings(chunk).tolist()
        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f'{i}']
        )

def get_related_query(query):
    embeds = generate_embeddings(query)
    results = collection.query(
        query_texts=query,
        n_results=3
    )
    return results['documents']

def call_gemini_api(prompt):
    url = "https://api.gemini.com/v1/generate"  # Hypothetical Gemini API endpoint
    headers = {
        "Authorization": f"Bearer {gemini_api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": prompt,
        "max_tokens": 300,
        "temperature": 0.7,
        "top_p": 0.95
    }
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()  # Raises an error for a bad response
    return response.json().get("generated_text", "")

def get_answer(query, context):
    prompt = f"""Context: {context}

Query: {query}

Based on the provided context, explain the answer in detail, focusing on the key concepts and providing a comprehensive explanation.
Answer:
"""
    return call_gemini_api(prompt)

def answer_query(query):
    context = get_related_query(query)
    answer = get_answer(query, context)
    return answer

def server_multiple_pdfs(pdfs):
    with ThreadPoolExecutor() as executor:
        list(executor.map(lambda pdf: store_to_db(load_data_convert_to_chunks(pdf)), pdfs))

pdf1 = PdfReader('../testing_pdf.pdf')
server_multiple_pdfs([pdf1])

# Set up Flask app
app = Flask(__name__)

@app.route("/addData", methods=["POST"])
def update_knowledge_base():
    data = request.json
    newData = data.get("newdata")
    if newData:
        chunks = getchunks(newData)
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
    app.run(host='0.0.0.0', port=5000)
