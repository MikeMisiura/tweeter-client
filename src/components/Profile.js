import React, { useContext, useEffect, useState } from "react"
import MessageContext from "../contexts/MessageContext";
import { Container } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import { Link, useParams } from "react-router-dom";
import PostForm from "./PostForm";
import TweetCard from "./TweetCard";

function Profile() {

    let { findUserById, signedInUserId } = useContext(UserContext)
    let { getUserMessages } = useContext(MessageContext)

    let params = useParams()
    let profileUserId = params.id

    const [userMessages, setUserMessages] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [ownProfile, setOwnProfile] = useState(false);

    useEffect(() => {
        async function loadUserMessages() {
            let userMsgs = await getUserMessages(profileUserId)
            setUserMessages(userMsgs)
            // console.log(userMsgs)
        }
        loadUserMessages();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        async function loadProfileUser() {
            let userData = await findUserById(profileUserId)
            setProfileUser(userData)
            // console.log(userMsgs)
        }
        loadProfileUser();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (profileUserId === signedInUserId) {
            setOwnProfile(true)
        }
    }, [profileUserId, signedInUserId]);

    let { userId, username, firstName, lastName, email } = profileUser

    return (
        <Container>
            <h1>{ownProfile ? 'Welcome to your Profile' : 'Profile: ' + username}</h1>
            {ownProfile && <PostForm />}
            <p><b>Name:</b> {firstName} {lastName}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Profile Created:</b> {email}</p>
            <p><b>User Id:</b> {userId}</p>
            {ownProfile && <Link to={'../edit-profile/' + userId} >edit</Link>}
            {userMessages.map((m) => {
                return (
                    <div key={m.messageId}>
                        <TweetCard {...m} />
                    </div>
                )
            })}
        </Container>
    );
}

export default Profile


