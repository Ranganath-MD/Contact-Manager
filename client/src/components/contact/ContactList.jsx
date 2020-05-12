import React, { Component } from 'react'
import axios from '../../axios/axios-config'
import { Row, Col } from "react-bootstrap"
import { connect } from "react-redux"
import { getContacts } from "../../redux-store/Actions"
import Avatar from "../../avatar.png"
import contact from "../../contact.svg"

class ContactList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contact: {}
        }
    }
    componentDidMount() {
        axios.get("/contacts")
            .then(response => {
                this.props.dispatch(getContacts(response.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleShowMore = (contact) => {
        this.setState(() => ({ contact }))
    }

    render() {
        return (
            <div>
                <Row>
                    
                    <Col xs={12} md={5}>
                        {
                            this.props.contacts.map(contact => {
                                return (
                                    <div key={contact._id} className="contact-list">
                                        <div className="img-container">
                                            <img src={Avatar} alt="avatar" className="avatar"/>
                                        </div>
                                        <p className="contact-name">{contact.name}</p>
                                        <button
                                            onClick={() => this.handleShowMore(contact)} className="show-more">Show ></button>
                                    </div>
                                )
                            })
                        }
                    </Col>
                    <Col xs={12} md={7}>
                        <div>
                            <img src={contact} alt="contact" width="100%" />
                        </div>
                        <div className="contact-list">
                            <div className="img-container">
                                <img src={Avatar} alt="avatar" className="avatar" />
                            </div>
                            <div>
                                <p className="contact-name">{this.state.contact.name}</p>
                                <p className="contact-email">{this.state.contact.email}</p>
                                <p className="contact-mobile">{this.state.contact.mobile}</p>
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}
const mapStateToPrpos = (state) => {
    return {
        contacts: state.contact
    }
}
export default connect(mapStateToPrpos)(ContactList)
