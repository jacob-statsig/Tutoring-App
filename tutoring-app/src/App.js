import React from "react"
import { Container } from "react-bootstrap"

import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from './components/Signup';
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      
        <Router className="w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<PrivateRoute />}>
                <Route path='/' element={<Dashboard />} />
              </Route>
              <Route path='/signup' element={<Signup />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/forgot-password' element={<ForgotPassword />}/>
            </Routes>
          </AuthProvider> 
        </Router>
      </Container>
  );
}

export default App;
