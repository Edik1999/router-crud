import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from "react-router-dom";


const Post = (props) => {

    let history = useHistory();

    const [post, setPost] = useState([]),
    [newText, setNewText] = useState({value: ''}),
    [page, setPage] = useState(1)

    useEffect(() => {

        fetch('http://localhost:7777/posts')
            .then(response => response.json())
            .then(response => setPost(response.map(item => ({ id: item.id, content: item.content, created: moment(item.created).fromNow() }))))

    }, [page])

    let fullPath = props.location.pathname
    fullPath = Number(fullPath.slice(7, 8))

    const deleteHandler = (id) => {
        fetch(`http://localhost:7777/posts/${id}`, {
            method: 'DELETE'
        })
        .then(history.push("/"))
    },

    editHandler = (text) => {
        console.log(typeof(text))
        setNewText({value: text})
        setPage(2)
    },

    changeHandler = e => {
        setNewText(prev => ({...prev, value: e.target.value}))
    },

    closeHandler = () => {
        setPage(1)
    },

    saveHandler = (id) => {
        const newPost = {
            id: id,
            content: newText.value
        }

        fetch('http://localhost:7777/posts', {
            method: 'POST',
            body: JSON.stringify(newPost)
        })

        setPage(1)
    }

    return (
        <div>
            {post.filter(post => post.id === fullPath).map(post =>
                <React.Fragment key={post.id}>
                    <div className={`post ${page === 2 && 'hidden'}`}>
                        <div className="post__header">
                            <div className="post__header-img"></div>
                            <div className="post__header-author">
                                <p className="post__header-author-name">Author Name</p>
                                <p className="post__header-author-time">*Mentor <span>- {post.created}</span></p>
                            </div>
                        </div>
                        <div className="post__body">
                            {post.content}
                        </div>
                        <hr />
                        <div className="post__buttons">
                            <button className="post__buttons-btn-blue btn" onClick={() => editHandler(post.content)}>Edit</button>
                            <button className="post__buttons-btn-red btn" onClick={() => deleteHandler(post.id)}>Delete</button>
                        </div>
                    </div>
                    <div className={`container ${page === 1 && 'hidden'}`}>
                        <div className="newPost">
                            <div className="close" onClick={closeHandler}>X</div>
                            <hr/>
                            <input type="text" placeholder="Введите текст" value={newText.value} onChange={changeHandler}/>
                        </div>
                        <button className="btn" onClick={() => saveHandler(post.id)}>Save</button>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
}

export default Post;
