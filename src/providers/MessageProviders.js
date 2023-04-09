import axios from "axios"
import MessageContext from "../contexts/MessageContext"
import { useEffect, useState } from "react";

export function MessageProvider(props) {

    //Global variables
    const baseUrl = "http://localhost:3000/messages/"

    // React Hooks
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await getAllMessages();
        }
        fetchData();
    }, []);

    // console.log(messages)

    // CRUD Functions
    function getAllMessages() {
        return axios.get(baseUrl).then(response => setMessages(response.data));
    }

    function getMessageById(messageId) {
        return axios.get(baseUrl + messageId)
            .then(response => {
                console.log(response.data)
                return new Promise(resolve => resolve(response.data));
            });
    }

    function getUserMessages(userId) {
        return axios.get(baseUrl + "user/" + userId)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            });
    }

    function addMessage(message) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        let messageObj = {message: message}

        return axios.post(baseUrl, messageObj, { headers: myHeaders })
            .then(response => {
                getAllMessages();
                getUserMessages();
                return new Promise(resolve => resolve(response.data));
            });
    }

    function editMessage(message) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        return axios.put(baseUrl + message.messageId, message, { headers: myHeaders })
            .then(response => {
                getAllMessages();
                return new Promise(resolve => resolve(response.data));
            });
    }

    function deleteMessage(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        return axios.delete(baseUrl + id, { headers: myHeaders })
            .then(response => {
                getAllMessages();
                return new Promise(resolve => resolve(response.data));
            });
    }


    return (
        <MessageContext.Provider value={{
            messages,
            getAllMessages,
            getMessageById,
            getUserMessages,
            addMessage,
            editMessage,
            deleteMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}