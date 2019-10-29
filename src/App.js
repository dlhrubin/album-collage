import React, {Component} from 'react';
import './App.css';
import Menu from "./components/Menu";
import Collage from "./components/Collage";

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="app">
        <Menu />
        <Collage />
     </div>
    );
  }
}

export default App;
