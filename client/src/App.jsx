import React from 'react';
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom"
import { Toast } from "react-bootstrap"
import "./Styles/App.css"
import ContactList from "./components/contact/ContactList"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import Account from "./components/Account"
import axios from './axios/axios-config';
import ContactForm from "./components/contact/ContactForm"

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      auth: !!localStorage.getItem("token"),
      redirect: false,
      show: false,
      msgType:""
    }
  }


  handleIsAuthenticated = (bool) => {
    this.setState(() => ({
      auth: bool
    }))
  }

  handleLogout = () => {
    axios.delete("/users/logout")
      .then(response => {
        axios.defaults.headers["x-auth"] = null
        this.handleIsAuthenticated(false)
        localStorage.clear()
        this.setState(() => ({
          redirect: true,
          message: response.data.notice,
          show: true,
          msgType: "success",
        }))
      })
      .catch(err => {
        this.setState(() => ({
          show: true,
          msgType: "error",
          message: err.response.data.notice
        }))
    })
  }

  render() {
    return (
      <BrowserRouter>
        {
          this.state.redirect && <Redirect to="/" />
        }
        <div className="main-container">

          <div className="nav-bar">
            <div>
              {!this.state.auth ? <h2>
                <Link to="/" className="nav-item">
                  Contact Manager
                </Link>
              </h2> : <h2 className="nav-item">Hi, {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username :null }</h2>}

            </div>

            <div>
              {
                this.state.auth &&
                <div>
                  <Link to="/contacts" className="nav-item">Contacts</Link>
                  <Link to="/account" className="nav-item">Account</Link>
                  <span onClick={this.handleLogout} className="nav-item">Logout</span>
                </div>
              }
              {
                !this.state.auth &&
                <div>
                  <Link to="/register" className="nav-item">Register</Link>
                  <Link to="/login" className="nav-item">Login</Link>
                </div>
              }
            </div>
          </div>

          <div className="main-component">

            <Toast
              className={this.state.msgType === "success" ? "toast" : "toast-error"}
              onClose={() => this.setState({ show: false })}
              show={this.state.show}
              autohide
              delay={3000}
            ><Toast.Body>{this.state.message}</Toast.Body></Toast>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/contacts" component={ContactList} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" render={() => <Login handleIsAuthenticated={this.handleIsAuthenticated} />}/>
              <Route path="/account" component={Account} exact />
              <Route path="/contact-form" component={ContactForm} exact />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
