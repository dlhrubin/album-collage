import React, { Component } from 'react'
import { getStyle } from "../utils"

// Helper function to populate collage initially with a single copy of each album cover
let populate = (selections) => {
    return (
        selections.map((album) => {
            return (
                <div key={album.album}>
                    <img src={album.cover} alt={album.album + ", " + album.artist} />
                </div>
            )
        })
    )
}

// Helper function to add blank squares to the collage
let addBlanks = (collage, indices) => {
    let newArr = [...collage]
    indices.forEach((coord, i) => newArr.splice(coord, 0, <div key={"blank-" + i} className="blank-square" />))
    return newArr
}

// Helper function to insert duplicate covers into the collage as needed
let addDups = (selections, collage, indices) => {
    let newArr = [...collage];
    indices.forEach((tuple, i) => {
        newArr.splice(tuple[1], 0, 
        <div key={selections[tuple[0]].album + "-" + i}>
            <img src={selections[tuple[0]].cover} alt={selections[tuple[0]].album + ", " + selections[tuple[0]].artist} />
        </div>
        )
    });
    return newArr
}

let collageDimensions = {
    "cross-5": [3, 3], "cross-9": [5, 5], "cross-13": [7, 7], "cross-17": [9, 9], "cross-20": [6, 6], "cross-28": [8, 8],
    "x-10": [4, 4], "x-14": [6, 6], "x-18": [6, 6], "x-22": [8, 8], "x-26": [8, 8], "x-30": [10, 10],
    "square-4": [2, 2], "square-9": [3, 3], "square-16": [4, 4], "square-25": [5, 5],
    "diamond-2": [2, 2], "diamond-8": [5, 5], "diamond-18": [6, 6],
    "heart-6": [4, 3], "heart-10": [4, 4], "heart-22": [6, 6], "heart-24": [8, 6],
    "octagon-7": [3, 3], "octagon-28": [6, 6]    
};

/*
let shapeSingleCross = (collage, n) => {
    let gridSize = 5 + (4 * n) - 2 * (n + 1);
    return [...Array(gridSize ** 2).keys()].filter(i => (i - 1) % gridSize && (i < (gridSize * (n + 1)) || i >= (gridSize * (n + 1) + gridSize)))
}
*/
export class Collage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0, 
            scaleFactor: 1
        }
    }

    // Update width and height of collage grid when shape or number of albums changes
    componentDidUpdate(prevProps) {
        if ((this.props.shape !== prevProps.shape) || (this.props.selections.length !== prevProps.selections.length)) {
            let newWidth = this.props.shape ? collageDimensions[this.props.shape + "-" + this.props.selections.length][0] * 174 : 0;
            let newHeight = this.props.shape ? collageDimensions[this.props.shape + "-" + this.props.selections.length][1] * 174 : 0;
            this.setState({
                width: newWidth,
                height: newHeight
            })
            this.handleResize(newWidth, newHeight);
        }
    }

    // Resize collage grid responsively according to browser size
    handleResize = (gridWidth, gridHeight) => {
        let collageWidth = getStyle("collage", "width");
        let collageHeight = getStyle("collage", "height");
        // Take height of editing buttons dock into account to avoid overlap 
        collageHeight -= getStyle("edit-dock", "height") * 2 + 30;

        let xScaleFactor = collageWidth / gridWidth;
        let yScaleFactor = collageHeight / gridHeight;
        let smallerFactor = Math.min(xScaleFactor, yScaleFactor);

        // Prevent collage from disappearing or flipping due to 0/negative scaling
        if (xScaleFactor >= 0 && yScaleFactor >= 0) {
            // Set minimum size for collage such that covers are still likely to be visible
            if (smallerFactor * gridWidth < 215 || smallerFactor * gridHeight < 215) {
                this.setState({
                    scaleFactor: (gridWidth > gridHeight) ? 215/gridHeight : 215/gridWidth
                })
            } else {
                this.setState({
                    scaleFactor: (xScaleFactor <= 1 || yScaleFactor <= 1) ? smallerFactor : 1
                })
            }
        }
    }

    componentDidMount() {
        //this.handleResize(this.state.width, this.state.height);
        window.addEventListener("resize", () => {
            this.handleResize(this.state.width, this.state.height);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            this.handleResize(this.state.width, this.state.height);
        });
    }

    render() {
        // Map covers to their positions
        let collage = populate(this.props.selections);
        // Implement cross shape
        if (this.props.shape === "cross") {
            // Add blank squares
            if (this.props.selections.length === 5) {
                collage = addBlanks(collage, [0, 2, 6, 8])
            } else if (this.props.selections.length === 9) {
                collage = addBlanks(collage, [0, 1, 3, 4, 5, 6, 8, 9, 15, 16, 18, 19, 20, 21, 23, 24])               
            } else if (this.props.selections.length === 13) {
                collage = addBlanks(collage, [0, 1, 2, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 20, 28, 29, 30, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 43, 44, 46, 47, 48])               
            } else if (this.props.selections.length === 17) {
                collage = addBlanks(collage, [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80])               
            } else if (this.props.selections.length === 20) {
                collage = addBlanks(collage, [0, 1, 4, 5, 6, 7, 10, 11, 24, 25, 28, 29, 30, 31, 34, 35])
            } else if (this.props.selections.length === 28) {
                collage = addBlanks(collage, [0, 1, 2, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 21, 22, 23, 40, 41, 42, 45, 46, 47, 48, 49, 50, 53, 54, 55, 56, 57, 58, 61, 62, 63])
            }
        // Implement x collage shape
        } else if (this.props.shape === "x") {
            if (this.props.selections.length === 10) {
                collage = addDups(this.props.selections, collage, [[9, 4], [6, 7], [3, 12], [2, 13], [1, 14], [0, 15]]);
            } else if (this.props.selections.length === 14) {
                collage = addDups(this.props.selections, collage, [[1, 2], [0, 7], [11, 8], [8, 11], [0, 16], [4, 18], [3, 19], [1, 21], [1, 22], [0, 23]]);
                collage = addBlanks(collage, [0, 2, 3, 5, 12, 17, 18, 23, 30, 32, 33, 35]);
            } else if (this.props.selections.length === 18) {
                collage = addDups(this.props.selections, collage, [[17, 4], [14, 9], [13, 10], [10, 13], [6, 20], [5, 21], [3, 24], [2, 25], [1, 26], [0, 27]]);
                collage = addBlanks(collage, [2, 3, 12, 17, 18, 23, 32, 33]);     
            } else if (this.props.selections.length === 22) {
                collage = addDups(this.props.selections, collage, [[1, 2], [0, 7], [19, 8], [16, 13], [15, 14], [12, 17], [8, 24], [7, 25], [0, 28], [4, 30], [3, 31], [1, 33], [1, 34], [0, 35]]);
                collage = addBlanks(collage, [0, 2, 3, 4, 5, 7, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40, 47, 51, 52, 56, 58, 59, 60, 61, 63]);
            } else if (this.props.selections.length === 26) {
                collage = addDups(this.props.selections, collage, [[25, 4], [22, 9], [21, 10], [18, 15], [17, 16], [14, 19], [10, 26], [9, 27], [6, 32], [5, 33], [3, 36], [2, 37], [1, 38], [0, 39]]);
                collage = addBlanks(collage, [2, 3, 4, 5, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40, 47, 51, 52, 58, 59, 60, 61]);
            } else if (this.props.selections.length === 30) {
                collage = addDups(this.props.selections, collage, [[1, 2], [0, 7], [27, 8], [24, 13], [23, 14], [20, 19], [19, 20], [16, 23], [12, 30], [11, 31], [8, 36], [7, 37], [0, 40], [4, 42], [3, 43], [1, 45], [1, 46], [0, 47]])
                collage = addBlanks(collage, [0, 2, 3, 4, 5, 6, 7, 9, 13, 14, 15, 16, 20, 24, 25, 29, 30, 31, 38, 39, 40, 41, 42, 47, 48, 49, 50, 51, 52, 57, 58, 59, 60, 61, 68, 69, 70, 74, 75, 79, 83, 84, 85, 86, 90, 92, 93, 94, 95, 96, 97, 99])
            }
            // Add overlay
            ["top", "right", "bottom", "left", "top-left", "top-right", "bottom-left", "bottom-right"].forEach((triangle, i) => {
                collage.push(<div className={"overlay " + triangle} key={triangle + "-" + i} />)
            })                  
        // Implement square collage shape
        } else if (this.props.shape === "square") {
        // Implement diamond collage shape
        } else if (this.props.shape === "diamond") {
            if (this.props.selections.length === 2) {
                collage = addDups(this.props.selections, collage, [[1, 2], [0, 3]]);
            } else if (this.props.selections.length === 8) {
                collage = addDups(this.props.selections, collage, [[0, 4], [0, 8], [3, 9], [1, 11], [0, 12]]);
                collage = addBlanks(collage, [0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24]);
            } else if (this.props.selections.length === 18) {
                collage = addDups(this.props.selections, collage, [[11, 12], [6, 17], [5, 18], [2, 21], [1, 22], [0, 23]]);
                collage = addBlanks(collage, [0, 1, 4, 5, 6, 11, 24, 29, 30, 31, 34, 35]);
            }
            // Add overlay
            ["top-left", "top-right", "bottom-left", "bottom-right"].forEach((triangle, i) => {
                collage.push(<div className={"overlay " + triangle} key={triangle + "-" + i} />)
            })  
        // Implement heart collage shape
        } else if (this.props.shape === "heart") {
            if (this.props.selections.length === 6) {
                collage = addDups(this.props.selections, collage, [[1, 4], [2, 7], [3, 9], [0, 10]]);
                collage = addBlanks(collage, [8, 11])
            } else if (this.props.selections.length === 10) {
                collage = addDups(this.props.selections, collage, [[1, 8], [2, 11], [3, 12], [0, 13]]);
                collage = addBlanks(collage, [12, 15]);
            } else if (this.props.selections.length === 22) {
                collage = addDups(this.props.selections, collage, [[6, 16], [7, 21], [1, 22], [2, 25], [3, 26], [0, 27]]);
                collage = addBlanks(collage, [2, 3, 24, 29, 30, 31, 34, 35]);
            } else if (this.props.selections.length === 24) {
                collage = addDups(this.props.selections, collage, [[7, 12], [8, 19], [1, 20], [2, 25], [11, 26], [4, 29], [3, 30], [0, 31]]);
                collage = addBlanks(collage, [0, 3, 4, 7, 24, 31, 32, 33, 38, 39, 40, 41, 42, 45, 46, 47]);
            }
            // Add overlay
            ["top", "top-left", "top-right", "bottom-left", "bottom-right"].forEach((triangle, i) => {
                collage.push(<div className={"overlay " + triangle} key={triangle + "-" + i} />)
            })  
        // Implement octagon collage shape
        } else if (this.props.shape === "octagon") {
            if (this.props.selections.length === 7) {
                collage = addDups(this.props.selections, collage, [[2, 6], [0, 8]]);
            } else if (this.props.selections.length === 28) {
                collage = addDups(this.props.selections, collage, [[9, 22], [4, 27], [3, 28], [0, 31]]);
                collage = addBlanks(collage, [0, 5, 30, 35]);
            }
            // Add overlay
            ["top-left", "top-right", "bottom-left", "bottom-right"].forEach((triangle, i) => {
                collage.push(<div className={"overlay " + triangle} key={triangle + "-" + i} />)
            })  
        } else {
            collage = <div />
        }
        let buttonStyle = {opacity: (this.props.editing || !this.props.shape) ? "0.3" : ""};
        let buttonDisabled = (this.props.editing || !this.props.shape) ? true : false;
        return (
            <section className="collage">
                <div className="edit-dock">
                    <button onClick={this.props.editCollage} style={{backgroundColor: this.props.editing ? "var(--highlight)" : "", opacity: !this.props.shape ? "0.3" : ""}} disabled={!this.props.shape ? true : false}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={this.props.shuffleCollage} style={buttonStyle} disabled={buttonDisabled}>
                        <i className="fas fa-random"></i>
                    </button>
                    <button onClick={this.props.resetCollage} style={buttonStyle} disabled={buttonDisabled}>
                        <i className="fas fa-undo"></i>
                    </button>
                    <button onClick={this.props.deleteCollage} style={buttonStyle} disabled={buttonDisabled}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className={"collage-grid " + this.props.shape + "-" + this.props.selections.length} style={{transform: `scale(${this.state.scaleFactor})`, opacity: this.props.editing ? "0.3" : ""}}>
                    {collage}
                </div>
            </section>
        )
    }
}

export default Collage
