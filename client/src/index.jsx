import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.State = {
            bookToShow: {}
        }
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
                look at me!  I'm live on the server!
            </div>
        )
    }
}

ReactDom.render( <App />, document.getElementById('app') )