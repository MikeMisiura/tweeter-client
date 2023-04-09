import React, { useContext, useEffect, useState } from "react"
import MessageContext from "../contexts/MessageContext";
import UserContext from "../contexts/UserContext";
import PostForm from './PostForm';
import TweetCard from './TweetCard';


function PostFeed() {
    let { signedInUserId } = useContext(UserContext)
    let { messages } = useContext(MessageContext)

    return (
        <>
            <h1>Tweet Feed</h1>
            {signedInUserId && <PostForm />}
            {messages.map((m) => {
                return (
                    <div key={m.messageId}>
                        <TweetCard {...m} />
                    </div>
                )
            })}
        </>
    );
}

export default PostFeed


