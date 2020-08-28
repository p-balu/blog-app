import React, { Component } from 'react';
import slugify from '../utils/commonfunctions.js'
import { Redirect } from 'react-router-dom'
class CreatePosts extends Component {
    _isMounted = false;
    state = {
        title: '',
        content: '',
        published: 'No',
        slug: '',
        checked: false,
        submitted: false,
        success: '',
        errors: '',
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this._isMounted = true;
        console.log(this.state);
        this.setState({
            submitted: true,
            title: '',
            content: '',
            slug: '',
            checked: false,
            success: '',
            errors: '',
            published: "No",
        })
        const { title, content, published, slug } = this.state;
        fetch(`http://localhost:4000/api/add?title=${title}&content=${content}&slug=${slug}&published=${published}`, {
            method: 'POST',
        })
            .then(res => res.json())
            .then(res => {
                if (this._isMounted) {
                    if (res.code === 200) {
                        this.setState({
                            success: "Blog added Successfully:)"
                        })
                    }
                    else {
                        this.setState({
                            errors: "Blog cannot be added"
                        })
                    }
                }
            })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
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
            checked: !this.state.checked
        })
        if (this.state.checked === true) {
            this.setState({ published: "No" })
        }
        else {
            this.setState({ published: "Yes" })
        }
    }
    render() {
        const { checked, submitted } = this.state
        return (
            submitted === false ?
                <div>
                    < form onSubmit={this.handleSubmit} className="formFields" >
                        <h5>Create Post</h5>
                        <input type="text" placeholder="Post Title" value={this.state.title}
                            onChange={this.handleChange} name="title" className="inputTitleText" required />
                        <textarea name="content" className="inputContentText" value={this.state.content} placeholder="Content" onChange={this.handleChange} required />
                        <input type="checkbox" className="reactSwitchCheckbox" id={`react-switch-new`} value={this.state.checked} name="checked" onChange={this.handletoggle} />
                        <label className="reactSwitchLabel" htmlFor={`react-switch-new`} style={{ background: checked && '#4CAF50', }}>
                            <span className={`reactSwitchButton`} /> <span className="spanTextValue">Published</span>
                        </label>
                        <button className="inputFieldButton">Create</button>
                    </form >
                </div>
                :
                <Redirect to="/" />
        )
    }
}
export default CreatePosts