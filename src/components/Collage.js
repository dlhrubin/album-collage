import React, { Component } from 'react'

// Helper function to add blank squares to the collage
let addBlanks = (collage, indices) => {
    let newArr = [...collage]
    indices.forEach((coord, i) => newArr.splice(coord, 0, <div key={"blank-" + i} className="blank-square" />))
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
        let collage;
        // Implement cross shape
        if (this.props.shape === "cross") {
            // Map covers to their positions
            collage = this.props.selections.map((album, i) => {
                return (
                    <div key={album.album}>
                        <img src={album.cover} alt={album.album + ", " + album.artist} />
                    </div>
                )
            });
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
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {![4, 5, 7, 8].includes(i) ? <div className={"overlay " + ([0, 2, 6].includes(i) ? "top-left" : "top-right")} /> : <div />}
                        </div>
                    )
                });
                // Add duplicates of covers as needed
                [[9, 4], [6, 7], [3, 12], [2, 13], [1, 14], [0, 15]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ([4, 12, 14].includes(tuple[1]) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
            } else if (this.props.selections.length === 14) {
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {![2, 5, 6, 7, 9, 10, 12, 13].includes(i) ? <div className={"overlay " + ([0, 1, 3, 11].includes(i) ? "top-right" : "top-left")} /> : <div />}
                            {[0, 1].includes(i) ? <div className={"overlay top-left"} /> : <div />}
                        </div>
                    )
                });
                // Add duplicates of covers as needed
                [[1, 2], [0, 7], [11, 8], [8, 11], [0, 16], [4, 18], [3, 19], [1, 21], [1, 22], [0, 23]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        {[2, 7, 16, 21, 22, 23].includes(tuple[1]) ? <div className={"overlay " + ([2, 16].includes(tuple[1]) ? "top-left" : [7, 21].includes(tuple[1]) ? "top-right" : "bottom-right")} /> : <div />}
                        <div className={"overlay " + ([2, 8, 16, 19, 22, 23].includes(tuple[1]) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
                // Add blank squares
                collage = addBlanks(collage, [0, 2, 3, 5, 12, 17, 18, 23, 30, 32, 33, 35])
            } else if (this.props.selections.length === 18) {
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {![4, 7, 8, 9, 11, 12, 15, 16].includes(i) ? <div className={"overlay " + ([0, 2, 6, 10, 14].includes(i) ? "top-left" : "top-right")} /> : <div />}
                        </div>
                    )
                });
                // Add duplicates of covers as needed
                [[17, 4], [14, 9], [13, 10], [10, 13], [6, 20], [5, 21], [3, 24], [2, 25], [1, 26], [0, 27]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ([4, 10, 21, 24, 26].includes(tuple[1]) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
                // Add blank squares
                collage = addBlanks(collage, [2, 3, 12, 17, 18, 23, 32, 33])                
            } else if (this.props.selections.length === 22) {
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {![2, 5, 6, 9, 10, 11, 13, 14, 17, 18].includes(i) ? <div className={"overlay " + ([0, 1, 3, 7, 15, 19].includes(i) ? "top-right" : "top-left")} /> : <div />}
                            {[0, 1].includes(i) ? <div className={"overlay top-left"} /> : <div />}
                        </div>
                    )
                });
                // Add duplicates of covers as needed
                [[1, 2], [0, 7], [19, 8], [16, 13], [15, 14], [12, 17], [8, 24], [7, 25], [0, 28], [4, 30], [3, 31], [1, 33], [1, 34], [0, 35]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        {[2, 7, 28, 33, 34, 35].includes(tuple[1]) ? <div className={"overlay " + ([2, 28].includes(tuple[1]) ? "top-left" : [7, 33].includes(tuple[1]) ? "top-right" : "bottom-right")} /> : <div />}
                        <div className={"overlay " + ([2, 8, 14, 25, 28, 31, 34, 35].includes(tuple[1]) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
                // Add blank squares
                collage = addBlanks(collage, [0, 2, 3, 4, 5, 7, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40, 47, 51, 52, 56, 58, 59, 60, 61, 63]);
            } else if (this.props.selections.length === 26) {
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {![4, 7, 8, 11, 12, 13, 15, 16, 19, 20, 23, 24].includes(i) ? <div className={"overlay " + ([0, 2, 6, 10, 14, 18, 22].includes(i) ? "top-left" : "top-right")} /> : <div />}
                        </div>
                    )
                });
                // Add duplicates of covers as needed
                [[25, 4], [22, 9], [21, 10], [18, 15], [17, 16], [14, 19], [10, 26], [9, 27], [6, 32], [5, 33], [3, 36], [2, 37], [1, 38], [0, 39]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ([4, 10, 16, 27, 33, 36, 38].includes(tuple[1]) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
                // Add blank squares
                collage = addBlanks(collage, [2, 3, 4, 5, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40, 47, 51, 52, 58, 59, 60, 61]);
            }
        // Implement square collage shape
        } else if (this.props.shape === "square") {
            // Map covers to their positions
            collage = this.props.selections.map(album => {
                return (
                    <div key={album.album}>
                        <img src={album.cover} alt={album.album + ", " + album.artist} />
                    </div>
                )
            });
        // Implement diamond collage shape
        } else if (this.props.shape === "diamond") {
            if (this.props.selections.length === 2) {
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            <div className={"overlay " + (i ? "top-left" : "top-right")} />
                        </div>
                    )
                });
                collage.reverse();
                collage = [...collage, this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            <div className={"overlay " + (i ? "bottom-right" : "bottom-left")} />
                        </div>
                    )
                })];
            }
            else if (this.props.selections.length === 8) {
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {([0, 1, 3].includes(i)) ? <div className={"overlay " + ((i === 3) ? "top-right" : "top-left")} /> : <div />}
                            {i ? <div /> : <div className="overlay top-right" />}
                        </div>
                    )
                });
                // Add duplicates of covers as needed
                [[0, 4], [0, 8], [0, 12], [3, 7], [1, 9]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ([4, 7].includes(tuple[1]) ? "bottom-left" : "bottom-right")} />
                        {(!tuple[0]) ? <div className={"overlay " + ((tuple[1] === 4) ? "top-left" : (tuple[1] === 8) ? "top-right" : "bottom-left")} /> : <div />}
                    </div>
                    )
                }); 
                // Add blank squares
                collage = addBlanks(collage, [0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24])
            }
        // Implement heart collage shape
        } else if (this.props.shape === "heart") {
            if (this.props.selections.length === 6) {
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {(i < 4) ? <div className={"overlay " + ((i % 2) ? "top-right" : "top-left")} /> : <div />}
                        </div>
                    )
                });
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
                // Map covers to their positions
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {(i === 0 || i === 2) ? <div className={"overlay " + (i ? "top-right" : "top-left")} /> : <div />}
                        </div>
                    )
                });
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
