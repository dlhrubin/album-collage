import React, { Component } from 'react'
import axios from "axios";
import config from "../config"

export class Collage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "",
            title: "",
            coverURL: ""
        }
    }
    componentDidMount() {
        axios.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + config.API_KEY + "&artist=Hozier&album=Wasteland,+Baby!&format=json")
            .then(res => {
                this.setState({
                    artist: res.data.album.artist,
                    title: res.data.album.name,
                    coverURL: res.data.album.image.filter((entry) => entry.size === "large")[0]["#text"]
                })
            })
    }

    render() {
        return (
            <img src={this.state.coverURL} alt={this.state.title + ", " + this.state.artist}/>
        )
    }
}

export default Collage
