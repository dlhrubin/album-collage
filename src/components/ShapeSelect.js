import React, {Component} from "react";

export class ShapeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shapes: [
                {
                    name: "cross",
                    active: false,
                    coords: "21,3 15,3 15,15 3,15 3,21 15,21 15,33 21,33 21,21 33,21 33,15 21,15",
                    numbers: [5, 9, 13, 17, 20, 28]
                },
                {
                    name: "x",
                    active: false,
                    coords: "29,3 18,14 7,3 3,7 14,18 3,29 7,33 18,22 29,33 33,29 22,18 33,7",
                    numbers: [10, 14, 18, 22, 26, 30]
                },
                {
                    name: "square",
                    active: false,
                    coords: "32,4 4,4 4,32 32,32", 
                    numbers: [4, 9, 16, 25]
                },
                {
                    name: "diamond",
                    active: false,
                    coords: "18,3 3,18 18,33 33,18",
                    numbers: [2, 8, 18]
                },
                {
                    name: "heart",
                    active: false,
                    coords: "32,8 28,4 24,4 18,10 12,4 8,4 4,8 4,16 18,30 32,16",
                    numbers: [6, 10, 22, 24]
                },
                {
                    name: "octagon",
                    active: false,
                    coords: "23,3 13,3 3,13 3,23 13,33 23,33 33,23 33,13",
                    numbers: [7, 28]
                }
            ]
        }
    }

    // Update local state of each shape when parent state changes, e.g. when editing or deleting an album
    componentDidUpdate(prevProps) {
        if (this.props.selectedShape !== prevProps.selectedShape) {
            if (!this.props.selectedShape) {
                this.setState({
                    shapes: this.state.shapes.map((shape) => {
                        shape.active = false;
                        return shape
                    })
                })
            } else if (this.props.selectedShape && !prevProps.selectedShape) {
                this.setState({
                    shapes: this.state.shapes.map((shape) => {
                        shape.active = (shape.name === this.props.selectedShape) ? true : false;
                        return shape
                    })
                })
            }
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
            let shapeStyle = {};
            let svgStyle = {};
            // Fill shape if shape has been selected and submit button hasn't been pressed
            // Make shape orange if shape has been selected and submit button hasn't been pressed
            // Make shapes red on "no shape selected" submission error
            svgStyle["fill"] = svgStyle["stroke"] = (this.props.errors.shape) ? "red" : (shape.active && this.props.shape) ? "var(--highlight)" : "";
            // Show shape only if minimum required number of albums have been selected
            shapeStyle["display"] = (shape.numbers.includes(this.props.numAlbums)) ? "" : "none";
            return <button key={shape.name} className={"shape-btn " + shape.name} aria-label={"Select " + shape.name + " shape"} style={shapeStyle} onClick={this.handleClick.bind(this, shape)}>
                        <svg width="36" height="36" style={svgStyle}>
                            <polygon points={shape.coords}/>
                        </svg>                   
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