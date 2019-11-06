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
        this.props.selectShape(clicked.name)
    }

    render() {
        const shapes = this.state.shapes.map((shape) => {
            let shapeClass = (shape.active) ? "fas" : shape.default;
            let shapeColor = (shape.active) ? "var(--pumpkin)" : "";
            return <button key={shape.name} className={"shape-btn " + shape.name} onClick={this.handleClick.bind(this, shape)}>
                    <i className={shapeClass + " " + shape.icon} style={{color: shapeColor}}></i>
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