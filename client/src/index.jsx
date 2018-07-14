import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import FavoriteBook from './components/favorite.jsx'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookToShow: {},
            genre: '',
            favorites: [],
            showingFaves: false,
            searchMade: false
        }
        this.findBook = this.findBook.bind(this)
        this.getFaves = this.getFaves.bind(this)
        this.addFave = this.addFave.bind(this)
        this.handleGenreSelect = this.handleGenreSelect.bind(this)
        this.handleMainClick = this.handleMainClick.bind(this)
        this.handleFavesClick = this.handleFavesClick.bind(this)
        this.removeFavorite = this.removeFavorite.bind(this)
        this.updateFaves = this.updateFaves.bind(this)
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

    getFaves (cb) {
        axios.get('/faves')
             .then((response) => {
                 console.log('from the database: ', response.data)
                 this.setState({favorites: response.data})
                 cb(response.data)
             })
             .catch((err) => {
                 console.error(err)
             })
    }

    addFave() {
        let toSend = {
            title: this.state.bookToShow.volumeInfo.title,
            img: this.state.bookToShow.volumeInfo.imageLinks.thumbnail
        }
        axios.post('/faves', toSend)
              .then((response) => console.log('favorite added!'))
              .catch((err) => console.error(err))
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
        this.getFaves((data) => {
            console.log(data)
            this.setState({showingFaves: true})
        })
    }

    removeFavorite(fave) {
        console.log('removing said item')
        let currentFaves = this.state.favorites.slice();
        for (var i =0; i < currentFaves.length; i++) {
            if (currentFaves[i].title === fave.title) {
                currentFaves.splice(i, 1);
                break
            }
        }
        this.setState({favorites: currentFaves})
        this.updateFaves(fave)
    }

    updateFaves(toUpdate) {
        axios.post('/remove', toUpdate)
             .then((response) => console.log('removed from db'))
             .catch((err) => console.error(err))
    }







    render() {
        if (this.state.showingFaves) {
            return (
                <div>
                    <h1>Look-a-Book</h1>
                    <div className= "subtitle">here are the faaaaves!</div>
                    <button className = "mainScreen" onClick = {this.handleMainClick}>Main</button>
                    <button className = "showFaves" onClick = {this.handleFavesClick}>Show Favorited Books</button>
                    <div className = 'favorites'>
                    {this.state.favorites.map((fave) => 
                        <FavoriteBook stats = {fave} func = {this.removeFavorite}/>
                    )}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Look-a-Book</h1>
                    <div className= "subtitle">Please select a genre, and I'll find you a book!</div>
                    <div>
                        <button className = "mainScreen" onClick = {this.handleMainClick}>Main</button>
                        <button className = "showFaves" onClick = {this.handleFavesClick}>Show Favorited Books</button>
                    </div>
                
                    <div className= "buttons">
                        <select className="dropdown" onClick = {this.handleGenreSelect}>
                            <option value=''>Select an Option</option>
                            <option value='History' >History</option>
                            <option value='Romance'>Romance</option>
                            <option value='Fantasy'>Fantasy</option>
                            <option value='Sci-Fi'>Sci-Fi</option>
                            <option value='Biography'>Biography</option>
                            <option value='Travel'>Travel</option>
                        </select>
                        <button className = "find" onClick= {this.findBook}>Find my book!</button>
                        { this.state.searchMade ?
                            <button className= "save" onClick = {this.addFave}>Save this book!</button>
                            : null
                        }
                    </div>
                

                    {
                        this.state.searchMade ?
                        <div>
                            <div className="bookInfo">
                        
                            </div>
                            <div className = 'headerHeader'> Here is your book info</div>


                            <div className = "bookInfoMain">
                                <div className = "bookInfoImg">
                                <img className='bookImg' src = {`${this.state.bookToShow.volumeInfo.imageLinks.thumbnail}`} ></img>
                                </div>

                                <div className="bookInfo1">
                                <div>{`${this.state.bookToShow.volumeInfo.title}`}</div>
                                Author: {`${this.state.bookToShow.volumeInfo.authors[0]}`}
                                <br/>
                                Published: {`${this.state.bookToShow.volumeInfo.publishedDate}`}
                                {
                                    this.state.bookToShow.saleInfo.retailPrice ?
                                    <span>
                                    Price: {`${this.state.bookToShow.saleInfo.retailPrice.amount}`}
                                    <a href = {`${this.state.bookToShow.saleInfo.buyLink}`}>Buy Here</a>
                                    </span>
                                    : null
                                }
                                </div>
                                <div className= "bookInfo2">
                                Synposis: {`${this.state.bookToShow.volumeInfo.description}`}
                                </div>
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