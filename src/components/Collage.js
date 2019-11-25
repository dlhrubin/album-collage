import React, { Component } from 'react'

// Helper function to add blank squares to the collage
let addBlanks = (collage, indices) => {
    let newArr = [...collage]
    indices.forEach((coord, i) => newArr.splice(coord, 0, <div key={"blank-" + i} className="blank-square" />))
    return newArr
}

export class Collage extends Component {

    render() {
        let collage;
        // Implement cross shape
        if (this.props.shape === "cross") {
            collage = this.props.selections.map((album, i) => {
                return (
                    <div key={album.album}>
                        <img src={album.cover} alt={album.album + ", " + album.artist} />
                    </div>
                )
            });
            if (this.props.selections.length === 5) {
                collage = addBlanks(collage, [0, 2, 6, 8])
            } else if (this.props.selections.length === 9) {
                collage = addBlanks(collage, [0, 1, 3, 4, 5, 6, 8, 9, 15, 16, 18, 19, 20, 21, 23, 24])               
            }
        // Implement square collage shape
        } else if (this.props.shape === "square") {
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
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {([0, 1, 3].includes(i)) ? <div className={"overlay " + ((i === 3) ? "top-right" : "top-left")} /> : <div />}
                            {i ? <div /> : <div className="overlay top-right" />}
                        </div>
                    )
                });
                [[3, 7], [1, 9]].forEach(tuple => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-2"}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ((tuple[0] === 3) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });               
                [[0, 4], [0, 8], [0, 12]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i + 1}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ((tuple[1] === 4) ? "top-left" : (tuple[1] === 8) ? "top-right" : "bottom-left")} />
                        <div className={"overlay " + ((tuple[1] === 4) ? "bottom-left" : (tuple[1] === 8) ? "bottom-right" : "bottom-right")} />
                    </div>
                    )
                });
                collage = addBlanks(collage, [0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24])
            }
        // Implement heart collage shape
        } else if (this.props.shape === "heart") {
            if (this.props.selections.length === 6) {
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {(i < 4) ? <div className={"overlay " + ((i % 2) ? "top-right" : "top-left")} /> : <div />}
                        </div>
                    )
                });
                [[1, 4], [2, 7], [3, 9], [0, 10]].forEach(tuple => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-2"}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist} />
                        <div className={"overlay " + ((tuple[0] % 2) ? "bottom-left" : "bottom-right")} />
                    </div>
                    )
                });
                collage = addBlanks(collage, [8, 11])
            }
        // Implement octagon collage shape
        } else if (this.props.shape === "octagon") {
            if (this.props.selections.length === 7) {
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist} />
                            {(i === 0 || i === 2) ? <div className={"overlay " + (i ? "top-right" : "top-left")} /> : <div />}
                        </div>
                    )
                });
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
