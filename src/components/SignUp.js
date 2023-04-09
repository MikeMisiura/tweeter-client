import React, { useContext, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

// SignUp form heavily modified from react-bootstrap documentation
// https://react-bootstrap.github.io/forms/overview/

function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    let { createUser } = useContext(UserContext)
    let navigate = useNavigate()
    
    function handleSubmit(event) {
        event.preventDefault()

        let user = { username, password, email, firstName, lastName }

        // console.log(user)

        createUser(user)
        .then(() => {
            navigate('/signin')
        })
        .catch(error => {
            console.log(error)
            window.alert('Registration failed due to ' + error.response.data)
        })
    }



    return (
        <div>
            <h1>Sign Up Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder="Enter username" 
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="firstName" 
                        placeholder="Enter First Name" 
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="lastName" 
                        placeholder="Enter Last Name" 
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default SignUp