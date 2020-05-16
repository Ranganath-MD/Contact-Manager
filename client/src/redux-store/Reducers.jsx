const initialState = [];

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            return [...state, action.payload]
        case "GET_CONTACT":
            return [...action.payload]
        case "DELETE_CONTACT":
            const newState = state.filter(val => val._id !== action.payload)
            return newState
        default:
            return state
    }
}

export default contactReducer