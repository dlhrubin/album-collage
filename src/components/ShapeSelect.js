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
                    default: "fas"
                },
                {
                    name: "x",
                    active: false,
                    icon: "fa-times",
                    default: "fas"
                },
                {
                    name: "square",
                    active: false,
                    icon: "fa-square", 
                    default: "far"
                },
                {
                    name: "heart",
                    active: false,
                    icon: "fa-heart",
                    default: "far"
                },
                {
                    name: "circle",
                    active: false,
                    icon: "fa-circle",
                    default: "far"
                },
                {
                    name: "star",
                    active: false,
                    icon: "fa-star",
                    default: "far"
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
            let shapeClass = (shape.active && this.props.shape) ? "fas" : shape.default;
            let shapeStyle = {}
            // Make shape orange if shape has been selected and submit button hasn't been pressed
            // Make shapes red on "no shape selected" submission error
            shapeStyle["color"] = (this.props.errors.shape) ? "red" : (shape.active && this.props.shape) ? "var(--pumpkin)" : "";    
            return <button key={shape.name} className={"shape-btn " + shape.name} onClick={this.handleClick.bind(this, shape)}>
                    <i className={shapeClass + " " + shape.icon} style={shapeStyle}></i>
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