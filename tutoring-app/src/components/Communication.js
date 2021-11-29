import React, {useState, useEffect} from 'react'
import {db} from '../firebase.js'
import sendMessage from './sendMessage.js'

export default function Communication(){
    const [messages, setMessages] = useState([])
    useEffect( () =>{
        db.collection('users').doc('testRead').collection('inbox').orderBy('createdAt').limit(50).onSnapshot(onSnapshot => {
            setMessages(onSnapshot.docs.map(doc => doc.data() ))
        })
    }, [])

    return(
        <div>
            {messages.map( ({text, id}) => (
                <div key = {id}>
                    <p> {text} </p>
                </div>
            ))}
            <sendMessage />
        </div>
    )
}