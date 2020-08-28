import React, { Component } from 'react'
export default class Header extends Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: "space-between" }} className="headerText">
                <h2 style={{ marginLeft: '4%' }}>Dashboard</h2>
                <h2 className="nameHeader">Welcome, Shubham</h2>
            </div>
        )
    }
}