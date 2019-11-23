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

    // Shuffle album order
    handleShuffle = () => {
        let sameAsBefore = true;
        let unshuffled;
        let shuffled;
        // Check that new order is not identical to old order
        while (sameAsBefore) {
            unshuffled = [...this.state.selections];
            shuffled = [];
            for (let i=0; i < this.state.selections.length; i++) {
                shuffled = [...shuffled, unshuffled.splice(Math.floor(Math.random() * unshuffled.length), 1)[0]];
                sameAsBefore = (sameAsBefore === false) ? false : (shuffled[i] === this.state.selections[i]) ? true : false;
            }
        }
        this.setState ({
            selections: shuffled
        })
    }    

    render() {
        return (
            <div className="app">
                <Menu submitCollage={this.handleSubmit}/>
                <Collage selections={this.state.selections} shape={this.state.shape} shuffle={this.handleShuffle}/>
            </div>
        );
    }
}

export default App;
