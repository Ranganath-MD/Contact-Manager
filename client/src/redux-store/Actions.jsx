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