import React, { useState, useEffect } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase.js'
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase'
import SearchResult from './SearchResult.js'

import './NavigationItems.css';

export default function Points() {
    const [users, setUsers] = useState([])
    const [sender, setSender] = useState()
    const [pointsRecipient, setPointsRecipient] = useState('')


    const [pointsError, setPointsError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const { currentUser } = useAuth()

    const navigate = useNavigate()
    const userRef = db.collection('users')
    
    useEffect(() => {
        setLoading(true)
        getUsers()
        getSender()
        setLoading(false)
    }, [])

    function getUsers(){
        //get a list of users from database
        userRef.onSnapshot((querySnapshot) => {
            let items = [];
            //add each doc to the list
            querySnapshot.forEach((doc) =>{
                items.push(doc.data());
            })

            setUsers(items);
        })
    }
    function getSender(){
        userRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) =>{
                if(doc.data().email == currentUser.email){
                    setSender(doc)
                }
            })
        })
    }


    async function givePoints(e){
        e.preventDefault();
        
        //if user points are equal to 0 throw error and return
        if(sender.data().Points <= 0){
            setPointsError('No points available to give');
            setSuccess('');
            return
        }

        let foundUser = false;
        
        //loop through users to find point reciver and giver
        users.forEach((user) => { 
            // if the current user's email matches the reciver's email add one point to it
            // This email may not exist
            if(!foundUser && user.email && user.email == pointsRecipient){
                db.collection('users').doc(sender.data().uid).update({Points: sender.data().Points - 1})
                db.collection('users').doc(user.uid).update({Points: user.Points + 1})
                setSuccess('Points have been sent');
                setPointsError('')
                setPointsRecipient('')
                foundUser = true;
            }
        })
        if(!foundUser){
            setPointsError('Recipient not found');
            setSuccess('');
        }
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    return(
        <div>
            <Form onSubmit={(e) => givePoints(e)}>
                {pointsError && <Alert variant="danger" onClick={() => setPointsError('')}>{pointsError}</Alert>}
                {success && <Alert variant="success" onClick={() => setSuccess('')}>{success}</Alert>}
                <input value={pointsRecipient} onChange={(e) => setPointsRecipient(e.target.value)} placeholder="Recipient's email" />
                <Button type="submit" disabled={!pointsRecipient}>Send 1 Point As Thanks</Button>
            </Form>
            <div>
                {users.map((user) => (
                    
                    <div key={user.id}>
                        <SearchResult
                            firstName= {user.first_name}
                            lastName={user.last_name}
                            subjects={user.tutoring_subjects}
                            email={user.email}
                            points={user.Points}
                        />
                        
                    </div>
                ))}
            </div>

            <div className='goBackLink'>
                <Button variant="button" onClick={() => navigate('/')}>Go To Dashboard</Button>
            </div>
        </div>
        
    )
}