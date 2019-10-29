import React, {Component} from "react";

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shapes: [
                {
                    name: "square",
                    active: false,
                    icon: "fa-square"
                },
                {
                    name: "heart",
                    active: false,
                    icon: "fa-heart"
                },
                {
                    name: "circle",
                    active: false,
                    icon: "fa-circle"
                },
                {
                    name: "star",
                    active: false,
                    icon: "fa-star"
                }
            ]
        }
    }

    shapeClick = (clicked) => {
        this.setState({
            shapes: this.state.shapes.map((shape) => {
                shape.active = (shape === clicked) ? !shape.active : false;
                return shape
            })
        })
    }

    render() {
        const shapes = this.state.shapes.map((shape) => {
            let shapeClass = (shape.active) ? "fas" : "far";
            let shapeColor = (shape.active) ? "var(--pumpkin)" : "";
            return <button className="shape-btn" onClick={this.shapeClick.bind(this, shape)}>
                    <i className={shapeClass + " " + shape.icon} style={{color: shapeColor}}></i>
                   </button>
        })
        return (
            <div className="menu">
                <h1>Music Collage</h1>
                <div className="album-options">
                    <h2>Albums:</h2>
                    <label>
                        Artist
                        <input type="text" placeholder="Enter artist name..."></input>
                    </label>
                    <label>
                        Album
                        <input type="text" placeholder="Enter album name..."></input>
                    </label>
                    <div className="album-selection">
                        <p>Selection</p>
                        <div className="selection-box"></div>
                    </div>
                </div>
                <div className="shape-options">
                    <h2>Collage shape:</h2>
                    <div className="shapes">
                        {shapes}
                    </div>
                </div>
                <button className="submit-btn">Collage-ify</button>
                
                
            </div>
        )
    }
}

export default Menu;