import React, { useContext, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let { signInUser } = useContext(UserContext)
    let navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        let user = { username, password }

        signInUser(user)
            .then((response) => {
                console.log(response.token)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
                window.alert('Signin failed due to ' + error.response.data)
            })
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter username"
                        onChange={e => setUsername(e.target.value)}
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
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>

        </div>
    )
}

export default SignIn