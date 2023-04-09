import axios from "axios"
import UserContext from "../contexts/UserContext"
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export function UserProvider(props) {

    const baseUrl = "http://localhost:3000/users/"

    const [signedInUserId, setSignedInUserId] = useState();

    useEffect(() => {
        var token = localStorage.getItem('myMessageToken');
        if (token) {
            var decoded = jwt_decode(token)

            // console.log(decoded)
            // console.log(decoded.userId)

            let numUserId = decoded.userId
            // console.log(numUserId)
            // console.log(typeof numUserId)

            let stringUserId = numUserId.toString()
            // console.log(stringUserId)
            // console.log(typeof stringUserId)

            setSignedInUserId(stringUserId)
            // console.log(signedInUserId)
            // console.log(typeof signedInUserId)
        }else{
            setSignedInUserId(null);
            console.log(signedInUserId)
        }

    }, [signedInUserId]);

    function createUser(user) {
        return axios.post(baseUrl, user).then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    function signInUser(user) {
        return axios.post(baseUrl + "login", user).then(response => {
            localStorage.setItem('myMessageToken', response.data.token)
            return new Promise(resolve => resolve(response.data))
        })
    }

    function signOutUser() {
        setSignedInUserId(null)
        localStorage.clear();
        window.location.reload();
    }

    function getUserIdByUsername(username) {
        console.log(username)
        return axios.get(baseUrl + 'username/' + username)
            .then(response => {
                return Promise.resolve(response.data);
            });
    }

    function findUserById(userId) {
        return axios.get(baseUrl + "profile/" + userId)
            .then(response => {
                return Promise.resolve(response.data);
            });
    }

    function editUser(user) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myMessageToken')}`
        };

        return axios.put(baseUrl + user.userId, user, { headers: myHeaders })
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            });
    }

    return (
        <UserContext.Provider value={{
            signedInUserId,
            createUser,
            signInUser,
            signOutUser,
            findUserById,
            getUserIdByUsername,
            editUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}