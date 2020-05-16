import React from 'react'
import Avatar1 from "../../assets/avatar1.svg"
import Edit from "../../assets/edit.png"
import Delete from "../../assets/delete.png"
import EditContact from "./EditContact"
import { connect } from "react-redux"

const ContactShow = (props) => {
    const person = props.contact.filter(item => item._id === props.id)[0]

    return (
        <div>
            {props.show ?
                <div className="container3">
                    <div className="contact1">
                        <div className="img-container">
                            <img src={Delete} alt="avatar" className="avatar1" onClick={props.handleModal} />
                        </div>
                        <div className="img-container">
                            <img src={Edit} alt="avatar" className="avatar1" onClick={props.handleEditForm}/>
                        </div>
                    </div>
                    <div style={{ width: 150, marginBottom: 15 }}>
                        <img src={Avatar1} alt="avatar" width="100%" />
                    </div>
                    {
                        props.showEditForm ?
                            <EditContact
                                contact={person}
                                handleEditForm={props.handleEditForm}
                            /> :
                            <div style={{ textAlign: "center" }}>

                                <h3>{person && person.name}</h3>
                                <p className="contact-email">{person && person.email}</p>
                                <p className="contact-mobile">{person && person.mobile}</p>
                            </div>
                    }
                </div> :
                <div className="container3">
                    <h2>Hi, {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null}</h2>
                    <p>Find Your contacts here</p>
                    <div style={{ width: 150 }}>
                        <img src={Avatar1} alt="avatar" width="100%" />
                    </div>
                </div>
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        contact : state.contact
    }
}

export default connect(mapStateToProps)(ContactShow)
