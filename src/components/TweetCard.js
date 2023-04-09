import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import UserContext from "../contexts/UserContext";
import { Button } from "react-bootstrap";
import MessageContext from "../contexts/MessageContext";

function TweetCard(messageObj) {
    let navigate = useNavigate()

    let { message, userId, username, updatedAt, messageId } = messageObj
    let stringUserId = userId.toString()
    let stringMessageId = messageId.toString()

    let { signedInUserId } = useContext(UserContext)
    let { deleteMessage } = useContext(MessageContext)

    const [canEditAndDelete, setCanEditAndDelete] = useState(false);

    useEffect(() => {
        if (stringUserId === signedInUserId) {
            setCanEditAndDelete(true)
        }
        // eslint-disable-next-line
    }, []);

    function handleDelete(messageId) {
        deleteMessage(messageId).then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
            if (error.response.status === 403 || error.response.status === 401) {
                navigate('/signin');
            }
        });
    }

    return (
        <Card>
            <Card.Body>
                <Card.Text>{message}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    <span>
                        <Link to={stringUserId}>{username}</Link>
                        <> | </>
                        {updatedAt}
                        {canEditAndDelete && <>
                            <> | </>
                            <Link to={'../edit-message/' + stringMessageId} >edit</Link>
                            <> | </>
                            <Button variant="link" onClick={() => { handleDelete(messageId) }} >delete</Button>
                        </>}
                    </span>
                </small>
            </Card.Footer>
        </Card>
    );
}

export default TweetCard


