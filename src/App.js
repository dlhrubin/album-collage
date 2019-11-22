import React, {Component} from 'react';
import './App.scss';
import Menu from "./components/Menu";
import Collage from "./components/Collage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: [],
            shape: ""
        }
    }
  
    handleSubmit = (selections, shape) => {
        this.setState({
            selections,
            shape
        })
    }

    render() {
        return (
            <div className="app">
                <Menu submitCollage={this.handleSubmit}/>
                <Collage selections={this.state.selections} shape={this.state.shape}/>
            </div>
        );
    }
}

export default App;
