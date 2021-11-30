import React, { useState, useEffect } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase.js'
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase'
import './Communication.css';
import './NavigationItems.css';

export default function Communication(){
    const [receivedMessages, setReceivedMessages] = useState([])
    const [sentMessages, setSentMessages] = useState([])

    const [lookingAtRecieved, setLookingAtRecieved] = useState(false)
    const [formRecipient, setFormRecipient] = useState()
    const [formMessage, setFormMessage] = useState()
    const [messageError, setmessageError] = useState()
    const [loading, setLoading] = useState()
    
    const { currentUser } = useAuth()

    const messagesRef = db.collection('message')

    useEffect(() => {
        getMessages()
    }, [])

    function getMessages(){
        //update when new messages are added to database
        messagesRef.onSnapshot((querySnapshot) =>{
            let sentM = [];
            let recM = [];

            //look through all messages and retrive the one relevent to the user
            querySnapshot.forEach( (doc) => {
                //if current user sent this message add it to sentM
                if(currentUser.email.localeCompare(doc.data().Sender) == 0){
                    sentM.push(doc.data() );
                }
                //if the current user received this message add to recM
                if(currentUser.email.localeCompare(doc.data().Receiver) == 0){
                    recM.push(doc.data() );
                }
            })
            setReceivedMessages(recM);
            setSentMessages(sentM);
        })
        
    }

    async function sendMessage(e) {
        e.preventDefault();
        setLoading(true)
    
        const { uid } = auth.currentUser;
    
        await messagesRef.add({
            Text: formMessage,
            Receiver: formRecipient,
            Sender: currentUser.email,
            CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    
        setFormRecipient('');
        setFormMessage('');
    }
    
    function DisplaySent() {
        return (
            <>
                {sentMessages.map( ({Text, id, Receiver, Sender}) => (
                    <div className="message sent" key = {id}>
                        <p> Sent To: {Receiver} <br />
                         {Text}</p>
                    </div>
                ))}
            </>
        )
    }

    function DisplayReceived() {
        return(
            <>
                {receivedMessages.map( ({Text, id, Receiver, Sender}) => (
                    <div className="message received" key = {id}>
                        <p> From: {Sender} <br />
                         {Text}</p>
                    </div>
                ))}
            </>
        )
    }
    
    function DisplayMessages() {
        return lookingAtRecieved ? <DisplayReceived /> :<DisplaySent />
    }

    function toggleView() {
        setLookingAtRecieved(!lookingAtRecieved)
    }
    
    return(
    
        <div>

            <Button onClick={toggleView}>{lookingAtRecieved ? "Switch to Sent Messages" : "Switch to Recieved Messages"}</Button>

            <DisplayMessages />

            <Form onSubmit={(e) => sendMessage(e)}>
                {messageError && <Alert variant="danger">{messageError}</Alert>}
                <input value={formRecipient} onChange={(e) => setFormRecipient(e.target.value)} placeholder="Recipient's Email" />
                <input value={formMessage} onChange={(e) => setFormMessage(e.target.value)} placeholder="Message Content" />
                <Button type="submit" disabled={!formMessage && !formRecipient}>🕊️</Button>
            </Form>

            <div>
                <Link to='/' className='goBackLink'>Go To Dashboard</Link>
            </div>
        </div>
        
    )
}

