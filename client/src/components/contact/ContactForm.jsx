import React, { Component } from 'react'
import {Row, Col, Form, Button} from "react-bootstrap"
import axios from '../../axios/axios-config'
import { connect } from "react-redux"
import { addContact } from "../../redux-store/Actions"
class ContactForm extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            mobile: ""
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = this.state
        axios.post("/contacts", formData)
            .then(response => {
                this.props.dispatch(addContact(response.data.contact))
            })
            .catch(err => {
                console.log(err)
            })
        this.setState(() => ({
            name: "", email: "", mobile: ""
        }))
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }
    render() {
        return (
            <div>
                <h2 className="form-heading">Add Contact</h2>
                <Row onSubmit={this.handleSubmit}>
                    <Col xs={12} sm={12} md={2}></Col>
                    <Col xs={12} sm={12} md={8}>
                        <Form>
                            <Form.Group controlId="formGroupName">
                                <Form.Label>Contact Name</Form.Label>
                                <Form.Control
                                    required
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    type="text"
                                    placeholder="Enter your contact name"
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Contact Email</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    type="email"
                                    placeholder="Enter contact email"
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupno">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    required
                                    name="mobile"
                                    minLength="10"
                                    maxLength="10"
                                    onChange={this.handleChange}
                                    value={this.state.mobile}
                                    type="text"
                                    placeholder="Enter contact number"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                        </Button>
                        </Form>
                    </Col>
                    <Col xs={12} sm={12} md={2}></Col>
                </Row>
            </div>

        )
    }
}

export default connect()(ContactForm)
