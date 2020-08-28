import React, { Component } from 'react';
import Header from './header';
class Login extends Component {
    state = {
        username: "",
        password: '',
        loggedInStatus: false
    }
    handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }
    handleLoggedInStatus = (value) => {
        this.setState({ loggedInStatus: false })
        this.setState({
            username: '',
            password: ''
        })
    }
    handleSumit = () => {
        const { username, password } = this.state
        if ((username === "admin" && password === "admin") || (username === "Manasa" && password === "Manasa$63"))
            this.setState({
                loggedInStatus: true
            })
        console.log("submit clicked", this.state)
    }
    render() {
        const { loggedInStatus } = this.state
        return (
            loggedInStatus === false ?
                <form className="formFields" onSubmit={this.handleSumit}>
                    <label className="inputFieldLabel" htmlFor="usernmae"><b>UserName</b></label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="formInputField" />
                    <label className="inputFieldLabel" htmlFor="password"><b>Password</b></label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="formInputField" />
                    <button>Login</button>
                </form>
                : <Header
                    name={this.state.username}
                    handleLoggedInStatus={this.handleLoggedInStatus} />
        )
    }
}
export default Login;