import React, { useState, useEffect } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase.js'
import SearchResult from './SearchResult'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth()

    const [tutors, setTutors] = useState([])
    const [loading, setLoading] = useState(false)

    const ref = db.collection('users')
    console.log(ref)

    // get tutors when page first loads
    useEffect(() => {
        getTutors();
    }, [])

    function getTutors(){
        setLoading(true);
        // updates whenever db changes
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            // extract each document in folder
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            setTutors(items);
            setLoading(false);
        })
    }


    const navigate = useNavigate()

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

    return (
        <>
            <div>
                <h1>Tutors</h1>
                {console.log(tutors)}
                {tutors.map((tutor) => (

                    

                    <div key={tutor.uid}>
                        <SearchResult 
                        firstName={tutor.first_name}
                        lastName={tutor.last_name}
                        subjects={tutor.tutoring_subjects}
                        />
                    </div>
                ))}
            </div>

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}

                    {currentUser.uid}

                    <Link to="/update-profile" className="btn btn-primary w-100">Update Profile</Link>
                </Card.Body>
            </Card>
            
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
