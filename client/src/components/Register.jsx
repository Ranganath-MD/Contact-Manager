import React, { Component } from 'react'
import { Row, Col, Form, Button, Toast } from "react-bootstrap"
import { Link, Redirect } from "react-router-dom"
import axios from "../axios/axios-config"

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            message: "",
            show: false,
            redirect: false,
            msgType: ""
        }
    }

    handleRedirect = () => {
        setTimeout(() => {
            this.setState(() => ({
                redirect: true
            }))
        }, 2000);
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        axios.post("/users/register", formData)
            .then(response => {
                console.log(response.data.user)
                if (response.data.user !== undefined) {
                    this.setState({
                        message: response.data.message,
                        show: true,
                        msgType: "success",
                    })
                    this.handleRedirect()
                } else {
                    this.setState({
                        message: response.data.message,
                        show: true,
                        msgType: "exists"
                    })
                }

            })
            .catch(err => {
                console.log(err)
            })

        this.setState({
            username: "",
            email: "",
            password: ""
        })
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    render() {

        const { username, email, password, message, show, redirect, msgType } = this.state
        if (redirect) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="reg-container">
                <Toast
                    className={msgType === "exists" ? "toast-error": "toast"}
                    onClose={() => this.setState({ show: false })}
                    show={show}
                    autohide
                    delay={3000}
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
                <Row>
                    <Col xs={1} sm={2} md={3}></Col>
                    <Col xs={10} sm={8} md={6}>
                        <h2 className="home-heading">Register</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formGroupusername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={this.handleChange}
                                    placeholder="Enter username"
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={this.handleChange}
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className="form-footer-text">Already have an account? <Link to="/login" className="nav-item">Login</Link></p>
                    </Col>
                    <Col xs={1} sm={2} md={3}></Col>
                </Row>
            </div>
        )
    }
}

export default Register
