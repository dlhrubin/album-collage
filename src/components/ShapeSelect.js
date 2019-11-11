import React, {Component} from "react";

export class ShapeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shapes: [
                {
                    name: "cross",
                    active: false,
                    icon: "fa-plus",
                    unclicked: "fas",
                    clicked: "fas",
                    min: 4
                },
                {
                    name: "x",
                    active: false,
                    icon: "fa-times",
                    unclicked: "fas",
                    clicked: "fas",
                    min: 4
                },
                {
                    name: "square",
                    active: false,
                    icon: "fa-square", 
                    unclicked: "fas",
                    clicked: "fas",
                    min: 4
                },
                {
                    name: "diamond",
                    active: false,
                    icon: "diamond",
                    unclicked: "diamond",
                    clicked: "diamond",
                    min: 4
                },
                {
                    name: "heart",
                    active: false,
                    icon: "fa-heart",
                    unclicked: "fas",
                    clicked: "fas",
                    min: 4
                },
                {
                    name: "octagon",
                    active: false,
                    icon: "octagon",
                    unclicked: "octagon",
                    clicked: "octagon",
                    min: 4
                }
            ]
        }
    }

    handleClick = (clicked) => {
        this.setState({
            shapes: this.state.shapes.map((shape) => {
                shape.active = (shape === clicked) ? !shape.active : false;
                return shape
            })
        })
        // Submit selected shape to the Menu component
        this.props.selectShape(clicked.name, clicked.active)
        // Clear any submission errors when a shape is clicked
        this.props.clearError();
    }

    render() {
        const shapes = this.state.shapes.map((shape) => {
            // Fill shape if shape has been selected and submit button hasn't been pressed
            let shapeClass = (shape.active && this.props.shape) ? shape.clicked : shape.unclicked;
            let shapeStyle = {}
            // Make shape orange if shape has been selected and submit button hasn't been pressed
            // Make shapes red on "no shape selected" submission error
            shapeStyle["color"] = (this.props.errors.shape) ? "red" : (shape.active && this.props.shape) ? "var(--pumpkin)" : "";    
            // Show shape only if minimum required number of albums have been selected
            shapeStyle["display"] = (this.props.numAlbums >= shape.min) ? "" : "none";
            return <button key={shape.name} className={"shape-btn " + shape.name} style={shapeStyle} onClick={this.handleClick.bind(this, shape)}>
                    {shape.icon.startsWith("fa") ? <i className={shapeClass + " " + shape.icon}></i> : <div></div>}
                   </button>
        })
        return (
            <div className="shape-options">
                <h2>Collage shape:</h2>
                <div className="shapes">
                    {shapes}
                </div>
            </div>                
        )
    }
}

export default ShapeSelect;