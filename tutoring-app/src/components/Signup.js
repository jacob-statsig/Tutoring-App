import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap"
import { db } from '../firebase.js'


export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const tutorTopicRef = useRef()
    const studentTopicRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const { signUp, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [tutoringSubjects, setTutoringSubjects] = useState([])
    const [studentSubjects, setStudentSubjects] = useState([])
    const [subjects, setSubjects] = useState([])

    const navigate = useNavigate()

    const subjectsRef = db.collection('Subjects')

    useEffect(() => {
        getSubjects()
    }, [])

    function getSubjects(){
        setLoading(true)
        subjectsRef.onSnapshot((querySnapshot) =>{
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.id)
            })
            setSubjects(items);
            setLoading(false)
        })
    }
    

    async function handleSubmit(e) {
        e.preventDefault() // prevent refreshing

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        // check if at least 2 subjects are selected from each
        if(tutoringSubjects.length < 2) {
            return setError('Please select two subjects to teach')
        }
        if(studentSubjects.length < 1) {
            return setError('Please select one subject you need help')
        }

        try {
            setError('') // reset error
            setLoading(true) // disable button to prevent multiple submission
            await signUp(emailRef.current.value, passwordRef.current.value, 
                        tutoringSubjects, studentSubjects, 
                        firstNameRef.current.value, lastNameRef.current.value)
            navigate('/')
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

    // This could cause errors where the screen displays checked but the subj hasn't been added to the appropriate array
    function handleChangeTutor(e) {
        setTutoringSubjects(e)
    }
    function handleChangeStudent(e) {
        setStudentSubjects(e)
    }

    if(loading){
        return <h1>Loading...</h1>
    } 

    return (
        <>
            <Card>
                <Card.Body >
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Form.Group id="first-name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" ref={firstNameRef} required />
                        </Form.Group>
                        <Form.Group id="last-name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" ref={lastNameRef} required />
                        </Form.Group>

                        <Form.Group className="mb-2" id="tutor">
                            <Form.Label>Topics You Can Teach</Form.Label>
                            <DropdownMultiselect id='tutor-dropdown'
                                options={subjects}
                                handleOnChange={(e) => {handleChangeTutor(e)}}
                                name="Tutoring-Subjects"
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" id="student">
                            <Form.Label>Topics You Need Help</Form.Label>
                            <DropdownMultiselect id='student-dropdown'
                                options={subjects}
                                disabled={tutoringSubjects.indexOf()}
                                handleOnChange={(e) => {handleChangeStudent(e)}}
                                name="Student-Subjects"
                                />
                        </Form.Group>
                        <Button disabled={loading} className="mt-4 w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to='/login'>Already have an account?</Link>
            </div>
        </>
    )
}
