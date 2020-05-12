import React, { Component } from 'react'
import { Row, Col, Form, Button,Toast } from "react-bootstrap"
import { Link } from "react-router-dom"
import axios from '../axios/axios-config'
import { Redirect } from "react-router-dom"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }
        axios.post("/users/login", formData)
            .then(response => {
                axios.defaults.headers['Authorization'] = response.data.user.token
                localStorage.setItem("token", response.data.user.token)
                this.props.handleIsAuthenticated(true)
                this.setState(() => ({
                    msgType: "success",
                    show: true,
                    message: response.data.message,
                }))
                this.handleRedirect()
            })
            .catch(err => {
                console.log(err)
                // this.setState(() => ({
                //     msgType: "error",
                //     show: true,
                //     // message: err.response.data.notice
                // }))
            })
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }


    render() {
        const { email, password, message, redirect, msgType, show } = this.state
        if (redirect) {
            return <Redirect to="/contacts" />
        }
        return (
            <div className="reg-container">
                <Toast
                    className={msgType === "error" ? "toast-error" : "toast"}
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
                        <h2 className="home-heading">Login</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    onChange={this.handleChange}
                                    value={email}
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={password}
                                    required
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className="form-footer-text">New User? <Link to="/register" className="nav-item">Register</Link></p>
                    </Col>
                    <Col xs={1} sm={2} md={3}></Col>
                </Row>
            </div>
        )
    }
}

export default Login
