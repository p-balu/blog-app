import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
function searchingFor(search) {
    return function (x) {
        return x.title.toLowerCase().includes(search.toLowerCase()) || !search
    }
}
export default class Posts extends Component {
    state = {
        redirect: false,
        id: [],
        search: '',
    }
    handleClick = (blogId) => {
        this.setState({
            redirect: true,
            id: blogId
        })
    }
    render() {
        const { blogs } = this.props
        const { redirect, search } = this.state
        return (
            redirect === false ?
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: "space-between" }} className="postContainer">
                        <h4>Posts</h4>
                        <Link to="/create" className="link">Create</Link>
                    </div>
                    <input type="text" className="searchField" placeholder="Search by title" value={this.state.search}
                        onChange={(event) => this.setState({
                            search: event.target.value
                        })}
                        name="search" />
                    < table id="students" >
                        <thead >
                            <tr >
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Published</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                blogs.filter(searchingFor(search)).map((blog, id) => (
                                    <tr key={blog.id} onClick={() => this.handleClick(blog.id)}>
                                        <td>{blog.title}</td>
                                        <td>{blog.slug}</td>
                                        <td>{blog.published}</td>
                                        <td><Link to={`/edit/${blog.id}`} className="editLink">Edit</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table >
                </div>
                :
                <Redirect to={`/view/${this.state.id}`} />
        )
    }
}