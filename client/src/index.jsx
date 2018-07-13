import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
// const demo = require('../../data.js').books

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookToShow: {},
            genre: '',
            showingFaves: false,
            searchMade: false
        }
        this.findBook = this.findBook.bind(this)
        this.getFaves = this.getFaves.bind(this)
        this.handleGenreSelect = this.handleGenreSelect.bind(this)
        this.handleMainClick = this.handleMainClick.bind(this)
        this.handleFavesClick = this.handleFavesClick.bind(this)
    }

    // *********method section
    findBook () {
        let toSend = {
            genre: this.state.genre,
            // era: bookData.era || 'NO ERA'
        }
        axios.post('/', toSend)
             .then((response) => {
                 console.log('from the API: ', response)
                 let book = this.pluckRandomBook(response.data)
                 this.setState({bookToShow: book, searchMade: true})
                //  console.log(this.state.bookToShow)
             })
             .catch((err) => {
                 console.error(err)
             })
    }

    getFaves () {
        axios.get('/faves')
             .then((response) => {
                 console.log('from the database: ', response)
             })
             .catch((err) => {
                 console.error(err)
             })
    }

    handleGenreSelect(e) {
        this.setState({
            genre: e.target.value
        })
    }

    pluckRandomBook(books) {
        let ind = Math.floor(Math.random() * books.length)
        return books[ind]
    }

    handleMainClick() {
        console.log('clicked the main button!')
        this.setState({showingFaves: false})
    }

    handleFavesClick() {
        console.log('clicked the faves button!')
        this.setState({showingFaves: true})
        // this.getFaves()
    }







    render() {
        if (this.state.showingFaves) {
            return (
                <div>
                    <button className = "mainScreen" onClick = {this.handleMainClick}>Main</button>
                    <button className = "showFaves" onClick = {this.handleFavesClick}>Show Favorited Books</button>
                    <div> here are the faaaaves!</div>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Look-a-Book</h3>
                    <span>Please select a genre, and I'll find you a book!</span>
                    <div>
                        <button className = "mainScreen" onClick = {this.handleMainClick}>Main</button>
                        <button className = "showFaves" onClick = {this.handleFavesClick}>Show Favorited Books</button>
                    </div>
                
                    <div className="dropdown">
                        <select onClick = {this.handleGenreSelect}>
                            <option value=''></option>
                            <option value='History' >History</option>
                            <option value='Romance'>Romance</option>
                            <option value='Fantasy'>Fantasy</option>
                            <option value='Sci-Fi'>Sci-Fi</option>
                            <option value='Biography'>Biography</option>
                            <option value='Travel'>Travel</option>
                        </select>
                        <button onClick= {this.findBook}>Find my book!</button>
                        <button className="favorite">Save this book!</button>
                    </div>
                

                    {
                        this.state.searchMade ?
                        <div>
                            <div className="bookInfo">
                        
                            </div>
                            <div> Here is your book info: </div>

                            <div>
                            <img className='bookImg' src = {`${this.state.bookToShow.volumeInfo.imageLinks.thumbnail}`} ></img>
                            </div>

                            <div>
                            Author: {`${this.state.bookToShow.volumeInfo.authors[0]}`}
                            Published: {`${this.state.bookToShow.volumeInfo.publishedDate}`}
                            Synposis: {`${this.state.bookToShow.volumeInfo.description}`}
                            Price: ${`${this.state.bookToShow.saleInfo.retailPrice.amount}`}
                            <a href={`${this.state.bookToShow.saleInfo.buyLink}`}>Buy Here</a>
                            </div>
                        </div>
                        :
                        null
                    }
                    
                </div>
            )
        }
    }
}



ReactDom.render( <App />, document.getElementById('app') )