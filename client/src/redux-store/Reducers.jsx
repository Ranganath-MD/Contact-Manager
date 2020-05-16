const initialState = [];

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            return [...state, action.payload]
        case "GET_CONTACT":
            return [...action.payload]
        case "UPDATE_CONTACT":
            const index = state.findIndex(x => x._id === action.payload._id);
            state[index] = action.payload
            return [...state]
        case "DELETE_CONTACT":
            const newState = state.filter(val => val._id !== action.payload)
            return newState
        default:
            return state
    }
}

export default contactReducer