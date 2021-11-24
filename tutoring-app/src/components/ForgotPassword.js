import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'


export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault() // prevent refreshing

        try {
            setMessage('')
            setError('') // reset error
            setLoading(true) // disable button to prevent multiple submission
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox')
        } catch (err) {
            setError('Failed to Send Email')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="mt-4 w-100" type="submit">
                            Send Email
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to='/login'>Log In</Link>
            </div>
        </>
    )
}



