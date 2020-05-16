import React, { Component } from 'react'
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from '../../axios/axios-config';
import { updateContact } from '../../redux-store/Actions';
import { connect } from 'react-redux';

class EditContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            mobile: ""
        }
    }

    componentDidMount(){
        this.setState(() => ({
            name: this.props.contact.name,
            email: this.props.contact.email,
            mobile: this.props.contact.mobile
        }))
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { _id } = this.props.contact
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
        axios.put(`contacts/${_id}`, formData)
            .then(response => {
                this.props.dispatch(updateContact(response.data.contact))
                this.setState(() => ({
                    name: "",
                    email: "",
                    mobile: ""
                }))
                this.props.handleEditForm()
            })
            .catch(err => {
                console.log(err)
            })

    }
   

    render() {
        return (
            <div>
                <Row onSubmit={this.handleSubmit}>
                    <Col xs={12} sm={12} md={2}></Col>
                    <Col xs={12} sm={12} md={12}>
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

export default connect()(EditContact)
