import React, { Component } from 'react'

// Shuffle album order
let shuffle = (arr) => {
    let unshuffled = [...arr];
    let shuffled = [];
    for (let i=0; i < arr.length; i++) {
        shuffled = [...shuffled, unshuffled.splice(Math.floor(Math.random() * unshuffled.length), 1)[0]];
    }
    return shuffled
}

export class Collage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let collage;
        let covers = shuffle(this.props.selections);
        // Implement diamond collage shape
        if (this.props.shape === "diamond") {
            if (covers.length === 2) {
                collage = covers.map((album, i) => {
                    return (<div key={album.album}>
                                <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                                <div className={"overlay " + ((i) ? "top-left" : "top-right")} ></div>
                            </div>)
                });
                collage.reverse();
                collage = [...collage, covers.map((album, i) => {
                    return (<div key={album.album}>
                                <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                                <div className={"overlay " + ((i) ? "bottom-right" : "bottom-left")}></div>
                            </div>)
                })];
            }
        } else if (this.props.shape === "square") {
            if (covers.length === 4) {
                collage = covers.map(album => {
                    return (<div key={album.album}>
                                <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                            </div>)
                });
            }
        } else {
            collage = <div></div>
        }
        return (
            <section className="collage">
                <div className={"collage-grid " + this.props.shape + "-" + covers.length}>
                    {collage}
                </div>
            </section>
        )
    }
}

export default Collage
