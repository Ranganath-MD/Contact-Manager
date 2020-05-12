import React, { Component } from 'react'
import Notebook from "../notebook.svg"

class Home extends Component {
    render() {
        return (
            <div>
                <div className="home-container">
                    <div style={{ height: 400, width: "100%", display: "flex"}}>
                        <h2 className="home-heading">Save Your Contacts</h2>
                        <img src={Notebook} alt="notebook-img" className="notebook-img"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
