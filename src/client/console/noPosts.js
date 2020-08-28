import React, { Component } from "react"
import { Link } from "react-router-dom"
class NoPosts extends Component {
    render() {
        return (
            <div className="noPostsContainer">
                <p className="emptyBackground"></p>
                <p style={{ fontSize: 'x-large' }}>No Posts</p>
                <Link to="/create" >Create</Link>
            </div>
        )
    }
}
export default NoPosts