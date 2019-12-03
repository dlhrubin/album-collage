import React, { Component } from 'react'

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



/*
let shapeSingleCross = (collage, n) => {
    let gridSize = 5 + (4 * n) - 2 * (n + 1);
    return [...Array(gridSize ** 2).keys()].filter(i => (i - 1) % gridSize && (i < (gridSize * (n + 1)) || i >= (gridSize * (n + 1) + gridSize)))
}
*/
export class Collage extends Component {

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
            }
            else if (this.props.selections.length === 8) {
                collage = addDups(this.props.selections, collage, [[0, 4], [0, 8], [3, 9], [1, 11], [0, 12]]);
                collage = addBlanks(collage, [0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24])
            }
            // Add overlay
            ["top-left", "top-right", "bottom-left", "bottom-right"].forEach((triangle, i) => {
                collage.push(<div className={"overlay " + triangle} key={triangle + "-" + i} />)
            })  
        // Implement heart collage shape
        } else if (this.props.shape === "heart") {
            if (this.props.selections.length === 6) {
                // Add duplicates of covers as needed
                [[1, 4], [2, 7], [3, 9], [0, 10]].forEach(tuple => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-2"}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ((tuple[0] % 2) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
                // Add blank squares
                collage = addBlanks(collage, [8, 11])
            }
        // Implement octagon collage shape
        } else if (this.props.shape === "octagon") {
            if (this.props.selections.length === 7) {
                // Add duplicates of covers as needed
                [[2, 6], [0, 8]].forEach(tuple => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-2"}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + (tuple[0] ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
            }
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
                <div className={"collage-grid " + this.props.shape + "-" + this.props.selections.length} style={{opacity: this.props.editing ? "0.3" : ""}}>
                    {collage}
                </div>
            </section>
        )
    }
}

export default Collage
