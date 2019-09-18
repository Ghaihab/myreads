import React, {Component} from 'react';

class BookDetails extends Component {
    showShelfLookup = () => {
        return <select onChange={(event) => this.props.changeBookSelection(this.props.book, event.target.value)}
                       defaultValue={this.props.book.shelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    }
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 188,
                        backgroundImage: 'url("http://books.google.com/books?id=bUybAgAAQBAJ&dq=android&hl=&cd=1&source=gbs_api")'
                    }}></div>
                    <div className="book-shelf-changer">
                        {this.showShelfLookup()}
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">
                    <ol>

                        {this.props.book.authors && this.props.book.authors.map((author) => {
                            return author;
                        }).join(', ')}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookDetails;
