import React, { Component } from 'react';
import './App.scss';
import Menu from './components/Menu';
import Collage from './components/Collage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: [],
      selections: [],
      shape: '',
      backgroundColor: '#ffffff',
      editing: false,
      submitted: false,
      menuOffset: 0,
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
    } else if (windowWidth >= 750) {
      if (hidePanel) {
        this.setState({
          hidePanel: false,
        });
      } else {
        // If not in hide panel mode, get width of menu panel for sliding animation
        this.setState({
          menuOffset: document.getElementById('menu-panel').offsetWidth,
        });
      }
    }
  }

  // Submit album selections and shape
  handleSubmit = (selections, shape) => {
    this.setState({
      userInput: selections,
      selections,
      shape,
      editing: false,
      submitted: true,
    }, () => { this.collageComponent.current.handleChangeFocus(); });
  }

  // Edit collage
  handleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing,
    });
  }

  // Change collage background color
  handleChangeBackground = (e) => {
    this.setState({
      backgroundColor: e.target.value,
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
      for (let i = 0; i < selections.length; i++) {
        shuffled = [...shuffled,
          unshuffled.splice(Math.floor(Math.random() * unshuffled.length), 1)[0]];
        sameAsBefore = !sameAsBefore ? false : (shuffled[i] === selections[i]);
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
      backgroundColor: '#ffffff',
      submitted: false,
      editing: false,
    });
  }

  render() {
    const {
      selections, shape, backgroundColor, editing, submitted, menuOffset, hidePanel,
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
      <div className="app" style={{ background: backgroundColor }}>
        <Menu
          selections={selections}
          shape={shape}
          editing={editing}
          submitted={submitted}
          menuOffset={menuOffset}
          panelToDisplay={panelToDisplay}
          submitCollage={this.handleSubmit}
        />
        <Collage
          ref={this.collageComponent}
          selections={selections}
          shape={shape}
          backgroundColor={backgroundColor}
          editing={editing}
          submitted={submitted}
          menuOffset={menuOffset}
          panelToDisplay={panelToDisplay}
          editCollage={this.handleEdit}
          changeBackground={this.handleChangeBackground}
          shuffleCollage={this.handleShuffle}
          resetCollage={this.handleReset}
          deleteCollage={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
