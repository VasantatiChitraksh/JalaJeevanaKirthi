import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Forums.module.css';
import { useLocation } from 'react-router-dom';

import { GoogleGenerativeAI } from "@google/generative-ai"; //for getting the story, calling gemini api



const Forum = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [topic, setTopic] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyVisibility, setReplyVisibility] = useState({}); // Track which comments have their reply box open
    const [newReply, setNewReply] = useState(''); // Track the input for new replies
    const [currentReplyingTo, setCurrentReplyingTo] = useState(null); // Track which comment is being replied to


    const toggleReplyBox = (commentIndex) => {
        setReplyVisibility((prev) => ({
            ...prev,
            [commentIndex]: !prev[commentIndex]
        }));
    };

    const location = useLocation();
    const username = location.state?.username;

    console.log("Username in Forums page:", username)

    useEffect(() => {
        const fetchOrGenerateTopic = async () => {
            try {
                const response = await axios.get(`https://ug2-team3-se-webd-1.onrender.com/api/discussion?date=${selectedDate}`);
                if (response.data.topic !== "No topic available for this date.") {
                    setTopic(response.data.topic);
                } else {
                    const genAI = new GoogleGenerativeAI('AIzaSyB060WZBPz_EswunsAdpVwQxRAI4-5wf_4');
                    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                    const prompt = `Give me a topic for users to discuss upon, the topic should be related to marine life`;
                    const result = await model.generateContent(prompt);
                    const generatedTopic = result.response.text();
                    setTopic(generatedTopic);
                    await axios.post(`https://ug2-team3-se-webd-1.onrender.com/api/discussion/topic`, {
                        date: selectedDate,
                        topic: generatedTopic,
                    });
                }
            } catch (error) {
                console.error('Error fetching or generating topic:', error);
            }
        };

        fetchOrGenerateTopic();
        fetchDiscussion(selectedDate);
    }, [selectedDate]);

    const fetchDiscussion = async (date) => {
        try {
            const response = await axios.get(`https://ug2-team3-se-webd-1.onrender.com/api/discussion?date=${date}`);
            //setTopic(response.data.topic);
            setComments(response.data.comments || []);
        } catch (error) {
            console.error('Error fetching discussion:', error);
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            try {
                await axios.post(`https://ug2-team3-se-webd-1.onrender.com/api/discussion/comment`, {
                    date: selectedDate,
                    comment: newComment,
                    username // Add username in the payload if you have it stored on client side
                });
                setNewComment('');
                fetchDiscussion(selectedDate);
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    const handleReplySubmit = async (commentId) => {
        if (newReply.trim()) {
            try {
                await axios.post(`https://ug2-team3-se-webd-1.onrender.com/api/discussion/comment/reply`, {
                    date: selectedDate,
                    commentId: commentId,
                    reply: {
                        text: newReply, // Make sure to send 'text' in the correct format
                        user: username
                    }
                });
                setNewReply('');
                setCurrentReplyingTo(null);
                fetchDiscussion(selectedDate); // Refresh comments after adding a reply
            } catch (error) {
                console.error('Error posting reply:', error);
            }
        }
    };
    
    return (
        <div className={styles['discussion-container']}>
        <div className={styles['date-picker']}>
            <label>Select Date: </label>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div className={styles['topic']}>
            <h3>{topic}</h3>
        </div>
        <div className={styles['comments-section']}>
            {comments.map((comment, index) => (
                <div key={index} className={styles['comment']}>
                    <p><strong>{comment.user}</strong>: {comment.text}</p>
                    <button id={styles['reply']} onClick={() => toggleReplyBox(index)} className={styles['reply-button']}>
                        -reply
                    </button>

                    {/* Reply Box */}
                    {replyVisibility[index] && (
                        <div className={styles['reply-box']}>
                            {comment.replies && comment.replies.map((reply, idx) => (
                                <p key={idx} className={styles['reply']}><strong>{reply.user}</strong>: {reply.text}</p>
                            ))}
                            <input
                                id={styles['addreply']}
                                type="text"
                                placeholder="Add a reply..."
                                value={currentReplyingTo === index ? newReply : ''}
                                onChange={(e) => {
                                    setNewReply(e.target.value);
                                    setCurrentReplyingTo(index);
                                }}
                            />
                            <button id={styles['addreplybutton']} onClick={() => handleReplySubmit(comment._id)}>add reply</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
        <footer>
        <div className={styles['comment-input']}>
            <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button className={styles['comment-input']} onClick={handleCommentSubmit}>Add Comment</button>
        </div>
        </footer>
    </div>

    
    );
};

export default Forum;
