import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import './BookDetails'
import BookDetails from "./BookDetails";
import {BrowserRouter, Route, Link} from "react-router-dom";

class BooksApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            booksMarket: [],
            query: '',
        }
    }

    changeBookSelection(theBook, newSelection) {
        BooksAPI.update(theBook, newSelection).then(() => BooksAPI.getAll().then((books) => {
            this.setState({books});
        }));
    }

    searchBookInMarket(query) {
        this.setState({query});
        BooksAPI.search(query).then((books) => {
            if (books === undefined || books.hasOwnProperty('error')) {
                this.setState({booksMarket: []});
                return;
            }
            this.setState({booksMarket: books});
        });
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <div className="search-books">
                        <Route path={'/search'} render={() => (
                            <React.Fragment>
                                <div className="search-books-bar">
                                    <Link to={'/'}>
                                        <button className="close-search">Close</button>
                                    </Link>
                                    <div className="search-books-input-wrapper">
                                        <input type="text" placeholder="Search by title or author"
                                               value={this.state.query}
                                               onChange={(event) => this.searchBookInMarket(event.target.value)}/>
                                    </div>
                                </div>
                                <div className="search-books-results">
                                    <ol className="books-grid">
                                        {this.state.booksMarket.length ? this.state.booksMarket.map((book) => {
                                            if (!book.shelf) {
                                                book.shelf = 'none';
                                            }
                                            return <BookDetails book={book} key={book.id}
                                                                changeBookSelection={this.changeBookSelection.bind(this)}/>
                                        }) : 'No Books Found'}
                                    </ol>
                                </div>
                            </React.Fragment>
                        )}/>

                    </div>
                    <Route exact path={'/'} render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Currently Reading</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                {this.state.books.map((book) => {
                                                    if (book.shelf === 'currentlyReading') {
                                                        return <BookDetails book={book} key={book.id}
                                                                            changeBookSelection={this.changeBookSelection.bind(this)}/>
                                                    }
                                                    return null;
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                {this.state.books.map((book) => {
                                                    if (book.shelf === 'wantToRead') {
                                                        return <BookDetails book={book} key={book.id}
                                                                            changeBookSelection={this.changeBookSelection.bind(this)}/>
                                                    }
                                                    return null;
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">
                                                {this.state.books.map((book) => {
                                                    if (book.shelf === 'read') {
                                                        return <BookDetails book={book} key={book.id}
                                                                            changeBookSelection={this.changeBookSelection.bind(this)}/>
                                                    }
                                                    return null;
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to={'/search'} className="button">
                                    <button>Add a book</button>
                                </Link>
                            </div>
                        </div>
                    )}/>

                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
