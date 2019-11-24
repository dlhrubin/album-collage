import React, { Component } from 'react'

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
                [0, 2, 6, 8].forEach(i => collage.splice(i, 0, <div className="blank-square"></div>))
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
                            <div className={"overlay " + ((i) ? "top-left" : "top-right")} ></div>
                        </div>
                    )
                });
                collage.reverse();
                collage = [...collage, this.props.selections.map((album, i) => {
                    return (
                        <div key={album.album}>
                            <img src={album.cover} alt={album.album + ", " + album.artist}></img>
                            <div className={"overlay " + ((i) ? "bottom-right" : "bottom-left")}></div>
                        </div>
                    )
                })];
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
