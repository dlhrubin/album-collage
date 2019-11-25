import React, { Component } from 'react'

// Helper function to add blank squares to the collage
let addBlanks = (collage, indices) => {
    let newArr = [...collage]
    indices.forEach((coord, i) => newArr.splice(coord, 0, <div key={"blank-" + i} className="blank-square"></div>))
    return newArr
}

export class Collage extends Component {

    render() {
        let collage;
        // Implement cross shape
        if (this.props.shape === "cross") {
            if (this.props.selections.length === 5) {
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                        </div>
                    )
                });
                collage = addBlanks(collage, [0, 2, 6, 8])
            }
        // Implement square collage shape
        } else if (this.props.shape === "square") {
            if (this.props.selections.length === 4) {
                collage = this.props.selections.map(album => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                        </div>
                    )
                });
            }
        // Implement diamond collage shape
        } else if (this.props.shape === "diamond") {
            if (this.props.selections.length === 2) {
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                            <div className={"overlay " + (i ? "top-left" : "top-right")} ></div>
                        </div>
                    )
                });
                collage.reverse();
                collage = [...collage, this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                            <div className={"overlay " + (i ? "bottom-right" : "bottom-left")}></div>
                        </div>
                    )
                })];
            }
            else if (this.props.selections.length === 8) {
                collage = this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                            {([0, 1, 3].includes(i)) ? <div className={"overlay " + ((i === 3) ? "top-right" : "top-left")} /> : <div />}
                            {i ? <div /> : <div className="overlay top-right" />}
                        </div>
                    )
                });
                [[3, 7], [1, 9]].forEach(tuple => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-2"}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist}></img>
                        <div className={"overlay " + ((tuple[0] === 3) ? "bottom-left" : "bottom-right")} ></div>
                    </div>
                    )
                });               
                [[0, 4], [0, 8], [0, 12]].forEach((tuple, i) => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-" + i + 1}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist}></img>
                        <div className={"overlay " + ((tuple[1] === 4) ? "top-left" : (tuple[1] === 8) ? "top-right" : "bottom-left")} ></div>
                        <div className={"overlay " + ((tuple[1] === 4) ? "bottom-left" : (tuple[1] === 8) ? "bottom-right" : "bottom-right")} ></div>
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
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                            {(i < 4) ? <div className={"overlay " + ((i % 2) ? "top-right" : "top-left")} ></div> : <div />}
                        </div>
                    )
                });
                [[1, 4], [2, 7], [3, 9], [0, 10]].forEach(tuple => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-2"}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist}></img>
                        <div className={"overlay " + ((tuple[0] % 2) ? "bottom-left" : "bottom-right")} ></div>
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
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                            {(i === 0 || i === 2) ? <div className={"overlay " + (i ? "top-right" : "top-left")} ></div> : <div />}
                        </div>
                    )
                });
                [[2, 6], [0, 8]].forEach(tuple => {
                    collage.splice(tuple[1], 0, 
                    <div key={this.props.selections[tuple[0]].album + "-2"}>
                        <img src={this.props.selections[tuple[0]].cover} alt={this.props.selections[tuple[0]].album + ", " + this.props.selections[tuple[0]].artist}></img>
                        <div className={"overlay " + (tuple[0] ? "bottom-left" : "bottom-right")} ></div>
                    </div>
                    )
                });
            }
        } else {
            collage = <div></div>
        }
        return (
            <section className="collage">
                <div className="edit-dock">
                    <button onClick={this.props.editCollage} style={{display: (this.props.shape) ? "" : "none", backgroundColor: this.props.editing ? "var(--highlight)" : ""}}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={this.props.shuffleCollage} style={{display: (this.props.shape) ? "" : "none", opacity: (this.props.editing) ? "0.3" : ""}} disabled={this.props.editing ? true : false}>
                        <i className="fas fa-random"></i>
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
