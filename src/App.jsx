import React, { Component } from 'react';
import './App.scss';
import Menu from './components/Menu';
import Collage from './components/Collage';
import {allThirty} from './examples';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: allThirty,
      selections: allThirty,
      shape: 'x',
      editing: false,
      hidePanel: false,
    };
    this.collageComponent = React.createRef();
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Determine whether only one panel (menu or collage) should be displayed at a time based
  // on browser width
  handleResize = () => {
    const { hidePanel } = this.state;
    // Width calculation adapted from jQuery source code
    const windowWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.documentElement.clientWidth);
    if (windowWidth < 750 && !hidePanel) {
      this.setState({
        hidePanel: true,
      });
    } else if (windowWidth >= 750 && hidePanel) {
      this.setState({
        hidePanel: false,
      });
    }
  }

  // Submit album selections and shape
  handleSubmit = (selections, shape) => {
    this.setState({
      userInput: selections,
      selections,
      shape,
      editing: false,
    }, () => { this.collageComponent.current.handleChangeFocus(); });
  }

  // Edit collage
  handleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing,
    });
  }

  // Shuffle album order
  handleShuffle = () => {
    const { selections } = this.state;
    let sameAsBefore = true;
    let unshuffled;
    let shuffled;
    // Check that new order is not identical to old order
    while (sameAsBefore) {
      unshuffled = [...selections];
      shuffled = [];
      for (let i = 0; i < selections.length; i += 1) {
        shuffled = [...shuffled,
          unshuffled.splice(Math.floor(Math.random() * unshuffled.length), 1)[0]];
        sameAsBefore = (sameAsBefore === false) ? false : (shuffled[i] === selections[i]);
      }
    }
    this.setState({
      selections: shuffled,
    });
  }

  // Reset collage to original, unshuffled user input album order
  handleReset = () => {
    const { userInput } = this.state;
    this.setState({
      selections: userInput,
    });
  }

  // Delete collage
  handleDelete = () => {
    this.setState({
      selections: [],
      shape: '',
    });
  }

  render() {
    const {
      selections, shape, editing, hidePanel,
    } = this.state;
    // On small screens, hide either selection menu or collage depending on user interaction
    let panelToDisplay;
    if (!hidePanel) {
      panelToDisplay = '';
    } else if (selections.length && !editing) {
      panelToDisplay = 'collage';
    } else {
      panelToDisplay = 'menu';
    }

    return (
      <div className="app">
        <Menu
          selections={selections}
          shape={shape}
          editing={editing}
          panelToDisplay={panelToDisplay}
          submitCollage={this.handleSubmit}
        />
        <Collage
          ref={this.collageComponent}
          selections={selections}
          shape={shape}
          editing={editing}
          panelToDisplay={panelToDisplay}
          shuffleCollage={this.handleShuffle}
          editCollage={this.handleEdit}
          resetCollage={this.handleReset}
          deleteCollage={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
