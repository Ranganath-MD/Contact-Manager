import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import Avatar1 from "../assets/avatar1.svg"
import ReactImg from "../assets/react-img.svg"
import Mongo from "../assets/mongodb.svg"
import Express from "../assets/express.svg"
import Node from "../assets/nodejs.svg"
import GithubIcon from "../assets/github-icon.svg"

class Account extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                    </Col>

                    <Col xs={12} sm={12} md={6} >
                        <div className="acc_col">
                            <div style={{ width: 150, marginBottom: 15 }}>
                                <img src={Avatar1} alt="avatar" width="100%" />
                            </div>
                            <h1 className="account-name">
                                {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null}
                            </h1>
                            <p>
                                {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).email : null}
                            </p>
                            <div className="social-icons">
                                <div style={{ width: 40, marginBottom: 15 }}>
                                    <a href="https://github.com/Ranganath-MD/Contact-Manager" target="_blank" ><img src={GithubIcon} alt="avatar" width="100%" /></a>
                                </div>
                                <p>Ranganath-MD</p>
                            </div>
                            <h3 style={{ marginTop: 20}}>Application built with </h3>
                        </div>
                        <div className="tech_container">
                            <div style={{ width: 100, marginBottom: 15 }}>
                                <img src={Mongo} alt="avatar" width="100%" />
                            </div>
                            <div style={{ width: 80, marginBottom: 15 }}>
                                <img src={Express} alt="avatar" width="100%" />
                            </div>
                            <div style={{ width: 60, marginBottom: 15 }}>
                                <img src={ReactImg} alt="avatar" width="100%" />
                            </div>
                            <div style={{ width: 80, marginBottom: 15 }}>
                                <img src={Node} alt="avatar" width="100%" />
                            </div>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Account
