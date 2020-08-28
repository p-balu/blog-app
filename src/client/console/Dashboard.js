import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NoPosts from './noPosts'
import Posts from './Posts';
class Dashboard extends Component {
    _isMounted = false;
    state = {
        blogs: []
    }
    addNewProfile = (blogData) => {
        this.setState(prevState => ({
            blogs: [...prevState.blogs, blogData],
        }));
    };
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount = () => {
        this.getBlogs();
        setInterval(this.getBlogs, 1000);
    }
    getBlogs = () => {
        fetch("http://localhost:4000/api/blogs")
            .then(response => response.json())
            .then(response => 
                this.setState({
                blogs: response.data
            }))
    }
    render() {
        const { blogs } = this.state
        const { submitted, success, errors } = this.props
        if (blogs.length === 0) {
            return (
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: "space-between" }} className="postContainer">
                        <h4>Posts</h4>
                        <Link to="/create" className="link">Create</Link>
                    </div>
                    {submitted && success.length > 0 && <span className="successMessage">{success}</span>}
                    {submitted && errors.length > 0 && <span className="errorMessage">{errors}</span>}
                    <NoPosts />
                </div >
            )
        }
        else {
            return (
                <div className="container">
                    {submitted && success.length > 0 && <span className="successMessage">{success}</span>}
                    {submitted && errors.length > 0 && <span className="errorMessage">{errors} </span>}
                    <Posts
                        blogs={this.state.blogs} />
                </div >
            )
        }
    }

}
export default Dashboard