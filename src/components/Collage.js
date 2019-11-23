import React, { Component } from 'react'

export class Collage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            covers: [...this.props.selections]
        }
    }

    render() {
        let collage;
        // Implement diamond collage shape
        if (this.props.shape === "diamond") {
            if (this.props.selections.length === 2) {
                collage = this.props.selections.map((album, i) => {
                    return (<div key={album.album}>
                                <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                                <div className={"overlay " + ((i) ? "top-left" : "top-right")} ></div>
                            </div>)
                });
                collage.reverse();
                collage = [...collage, this.props.selections.map((album, i) => {
                    return (<div key={album.album}>
                                <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                                <div className={"overlay " + ((i) ? "bottom-right" : "bottom-left")}></div>
                            </div>)
                })];
            }
        } else if (this.props.shape === "square") {
            if (this.props.selections.length === 4) {
                collage = this.props.selections.map(album => {
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
                <button onClick={this.props.shuffle} style={{display: (this.props.shape) ? "" : "none"}}>
                    <i className="fas fa-random"></i>
                </button>
                <div className={"collage-grid " + this.props.shape + "-" + this.props.selections.length}>
                    {collage}
                </div>
            </section>
        )
    }
}

export default Collage
