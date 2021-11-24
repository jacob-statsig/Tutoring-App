import React, { useEffect, useState, useContext } from 'react'
import { auth } from '../firebase.js'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)


    // If we don't want to use fire base we just need to replace these two methods
    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logIn(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        logIn,
        signUp,
    }

    return (
        <div>
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    )
}