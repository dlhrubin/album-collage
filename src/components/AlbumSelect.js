import React, {Component} from "react";
import axios from "axios";

export class AlbumSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newArtist: "",
            newAlbum: "",
            searchVis: "hidden",
            addVis: "hidden",
            warnings: {artist: "", album: ""},
            key: ""
        }
        this.artistInput = React.createRef();
        this.albumInput = React.createRef();   
        this.addAlbum = React.createRef();     
    }

    // Fetch API key when component mounts
    componentDidMount() {
        axios.get("https://iv0kqf6z1c.execute-api.us-east-2.amazonaws.com/prod").then(res => {
            this.setState({
                key: res.data
            })
        })
    }

    // Reset search bars when submit button or edit button is clicked in App
    handleReset = () => {
        this.setState({
            newArtist: "",
            newAlbum: "",
            searchVis: "hidden", // Toggle album search field visibility
            addVis: "hidden", // Toggle add album button field visibility
        })
        this.props.clearError();  
    }

    // Display warning that the max number of albums have been selected
    handleClick = () => {
        if (this.props.selections.length === this.props.albumRange.max) {
            this.setState({
                warnings: {artist: this.props.albumRange.max + " albums already selected", album: ""}
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
        this.props.clearError();
    }

    handleSearch = (isArtist, e) => {
        e.preventDefault();
        // Check that user has entered text into the field
        let hasContent = (isArtist) ? this.state.newArtist : this.state.newAlbum;
        if (hasContent) {
            if (isArtist) {
                axios.get("https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=" + this.state.key + "&artist=" + this.state.newArtist + "&format=json")
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
                axios.get("https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=" + this.state.key + "&album=" + this.state.newAlbum + "&format=json")
                .then(res => {
                    // Limit to albums with artist fields that match the user-entered artist
                    let albumsFound = res.data.results.albummatches.album.filter(album => album.artist === this.state.newArtist);
                    // Check that an album was returned and has an image
                    if (albumsFound.length && albumsFound[0].image[0]["#text"]) {
                        // Check that the album entered has not already been selected
                        let notRepeat = (this.props.selections.filter(selection => (selection.artist === this.state.newArtist && selection.album === albumsFound[0].name)).length === 0)
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
        })
        this.props.addAlbum(this.state.newArtist, this.state.newAlbum, this.state.img.thumbnail, this.state.img.cover);
        // Jump focus to the artist search field after submitting new album
        this.artistInput.current.focus();  
        this.props.clearError();  
    }

    // Remove album from selection
    handleDeselect = (artist, album) => {
        this.setState({
            warnings: {artist: "", album: ""}
        })
        this.props.deleteAlbum(artist, album);
        clearTimeout(this.flashWarning);
        this.props.clearError();
    }

    render() {
        // Populate selection box with selected albums (artist name and album thumbnail)
        let selectedAlbums = this.props.selections.map((selection, i) => {
            return (
                <div key={i} artist={selection.artist} album={selection.album} thumbnail={selection.thumbnail} draggable="true" onDragStart={this.props.dragStart} onDragEnd={this.props.dragEnd} onDragOver={this.props.dragOver} onDrop={this.props.drop}>
                    <img src={selection.thumbnail} alt={selection.album + ", " + selection.artist} draggable="false"/>
                    <span>{selection.artist}</span>
                    <button aria-label="Delete Selection" onClick={this.handleDeselect.bind(this, selection.artist, selection.album)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )
        })
        // Style input field border (depending on warnings) and width (depending on screen size)
        let inputStyle = (field) => {
            return({borderColor: this.state.warnings[field] ? "red" : "", width: this.props.inputWidth})
        };
        // Add red border to search boxes when a warning is present
        let warningBorder = (field) => this.state.warnings[field] ? {borderColor: "red"} : {borderColor: ""};
        let selectionStyle = {};
        selectionStyle["borderColor"] = this.props.errors.selection ? "red" : ""; 
        return (
            <div className="album-options">
                <h2>Albums:</h2>
                <form onSubmit={this.handleSearch.bind(this, true)}>
                    <div onClick={this.handleClick}>
                        <label htmlFor="artist-search">Artist</label>
                        <input id="artist-search" type="text" spellCheck="false" style={inputStyle("artist")} placeholder="Enter artist name..." disabled={(this.props.selections.length === this.props.albumRange.max) ? "disabled" : ""} ref={this.artistInput} value={this.state.newArtist} onChange={this.handleChange.bind(this, true)}></input>
                        <button className="search-submit" aria-label="Artist Search" style={warningBorder("artist")} disabled={(this.props.selections.length === this.props.albumRange.max) ? "disabled" : ""}>
                            <i className="fas fa-search"></i>
                        </button>     
                    </div>
                    <p className="warning">{this.state.warnings.artist}</p>               
                </form>
                <form onSubmit={this.handleSearch.bind(this, false)} style={{visibility: this.state.searchVis}}>
                    <div>
                        <label htmlFor="album-search">Album</label>
                        <input id="album-search" type="text" spellCheck="false" style={inputStyle("album")} placeholder="Enter album name..." ref={this.albumInput} value={this.state.newAlbum} onChange={this.handleChange.bind(this, false)}></input>
                        <button className="search-submit" aria-label="Album Search" style={warningBorder("album")}>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <p className="warning">{this.state.warnings.album}</p>
                </form>
                <button className="search-submit" aria-label="Add Album" onClick={this.handleSubmit} ref={this.addAlbum} style={{visibility: this.state.addVis}}>
                    <i className="fas fa-plus"></i> Add album
                </button>
                <div className="album-selection">
                    <p>Selection ({this.props.albumRange.min}-{this.props.albumRange.max} albums)</p>
                    <div className="selection-box" style={selectionStyle}>
                        {selectedAlbums}
                    </div>
                </div>
            </div>
        )
    }
}

export default AlbumSelect;