import axios from "axios"
import MessageContext from "../contexts/MessageContext"

export function MessageProvider(props) {

    const baseUrl = "http://localhost:3000/users"

    function createUser(user) {
        return axios.post(baseUrl, user).then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    function signInUser(user) {
        return axios.post(baseUrl + "/login", user).then(response => {
            localStorage.setItem('myCoffeeToken', response.data.token)
            return new Promise(resolve => resolve(response.data))
        })
    }

    return (
        <MessageContext.Provider value={{
            createUser,
            signInUser
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}