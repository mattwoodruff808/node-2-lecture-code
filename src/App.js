import {Component} from 'react';
import axios from 'axios';
import Book from './Components/Book';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      title: '',
      author: ''
    }
  }

  componentDidMount(){
    this.getBooks();
  }

  handleInputs = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  getBooks = () => {
    axios.get('/api/books')
      .then(res => {
        this.setState({books: res.data})
      })
      .catch(err => console.log(err));
  }

  addBook = () => {
    const {title, author} = this.state

    axios.post('/api/book', {title: title, author: author})
      .then(res => {
        this.setState({
          books: res.data,
          title: '',
          author: ''
        })
      })
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>WR8's Bookshelf</h1>
          <input value={this.state.title} name='title' placeholder='Title' onChange={e => this.handleInputs(e)}/>
          <input value={this.state.author} name='author' placeholder='Author' onChange={e => this.handleInputs(e)}/>
          <button onClick={this.addBook}>Add Book</button>
          {this.state.books.map(book => (
            <Book key={book.id} book={book} getBooksFn={this.getBooks}/>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
