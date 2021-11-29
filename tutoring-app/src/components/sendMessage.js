import React, {useRef} from 'react'
import {db} from '../firebase'
import firebase from 'firebase'
import { Form, Button} from 'react-bootstrap'

export default function SendMessage(){
    const msg = useRef('')

    async function sendMessage(e){
        e.preventDefault()

        //todo get info from current user

        await db.collection('user').doc('testSend').collection('Inbox').add({
            text: msg.current.value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return(
        <div>
            <Form onSubmit = {sendMessage}>
                <Form.group>
                    <Form.Label>Message...</Form.Label>
                    <Form.Control ref = {msg} required/>
                </Form.group>
                <Button type = 'sumbit'>
                    send
                </Button>
            </Form>
        </div>
    )
}