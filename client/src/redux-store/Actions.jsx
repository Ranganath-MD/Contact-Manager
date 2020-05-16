export const addContact = (contact) => {
    return {
        type: "ADD_CONTACT",
        payload: contact
    }
}
export const getContacts = (contacts) => {
    return {
        type: "GET_CONTACT",
        payload: contacts
    }
}
export const deleteContacts = (id) => {
    return {
        type: "DELETE_CONTACT",
        payload: id
    }
}
export const updateContact = (contact) => {
    return {
        type: "UPDATE_CONTACT",
        payload: contact
    }
}
