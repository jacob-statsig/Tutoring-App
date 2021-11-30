import React, { useState, useEffect } from 'react'
import { Button, Card, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase.js'
import SearchResult from './SearchResult'

import './NavigationItems.css';

export default function Dashboard() {
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth()

    const [tutors, setTutors] = useState([])
    const [subjectQuery, setSubjectQuery] = useState(null)
    const [loading, setLoading] = useState(false)
    const [subjects, setSubjects] = useState([])

    const navigate = useNavigate()
    const ref = db.collection('users')
    

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

    // get tutors when page first loads
    useEffect(() => {
        getTutors();
    }, [])

    useEffect(() => {
        getTutors()
    }, [subjectQuery])

    function getTutors(){
        setLoading(true);
        // updates whenever db changes
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            // extract each document in folder
            querySnapshot.forEach((doc) => {
                // check if this is a user in the user folder before adding
                // and the user is offering the correct subject
                if(doc.data().uid && 
                    (doc.data().tutoring_subjects && doc.data().tutoring_subjects.indexOf(subjectQuery) > -1))
                    items.push(doc.data());
            })
            setTutors(items);
            setLoading(false);
        })
    }


    function handleSubjectChange(e){
        setSubjectQuery(e.target.value);
        console.log("Subject Query = " + subjectQuery)
    }

    // TEMP: show if page is being updated
    if(loading){
        return <h1>Loading...</h1>
    }

    function GetSearchResults() {
        if(subjectQuery == null){
            return <h4>Please Select a Subject</h4> 
        }
        if(tutors.length == 0){
            return <h4>No tutors for this subject</h4>
        }
        
        return ( 
            <>        
               <h2>Fitting Tutors</h2>
                {tutors.map((tutor) => (
                    <div key={tutor.uid}>
                        <SearchResult 
                            firstName={tutor.first_name}
                            lastName={tutor.last_name}
                            subjects={tutor.tutoring_subjects}
                            email={tutor.email}
                        />
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            <div className='centerConsole'>
                <h1>Find Tutors</h1>
                <Form>
                    <Form.Select onChange={(e) => handleSubjectChange(e)}>
                       <option value={null}>
                            Select a Subject
                        </option>
                        {subjects.map((subject) => (
                            <option key={subject} value={subject} selected={subject === subjectQuery}>
                                {subject}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
                <GetSearchResults />
            </div>
            <div>
                <Button variant="button" className='generalButtonOption' onClick={() => navigate('/profile')}> Go To Profile</Button>
            </div>
            <div>
                <Button variant="button" className='generalButtonOption' onClick={() => navigate('/communication')}>Go To Communications Page</Button>
            </div>
            <div>
                <Button variant="button" className='generalButtonOption' onClick={() => navigate('/points')}>Go To Points Page</Button>
            </div>
            <div>
                <Button variant="button" className='generalButtonOption' onClick={() => navigate('/help')}>Go To Help Page</Button>
            </div>
        </>
    )
}
