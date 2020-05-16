import React, { Component } from 'react'
import Notebook from "../assets/notebook.svg"
import { Row, Col } from 'react-bootstrap'

class Home extends Component {
    render() {
        return (
            <div>
                <Row >
                    <Col className="home_col">
                        <h2 className="home-heading">Save Your Contacts</h2>
                    </Col>
                    <Col className="home_col">
                        <img src={Notebook} alt="notebook-img" className="notebook-img" />
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default Home
