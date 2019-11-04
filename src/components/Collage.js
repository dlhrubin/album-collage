import React, { Component } from 'react'

export class Collage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "Hozier",
            title: "Wasteland, Baby!",
            coverURL: "https://lastfm.freetls.fastly.net/i/u/174s/83fce5201587652d2487123aeeb027b6.png"
        }
    }

    render() {
        return (
            <div className="collage">
                <img src={this.state.coverURL} alt={this.state.title + ", " + this.state.artist}/>
            </div>
        )
    }
}

export default Collage
