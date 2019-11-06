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
            addVis: "hidden",
            selections: [],
            warnings: {artist: "", album: ""}
        }
        this.artistInput = React.createRef();
        this.albumInput = React.createRef();   
        this.addAlbum = React.createRef();     
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
            addVis: "hidden",
            warnings: {artist: "", album: ""},
            img: {thumbnail: "", cover: ""}
        })
    }

    handleSearch = (isArtist, e) => {
        e.preventDefault();
        // Check that user has entered text into the field
        let hasContent = (isArtist) ? this.state.newArtist : this.state.newAlbum;
        if (hasContent) {
            if (isArtist) {
                axios.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=" + config.API_KEY + "&artist=" + this.state.newArtist + "&format=json")
                .then(res => {
                    let artistsFound = res.data.results.artistmatches.artist;
                    if (artistsFound.length) {
                        this.setState({
                            newArtist: artistsFound[0].name,
                            searchVis: "visible" // Toggle album search field visibility
                        })
                        // Jump focus to the album search field after state changes to make it visible
                        setTimeout(() => {
                            this.albumInput.current.focus();
                        }, 1)
                    } else {
                        this.setState({
                            warnings: {artist: "Artist not found", album: ""}
                        })
                    }
                })
            } else {
                axios.get("http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=" + config.API_KEY + "&album=" + this.state.newAlbum + "&format=json")
                .then(res => {
                    // Limit to albums with artist fields that match the user-entered artist
                    let albumsFound = res.data.results.albummatches.album.filter(album => album.artist === this.state.newArtist);
                    // Check that an album was returned and has an image
                    if (albumsFound.length && albumsFound[0].image[0]["#text"]) {
                        // Check that the album entered has not already been selected
                        let notRepeat = (this.state.selections.filter(selection => (selection.artist === this.state.newArtist && selection.album === albumsFound[0].name)).length === 0)
                        if (notRepeat) {
                            this.setState({
                                newAlbum: albumsFound[0].name,
                                addVis: "visible",
                                img: {thumbnail: albumsFound[0].image.filter(entry => entry.size === "small")[0]["#text"], 
                                    cover: albumsFound[0].image.filter(entry => entry.size === "large")[0]["#text"]}
                            })
                            setTimeout(() => {
                                this.addAlbum.current.focus();
                            }, 1)
                        } else {
                            this.setState ({
                                newAlbum: albumsFound[0].name,
                                warnings: {artist: "", album: "Album already selected"}
                            })
                        }
                    } else {
                        this.setState({
                            warnings: {artist: "", album: "Album not found"}
                        })
                    }
                })
            }
        }
    }

    handleSubmit = () => {
        this.setState({
            newArtist: "",
            newAlbum: "",
            searchVis: "hidden", // Toggle album search field visibility
            addVis: "hidden",
            selections: [...this.state.selections, {artist: this.state.newArtist, album: this.state.newAlbum, thumbnail: this.state.img.thumbnail, cover: this.state.img.cover}]
        })
        // Jump focus to the artist search field after submitting new album
        this.artistInput.current.focus();    
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
                    <img src={selection.thumbnail} alt={selection.album + ", " + selection.artist}/>
                    <span>{selection.artist}</span>
                    <button onClick={this.unSelect.bind(this, selection.artist, selection.album)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )
        })
        // Add red border to search boxes when a warning is present
        let warningBorder = (field) => this.state.warnings[field] ? {borderColor: "red"} : {borderColor: ""};
        let selectionCentering = (this.state.selections.length > 5) ? {alignItems: "center"} : {alignItems: ""};
        return (
            <div className="album-options">
                <h2>Albums:</h2>
                <form onSubmit={this.handleSearch.bind(this, true)}>
                    <div onClick={this.handleClick}>
                        <span>Artist</span>
                        <input type="text" spellCheck="false" style={warningBorder("artist")} placeholder="Enter artist name..." disabled={(this.state.selections.length === 10) ? "disabled" : ""} ref={this.artistInput} value={this.state.newArtist} onChange={this.handleChange.bind(this, true)}></input>
                        <button className="search-submit" style={warningBorder("artist")} disabled={(this.state.selections.length === 10) ? "disabled" : ""}>
                            <i className="fas fa-search"></i>
                        </button>     
                    </div>
                    <p className="warning">{this.state.warnings.artist}</p>               
                </form>
                <form onSubmit={this.handleSearch.bind(this, false)} style={{visibility: this.state.searchVis}}>
                    <div>
                        <span>Album</span>
                        <input type="text" spellCheck="false" style={warningBorder("album")} placeholder="Enter album name..." ref={this.albumInput} value={this.state.newAlbum} onChange={this.handleChange.bind(this, false)}></input>
                        <button className="search-submit" style={warningBorder("album")}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <p className="warning">{this.state.warnings.album}</p>
                </form>
                <button className="search-submit" onClick={this.handleSubmit} ref={this.addAlbum} style={{visibility: this.state.addVis}}>
                    <i className="fas fa-plus"></i> Add album
                </button>
                <div className="album-selection">
                    <p>Selection (max of 10 albums)</p>
                    <div className="selection-box" style={selectionCentering}>
                        {selectedAlbums}
                    </div>
                </div>
            </div>
        )
    }
}

export default AlbumSelect;