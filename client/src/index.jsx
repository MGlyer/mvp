import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
const demo = require('../../data.js').books

class App extends React.Component {
    constructor(props) {
        super(props)
        this.State = {
            bookToShow: demo[0],
            genre: ''
        }
        this.findBook = this.findBook.bind(this)
        this.handleGenreSelect = this.handleGenreSelect.bind(this)
    }

    // *********method section
    findBook () {
        let toSend = {
            genre: bookData.genre,
            // era: bookData.era || 'NO ERA'
        }
        axios.post('/', toSend)
             .then((response) => {
                 console.log('from the API: ', response)
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
             .catch((err) [
                 console.error(err)
             ])
    }

    handleGenreSelect(e) {
        console.log(e.target.value)
        this.setState({
            genre: e.target.value
        })
    }



    //*********render section
    render() {
        return (
            <div className='main'>
                <h3>Look-a-Book</h3>
                Please select a genre, and I'll find you a book!

                <div className="dropdown">
                    <select onClick = {this.handleGenreSelect}>
                        <option value=''></option>
                        <option value='History' >History</option>
                        <option value='Romance'>Romance</option>
                        <option value='Fantasy'>Fantasy</option>
                        <option value='Non-Fiction'>Non-Fiction</option>
                        <option value='Sci-Fi'>Sci-Fi</option>
                        <option value='Biography'>Biography</option>
                        <option value='Travel'>Travel</option>
                    </select>
                    <button onClick= {this.findBook}>Find my book!</button>
                </div>

                <div className="bookInfo">

                </div>
            </div>
        )
    }
}

ReactDom.render( <App />, document.getElementById('app') )