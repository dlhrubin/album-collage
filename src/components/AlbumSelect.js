import React, {Component} from "react";
import axios from "axios";
import config from "../config"

export class AlbumSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newArtist: "",
            newAlbum: "",
            searchVis: "hidden",
            selections: [],
            warnings: {artist: "", album: ""}
        }
        this.artistInput = React.createRef();
        this.albumInput = React.createRef();        
    }

    // Display warning that the max number of albums have been selected
    handleClick = () => {
        if (this.state.selections.length === 10) {
            this.setState({
                warnings: {artist: "10 albums already selected", album: ""}
            })
            this.flashWarning = setTimeout(() => {
                this.setState({
                    warnings: {artist: "", album: ""}
                })                
            }, 5000)
        }
    }

    // Update local state values for new artist and album entries as user types
    handleChange = (isArtist, e) => {
        this.setState({
            newArtist: (isArtist) ? e.target.value : this.state.newArtist,
            newAlbum: (isArtist) ? "" : e.target.value,
            searchVis: (isArtist) ? "hidden" : "visible",
            warnings: {artist: "", album: ""}
        })
    }

    handleSubmit = (isArtist, e) => {
        e.preventDefault();
        // Check that user has entered text into the field
        let hasContent = (isArtist) ? this.state.newArtist : this.state.newAlbum;
        if (hasContent) {
            if (isArtist) {
                this.setState({
                    searchVis: "visible" // Toggle album search field visibility
                })
                // Jump focus to the album search field after state changes to make it visible
                setTimeout(() => {
                    this.albumInput.current.focus();
                }, 1)
            } else {
                axios.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + config.API_KEY + "&artist=" + this.state.newArtist + "&album=" + this.state.newAlbum + "&format=json")
                .then(res => {
                    if (res.data.hasOwnProperty("album")) {
                        // Check that the album entered has not already been selected
                        let notRepeat = (this.state.selections.filter(selection => (selection.artist === res.data.album.artist && selection.album === res.data.album.name)).length === 0)
                        if (notRepeat) {
                            this.setState({
                                newArtist: "",
                                newAlbum: "",
                                searchVis: "hidden", // Toggle album search field visibility
                                selections: [...this.state.selections, {artist: res.data.album.artist, album: res.data.album.name}]
                            //coverURL: res.data.album.image.filter((entry) => entry.size === "large")[0]["#text"]
                            })
                            // Jump focus to the artist search field after submitting new album
                            this.artistInput.current.focus();
                        } else {
                            this.setState ({
                                warnings: {artist: "", album: "Album already selected"}
                            })
                        }
                    } else {
                        this.setState({
                            // Note: replacing warning under artist field with a space to trigger changing the border color to red around both fields
                            warnings: {artist: " ", album: "Artist or album not found"}
                        })
                    }
                })
            }
        }
    }

    // Remove album from selection
    unSelect = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist || selection.album !== album)),
            warnings: {artist: "", album: ""}
        })
        clearTimeout(this.flashWarning)
    }

    render() {
        // Populate selection box with selected albums (artist name and album thumbnail)
        let selectedAlbums = this.state.selections.map((selection, i) => {
            return (
                <div key={i}>
                    <span>{selection.album + ", " + selection.artist}</span>
                    <button onClick={this.unSelect.bind(this, selection.artist, selection.album)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )
        })
        // Add red border to search boxes when a warning is present
        let warningBorder = (field) => this.state.warnings[field] ? {borderColor: "red"} : {borderColor: ""};
        return (
            <div className="album-options">
                <h2>Albums:</h2>
                <form onSubmit={this.handleSubmit.bind(this, true)}>
                    <div onClick={this.handleClick}>
                        <span>Artist</span>
                        <input type="text" style={warningBorder("artist")} placeholder="Enter artist name..." disabled={(this.state.selections.length === 10) ? "disabled" : ""} ref={this.artistInput} value={this.state.newArtist} onChange={this.handleChange.bind(this, true)}></input>
                        <button type="submit" style={warningBorder("artist")} disabled={(this.state.selections.length === 10) ? "disabled" : ""}>
                            <i className="fas fa-search"></i>
                        </button>     
                    </div>
                    <p className="warning">{this.state.warnings.artist}</p>               
                </form>
                <form onSubmit={this.handleSubmit.bind(this, false)} style={{visibility: this.state.searchVis}}>
                    <div>
                        <span>Album</span>
                        <input type="text" style={warningBorder("album")} placeholder="Enter album name..." ref={this.albumInput} value={this.state.newAlbum} onChange={this.handleChange.bind(this, false)}></input>
                        <button type="submit" style={warningBorder("album")}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <p className="warning">{this.state.warnings.album}</p>
                </form>
                <div className="album-selection">
                    <p>Selection (max of 10 albums)</p>
                    <div className="selection-box">
                        {selectedAlbums}
                    </div>
                </div>
            </div>
        )
    }
}

export default AlbumSelect;