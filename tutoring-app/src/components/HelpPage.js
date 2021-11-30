import React, { useState, useEffect } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase.js'
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase'

import './NavigationItems.css';

export default function HelpPage(){


    return(
    
        <div>
            <h1>How do I find a tutor?</h1>
            <div className='answerText'>
                <p className='answerText'>A tutor can be found by selecting a topic you need help with from the dropdown meun on you dashboard.
                You can copy the email given and use that to contact them in the communication window.</p>
            </div>
            <h1>How do I set up a meeting?</h1>
            <div className='answerText'>
                <p className='answerText'>Meetings are created thought the communication section. Using the email copied from the dashboard, you can message a potential tutor to set up a meeting.</p>
            </div>
            <h1>How do I show my support for a tutor?</h1>
            <div className='answerText'>
                <p className='answerText'>Tutors are ranked in a point system. If you beleave that a tutor was helpfull, you can look up their email in the Points page and send a point.</p>
            </div>
            <div>
                <Link to='/' className='goBackLink'>Go To Dashboard</Link>
            </div>
        </div>
        
    )
}

