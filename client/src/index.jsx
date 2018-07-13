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
    }

    // *********method section
    findBook (bookData) {
        let toSend = {
            genre: bookData.genre,
            era: bookData.era || 'NO ERA'
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



    //*********render section
    render() {
        return (
            <div class='main'>
                <h3>Look-a-Book</h3>
                Please select a genre, and I'll find you a book!

                <div class="dropdown">
                    <select>
                        <option value=''></option>
                        <option value='History'>History</option>
                        <option value='Romance'>Romance</option>
                        <option value='Fantasy'>Fantasy</option>
                    </select>
                    <button onClick= {this.findBook}>Find my book!</button>
                </div>

                <div class="bookInfo">
                    
                </div>
            </div>
        )
    }
}

ReactDom.render( <App />, document.getElementById('app') )