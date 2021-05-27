import{
    SET_USER,
    LOG_OUT,
} from "../actionsTypes";

const defaultState = {
    currentUser: {},
    isAuth: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true
            }
        // case LOG_OUT:
        //     localStorage.removeItem('token')
        //     return {
        //         ...state,
        //         currentUser: {},
        //         isAuth: false
        //     }
        default:
            return state
    }
}

export const setUser = user => ({type: SET_USER, payload: user})
// export const logout = () => ({type: LOG_OUT})
