const initialState = [];

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            return [...state, action.payload]
        case "GET_CONTACT":
            return [...action.payload]
        default:
            return state
    }
}

export default contactReducer