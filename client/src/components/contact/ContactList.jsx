import React, { Component } from 'react'
import axios from '../../axios/axios-config'
import {Link } from "react-router-dom"
import { Row, Col, Modal, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { getContacts, deleteContacts } from "../../redux-store/Actions"
import Avatar from "../../assets/avatar.png"
import Add from "../../assets/Add1.png"
import AddContact from "../../assets/add2.png"
import HideImg from "../../assets/delete1.png"
import NotFoundImg from "../../assets/norecord.svg"
import ContactForm from "./ContactForm"
import ContactShow from "./ContactShow"

class ContactList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            show: false,
            showContactform: false,
            modalShow: false,
            showEditForm: false
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
        this.setState(() => ({ id: contact._id, show: true, showContactform: false, showEditForm: false }))
    }

    handleAddContact = () => {
        this.setState(prevState => ({
            showContactform: !prevState.showContactform
        }))
    }

    handleModal = () => {
        this.setState(prevState => ({
            modalShow: !prevState.modalShow
        }))
    }

    handleShow = () => {
        this.setState({ show: false })
    }
    handleDeleteRecord = () => {
        axios.delete(`contacts/${this.state.id}`)
            .then(response => {
                this.props.dispatch(deleteContacts(response.data.contact._id))
                this.setState({ modalShow: false, show: false})
            })
            .catch(err => console.log(err.response))
    }

    handleEditForm = () => {
        this.setState(prevState => ({
            showEditForm: !prevState.showEditForm
        }))
    }
    handleShow = () => {
        this.setState({showContactform : false})
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.modalShow}
                    centered
                    size="sm"
                >
                    <Modal.Body>
                        <p>Are you sure?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal}>Close</Button>
                        <Button variant="primary" onClick={this.handleDeleteRecord}>Yes</Button>
                    </Modal.Footer>
                </Modal>
                <div className="container1">
                    {
                        this.props.contacts.length === 0 ?
                            <div className="container2">
                                <div className="Imgcontainer">
                                    <img src={NotFoundImg} alt="not found" width="100%" />
                                </div>
                                <div style={{ display: "flex"}}>
                                    <h3>No contacts found, Add new contacts</h3>
                                    <div className="img-container">
                                        <Link to="/contact-form"><img src={Add} alt="not found" width="100%"  /></Link>
                                    </div>
                                </div>
                            </div>
                            :
                            <Row>
                                <Col xs={12} md={5}>
                                    <div className="add_container">
                                        <p >Add Contact</p>
                                        <div className="img-container">
                                            {
                                                this.state.showContactform ?
                                                <img src={HideImg} alt="avatar" className="avatar1" onClick={this.handleAddContact}/> :
                                                <img src={AddContact} alt="avatar" className="avatar" onClick={this.handleAddContact}/>
                                            }
                                        </div>
                                    </div>
                                    <div className="list">
                                        {
                                            this.props.contacts.map(contact => {
                                                return (
                                                    <div key={contact._id} className="contact-list">
                                                        <div className="contact">
                                                            <div className="img-container">
                                                                <img src={Avatar} alt="avatar" className="avatar" />
                                                            </div>
                                                            <p className="contact-name" onClick={() => this.handleShowMore(contact)}>{contact.name}</p>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </Col>
                                <Col xs={12} md={7}>
                                    {
                                        this.state.showContactform ? <ContactForm handleShow={this.handleShow}/> :
                                            <ContactShow
                                                id={this.state.id}
                                                show={this.state.show}
                                                handleModal={this.handleModal}
                                                handleEditForm={this.handleEditForm}
                                                showEditForm={this.state.showEditForm}
                                            />
                                    }

                                </Col >
                            </Row>

                    }
                </div>
            </div>
        )
    }
}
const mapStateToPrpos = (state) => {
    return {
        contacts: state.contact,
    }
}
export default connect(mapStateToPrpos)(ContactList)
