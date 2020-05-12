import { createStore, combineReducers } from "redux"
import contactReducer from "./Reducers"

const configureStore = () => {
    const store = createStore(combineReducers({
        contact: contactReducer
    }))

    return store
}

export default configureStore