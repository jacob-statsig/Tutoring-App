import React, { useState, useEffect } from 'react'
import { Button, Card, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase.js'
import SearchResult from './SearchResult'


export default function Profile() {
    
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth()

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


    return (
        <div>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={() => navigate('..')}>Go To Dashboard</Button>
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
        </div>
    )
}
