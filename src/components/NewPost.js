import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";

const NewPost = () => {

    let history = useHistory();

    const [text, setText] = useState({
        value: ''
    });

    useEffect(() => {
        let previousText = localStorage.getItem('postText')

        if(previousText !== null){
            setText({value: previousText})
        }
    }, [])

    const clickHandler = () =>{

        const newPost = {
            id: 0,
            content: text.value
        }

        localStorage.removeItem('postText')

        fetch('http://localhost:7777/posts', {
            method: 'POST',
            body: JSON.stringify(newPost)
        })
        .then(history.push("/"))
        
    },

    changeHandler = e => {
        setText(prev => ({...prev, value: e.target.value}))
    },

    closeHandler = () => {
        let inputText = text.value

        if(inputText.length > 0){
            localStorage.setItem('postText', text.value)
        } else {
            localStorage.removeItem('postText')
        }
    }

    return (
        <div className="container">
            <div className="newPost">
                <div className="close" onClick={closeHandler}>
                    <Link to='/'>X</Link>
                </div>
                <hr/>
                <input type="text" placeholder="Введите текст" value={text.value} onChange={changeHandler}/>
            </div>
            <button className="btn" onClick={clickHandler}>publish</button>
        </div>
    );
}

export default NewPost;
