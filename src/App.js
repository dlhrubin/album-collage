import React, {Component} from 'react';
import './App.scss';
import Menu from "./components/Menu";
import Collage from "./components/Collage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: [],
            selections: [],
            shape: "",
            editing: false,
            hidePanel: false
        }
        this.collageComponent = React.createRef();
    }

    // Determine whether only one panel (menu or collage) should be displayed at a time based on browser width
    handleResize = () => {
        // Width calculation adapted from jQuery source code
        let windowWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
        if (windowWidth < 750 && !this.state.hidePanel) {
            this.setState({
                hidePanel: true
            })
        } else if (windowWidth >= 750 && this.state.hidePanel) {
            this.setState({
                hidePanel: false
            })
        }
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    // Submit album selections and shape
    handleSubmit = (selections, shape) => {
        this.setState({
            userInput: selections,
            selections,
            shape,
            editing: false
        })
        setTimeout(() => {
            this.collageComponent.current.handleChangeFocus();
        }, 1)
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

    // Edit collage
    handleEdit = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    // Reset collage to original, unshuffled user input album order
    handleReset = () => {
        this.setState({
            selections: this.state.userInput
        })
    }

    // Delete collage
    handleDelete = () => {
        this.setState({
            selections: [],
            shape: ""
        })
    }

    render() {
        // On small screens, hide either selection menu or collage depending on user interaction
        let panelToDisplay = (!this.state.hidePanel) ? "" : (this.state.selections.length && !this.state.editing) ? "collage" : "menu";
 
        return (
            <div className="app">
                <Menu selections={this.state.selections} shape={this.state.shape} editing={this.state.editing} panelToDisplay={panelToDisplay} submitCollage={this.handleSubmit} editCollage={this.handleEdit}/>
                <Collage ref={this.collageComponent} selections={this.state.selections} shape={this.state.shape} editing={this.state.editing} userInput={this.state.userInput} panelToDisplay={panelToDisplay} shuffleCollage={this.handleShuffle} editCollage={this.handleEdit} resetCollage={this.handleReset} deleteCollage={this.handleDelete}/>
            </div>
        );
    }
}

export default App;
