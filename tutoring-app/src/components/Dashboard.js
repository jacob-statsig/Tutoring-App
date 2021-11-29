import React, { useState, useEffect } from 'react'
import { Button, Card, Alert, Form } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase.js'
import SearchResult from './SearchResult'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth()

    const [tutors, setTutors] = useState([])
    const [subjectQuery, setSubjectQuery] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const ref = db.collection('users')
    console.log(ref)
    
    // TODO remove hard coded subjects
    const subjects = ['Calc III', 'Comp. Sci. I', 'Spanish', 'Discrete']

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
                        />
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            <div>
                <h1>Find Tutors</h1>
                <Form>
                    <Form.Select onChange={(e) => handleSubjectChange(e)}>
                       <option value={null}>
                            Select A Subject
                        </option>
                        {subjects.map((subject) => (
                            <option value={subject} selected={subject === subjectQuery}>
                                {subject}
                            </option>
                        ))}
                    </Form.Select>
                </Form>
                <GetSearchResults />
            </div>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={() => navigate('/profile')}>Go To Profile</Button>
            </div>
        </>
    )
}
