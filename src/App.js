import React, {Component} from 'react';
import './App.css';
import Collage from "./components/Collage";

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Collage />
     </div>
    );
  }
}

export default App;
