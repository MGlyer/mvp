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



    render() {
        return (
            <div class='main'>
                look at me!  I'm live on the server!
            </div>
        )
    }
}

ReactDom.render( <App />, document.getElementById('app') )