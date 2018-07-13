import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
const demo = require('../../data.js').books

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookToShow: demo[0],
            genre: '',
            showingFaves: false
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
                 this.setState({bookToShow: book})
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
        this.setState({showingFaves: true})
        this.forceUpdate()
    }

    handleFavesClick() {
        console.log('clicked the faves button!')
        this.setState({showingFaves: false})
        this.forceUpdate()
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
                
                    <div className="bookInfo">
                
                    </div>
                    <div> No Faves FOR YOU </div>
                </div>
            )
        }
    }
}



ReactDom.render( <App />, document.getElementById('app') )