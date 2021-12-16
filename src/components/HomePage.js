import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment';

const HomePage = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        function fetchData(){
            (fetch('http://localhost:7777/posts'))
            .then(response => response.json())        
            .then(response => setPosts(response.map(item => ({id: item.id, content: item.content, created: moment(item.created).fromNow()}))))
        }

        fetchData()

        let timer = setInterval(() => {
            fetchData()
        }, 1000)

        return () => clearInterval(timer)
    }, []);

    return (
        <>
            <div className="createPost">
                <Link to='/posts/new' className="btn">Create post</Link>
            </div>
            {posts.map(item => {return(
                <div key={item.id} className="post">
                    <Link to={`/posts/${item.id}`}>
                        <div className="post__header">
                            <div className="post__header-img"></div>
                            <div className="post__header-author">
                                <p className="post__header-author-name">Author Name</p>
                                <p className="post__header-author-time">*Mentor <span>- {item.created}</span></p>
                            </div>
                        </div>
                        <div className="post__body">
                            {item.content}
                        </div>
                    </Link>
                </div>
            )})}
        </>    
    );
}

export default HomePage;
