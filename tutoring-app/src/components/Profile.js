import React, { useState, useEffect } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase.js'
import SearchResult from './SearchResult'


export default function Profile() {
    
    const [profile, setProfile] = useState()
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const ref = db.collection('users')

    useEffect(() => {
        getProfile()
    }, [])

    function getProfile(){
        setLoading(true);
        // updates whenever db changes
        ref.onSnapshot((querySnapshot) => {
            // extract each document in folder
            querySnapshot.forEach((doc) => {
                // Find the correct user information
                if(doc.data().uid == currentUser.uid){
                    setProfile(doc.data());
                }
            })
            console.log(profile)
            setLoading(false);
        })
    }

    async function handleLogout(){
        setError('')
    
        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to Log Out')
        }
    }
    
    // TEMP: show if page is being updated
    if(loading){
        return <h1>Loading...</h1>
    }

    function DisplayData(props){
        const {title, info} = props
        return (
            <div>
                <strong>{title + ": "}</strong>
                {info}
            </div>
        )
    }
    if(profile != null) {
        return (
            <div>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={() => navigate('..')}>Go To Dashboard</Button>
                </div>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <DisplayData title="Email" info={currentUser.email} />
                        <DisplayData title="First Name" info={profile.first_name} />
                        <DisplayData title="Last Name" info={profile.last_name} />

                        <Link to="/update-profile" className="btn btn-primary w-100">Update Profile</Link>
                    </Card.Body>
                </Card>
                
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        )
    } else {
        return <h1>Unable to load profile</h1>
    }
}
