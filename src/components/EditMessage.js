import React, { useContext, useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";

function EditMessage() {
    let navigate = useNavigate();
    let params = useParams()
    let messageId = params.id
    const { editMessage, getMessageById } = useContext(MessageContext)

    const [tweet, setTweet] = useState('')
    let { message } = tweet

    useEffect(() => {
        async function loadMessage() {
            let messageObj = await getMessageById(messageId);
            setTweet(messageObj)
        }
        loadMessage()
        // eslint-disable-next-line
    }, []);

    function handleChange(event) {
        setTweet((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault()

        editMessage(tweet).then(() => {
            navigate('/' + tweet.userId)
        }).catch(error => {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                navigate('/signin');
            }
        });
    }
    
    return (
        <div>
            <h1>Edit Message</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="tweet">
                <Form.Control
                    type="text"
                    placeholder="Tweet"
                    name="message"
                    value={message}
                    onChange={handleChange}
                />
                <Button variant="primary" type="submit">
                    Edit
                </Button>
            </Form.Group>
        </Form>
        </div>
    )
}

export default EditMessage