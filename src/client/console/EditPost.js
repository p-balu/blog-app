import React, { Component } from 'react'
import slugify from '../utils/commonfunctions.js'
import { Redirect } from 'react-router-dom'
export default class EditPost extends Component {
    _isMounted = false;
    state = {
        title: '',
        content: '',
        slug: '',
        published: '',
        checked: false,
        success: '',
        errors: '',
        submitted: false,
        redirect: false
    }
    componentDidMount = () => {
        const id = this.props.match.params.id;
        this.fetchData(id);
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchData = id => {
        this._isMounted = true;
        fetch(`http://localhost:4000/api/find/${id}`)
            .then(response => response.json())
            .then(response => {
                if (this._isMounted) {
                    if (response.data[0] !== undefined) {
                        this.setState({
                            title: response.data[0].title,
                            content: response.data[0].content,
                            published: response.data[0].published
                        })
                        if (this.state.published === "Yes") {
                            this.setState({
                                checked: true
                            })
                        }
                        else {
                            this.setState({
                                checked: false
                            })
                        }
                    }
                    else {
                        this.setState({
                            redirect: true
                        })
                    }
                }
            })
    };
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        this.setState({
            slug: slugify(this.state.title)
        })
    }
    handletoggle = () => {
        this.setState({
            checked: !this.state.checked,
            slug: slugify(this.state.title)
        })
        if (this.state.checked === true) {
            this.setState({ published: "No" })
        }
        else {
            this.setState({ published: "Yes" })
        }
    }
    handleUpdateClick = (event) => {
        this._isMounted = true;
        event.preventDefault();
        const id = this.props.match.params.id;
        this.setState({
            submitted: true,
            success: '',
            errors: ''
        })
        const { title, content, published, slug } = this.state;
        fetch(`http://localhost:4000/api/edit?title=${title}&content=${content}&slug=${slug}&published=${published}&id=${id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(res => {
                if (this._isMounted) {
                    if (res.code === 200) {
                        this.setState({
                            success: "Blog updated Successfully:)"
                        })
                    }
                    else {
                        this.setState({
                            errors: "Blog cannot be updated"
                        })
                    }
                }
            })
    }
    handleDeleteClick = (event) => {
        this._isMounted = true;
        const id = this.props.match.params.id;
        this.setState({
            submitted: true,
            success: '',
            errors: ''
        })
        event.preventDefault();
        fetch(`http://localhost:4000/api/delete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                if (this._isMounted) {
                    if (res.code === 200) {
                        this.setState({
                            success: "Blog Deleted Successfully:)"
                        })
                    }
                    else {
                        this.setState({
                            errors: "Blog cannot be deleted"
                        })
                    }
                }
            })
    }
    render() {
        const { submitted, redirect } = this.state
        return (
            redirect === false ?
                submitted === false ?
                    <form className="formFields" >
                        <h5>Edit Post</h5>
                        <input type="text" placeholder="Post Title" value={this.state.title || ''}
                            onChange={this.handleChange} name="title" className="inputTitleText" />
                        <textarea name="content" className="inputContentText" value={this.state.content || ''} placeholder="Content" onChange={this.handleChange} />
                        <input type="checkbox" className="reactSwitchCheckbox" id={`react-switch-new`} value={this.state.checked} name="checked" onChange={this.handletoggle} />
                        <label className="reactSwitchLabel" htmlFor={`react-switch-new`} style={{ background: this.state.checked && '#4CAF50', }}>
                            <span className={`reactSwitchButton`} /> <span className="spanTextValue">Published</span>
                        </label>
                        <div className="buttons">
                            <button style={{ backgroundColor: "red" }} className="inputFieldButtons" onClick={this.handleDeleteClick}>Delete</button>
                            <button className="inputFieldButtons" onClick={this.handleUpdateClick}>Update</button>
                        </div>
                    </form >
                    :
                    <Redirect to='/' /> :
                <Redirect to="/404" />
        )
    }
}