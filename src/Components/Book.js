import {Component} from 'react';
import axios from 'axios';

class Book extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.book.title,
            author: this.props.book.author,
            editView: false
        }
    }

    handleInputs = (e) => {
        //by placing a name on the input tags below, we can create one function that changes all inputs.
        //this is done by placing a 'name' attribute on the input, with the name matching the name of the state
        //value you want to change
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleView = () => {
        //this will change state based on it's current value, toggling from true to false
        if(this.state.editView){
            this.setState({editView: false})
        } else {
            this.setState({editView: true})
        }
    }

    updateBook = () => {
        axios.put(`/api/book/${this.props.book.id}`, {title: this.state.title, author: this.state.author})
            .then(() => {
                this.props.getBooksFn()
                this.setState({
                    title: '',
                    author: '',
                    editView: false
                })
            })
            .catch(err => console.log(err));
    }

    deleteBook = () => {
        axios.delete(`/api/book/${this.props.book.id}`)
            .then(() => this.props.getBooksFn())
            .catch(err => console.log(err));
    }

    render(){
        //destructuring makes using state and props values easier
        const {title, author, editView} = this.state;
        const {book} = this.props;

        return (
            <section>
                {editView
                    ? (
                        <section>
                            <input value={title} name='title' onChange={e => this.handleInputs(e)}/>
                            <input value={author} name='author' onChange={e => this.handleInputs(e)}/>
                            <button onClick={this.updateBook}>Submit</button>
                        </section>
                    )
                    : (
                        <section>
                            <h3>{book.title}</h3>
                            <h4>{book.author}</h4>
                            <button onClick={this.toggleView}>Edit</button>
                            <button onClick={this.deleteBook}>Delete</button> 
                        </section>
                    )}   
            </section>
        )
    }
}

export default Book;