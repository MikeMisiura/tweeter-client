import React, { useContext, useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function EditProfile() {
    let navigate = useNavigate();
    let params = useParams()
    let userId = params.id
    const { editUser, findUserById, signedInUserId } = useContext(UserContext)

    const [profileUser, setProfileUser] = useState({})
    let { username, firstName, lastName, email } = profileUser
    
    useEffect(() => {
        async function loadUser() {
            let userObj = await findUserById(userId);
            setProfileUser(userObj)
        }
        loadUser()
        // eslint-disable-next-line
    }, []);

    if (signedInUserId != userId) {
        navigate('/signin')
    }
    // console.log(user)

    function handleChange(event) {
        setProfileUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault()

        editUser(profileUser).then(() => {
            navigate('/' + profileUser.userId)
        }).catch(error => {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                navigate('/signin');
            }
        });
    }
    
    return (
        <div>
            <h1>Edit Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder="Enter username" 
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="firstName" 
                        placeholder="Enter First Name" 
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="lastName" 
                        placeholder="Enter Last Name" 
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Edit
                </Button>
            </Form>
        </div>
    )
}

export default EditProfile