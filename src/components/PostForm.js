import React, { useContext, useState } from "react"
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import MessageContext from "../contexts/MessageContext";

function PostForm() {
    const [tweet, setTweet] = useState('')

    let { addMessage } = useContext(MessageContext)

    function handleSubmit(event) {
        // event.preventDefault()
        addMessage(tweet)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="tweet">
                <Form.Control
                    type="text"
                    placeholder="New Tweet"
                    onChange={e => setTweet(e.target.value)}
                />
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form.Group>
        </Form>
    );
}

export default PostForm


