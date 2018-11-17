const css=require('./app.scss')

console.log("Testing hot module replacement")

import React, {Component} from 'react'
import ReactDOM from 'react-dom'


class App extends Component{
    render(){
        return(
            <div className="container">
                <h1>This is a awesome react</h1>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))