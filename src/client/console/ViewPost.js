import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
class ViewPost extends Component {
    state = {
        title: '',
        content: '',
        redirect: false
    }
    componentDidMount = () => {
        const id = this.props.match.params.id;
        this.fetchData(id);
    }
    fetchData = id => {
        fetch(`http://localhost:4000/api/find/${id}`)
            .then(response => response.json())
            .then(response => {
                if (response.data[0] !== undefined) {
                    this.setState({
                        title: response.data[0].title,
                        content: response.data[0].content,
                    })
                }
                else {
                    this.setState({
                        redirect: true
                    })
                }
            })
    };
    render() {
        const { redirect } = this.state
        return (
            redirect === false ?
                <div className="viewContainer">
                    <p className="viewTitleText">{this.state.title}</p>
                    <p className="viewContentText">{this.state.content}</p>
                </div>
                : <Redirect to="/404" />
        )
    }
}
export default ViewPost;