import React from 'react'
import Avatar1 from "../../avatar1.svg"
import Edit from "../../edit.png"
import Delete from "../../delete.png"

const ContactShow = (props) => {
    return (
        <div>
            {props.show ?
                <div className="container3">
                    <div className="contact1">
                        <div className="img-container">
                            <img src={Delete} alt="avatar" className="avatar1" onClick={props.handleModal} />
                        </div>
                        <div className="img-container">
                            <img src={Edit} alt="avatar" className="avatar1"  />
                        </div>
                    </div>
                    <div style={{ width: 150, marginBottom: 15 }}>
                        <img src={Avatar1} alt="avatar" width="100%" />
                    </div>
                    <h3>{props.contact.name}</h3>
                    <p className="contact-email">{props.contact.email}</p>
                    <p className="contact-mobile">{props.contact.mobile}</p>
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

export default ContactShow
