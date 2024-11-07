import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Forums.module.css';


const Forum = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [topic, setTopic] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        setTopic('About sea life of Andaman and Nicobar, do the sea monsters exist there...?');
        fetchDiscussion(selectedDate);
    }, [selectedDate]);

    const fetchDiscussion = async (date) => {
        try {
            const response = await axios.get(`/api/discussion?date=${date}`);
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
                await axios.post(`/api/discussion/comment`, {
                    date: selectedDate,
                    comment: newComment
                });
                setNewComment('');
                fetchDiscussion(selectedDate);
            } catch (error) {
                console.error('Error posting comment:', error);
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
                {comment.replies && comment.replies.length > 0 && (
                    <div className={styles['replies']}>
                        {comment.replies.map((reply, idx) => (
                            <p key={idx} className={styles['reply']}><strong>{reply.user}</strong>: {reply.text}</p>
                        ))}
                    </div>
                )}
            </div>
        ))}
    </div>
    <div className={styles['comment-input']}>
        <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Add Comment</button>
    </div>
</div>

    
    );
};

export default Forum;
