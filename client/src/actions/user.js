import axios from 'axios';
import {setUser} from "../reducers/userReducer";

export const registration = async (name, surname, email, password) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/auth/registration`,
            {
                name,
                surname,
                email,
                password
            })
        alert(response.data.message)
    } catch (err) {
        alert(err.response.data.message)
    }
}

export const login = async (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:3001/api/auth/`,
                {
                    email,
                    password
                })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (err) {
            // alert(err.response.data.message)
        }
    }
}

// export const auth = async () => {
//     return async dispatch => {
//         try {
//             const response = await axios.get(`http://localhost:3001/api/auth/auth`,{
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             }, {})
//             dispatch(setUser(response.data.user))
//             localStorage.setItem('token', response.data.token)
//         } catch (err) {
//             // alert(err.response.data.message)
//             localStorage.removeItem('token')
//         }
//     }
// }
