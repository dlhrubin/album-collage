import React, {Component} from "react";

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
        let hasContent = (isArtist) ? this.state.newArtist : this.state.newAlbum;
        if (hasContent) {
            let notRepeat = (isArtist) ? true : (this.state.selections.filter(selection => (selection.artist === this.state.newArtist && selection.album === this.state.newAlbum)).length === 0)
            if (notRepeat) {
                this.setState({
                    newArtist: (isArtist) ? this.state.newArtist : "",
                    newAlbum: (isArtist) ? this.state.newAlbum : "",
                    searchVis: (isArtist) ? "visible" : "hidden",
                    selections: (isArtist) ? this.state.selections : [...this.state.selections, {artist: this.state.newArtist, album: this.state.newAlbum}]
                })
                if (isArtist) {
                    //Jump focus to the album search form after state changes to make it visible
                    setTimeout(() => {
                        this.albumInput.current.focus();
                    }, 1)
                } else {
                    this.artistInput.current.focus();
                }                
            } else {
                this.setState ({
                    warnings: {artist: "", album: "Album already selected"}
                })
            }
        }
    }

    unSelect = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist || selection.album !== album)),
            warnings: {artist: "", album: ""}
        })
        clearTimeout(this.flashWarning)
    }

    render() {
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
                    {/*NTS: may want to use a conditional render here instead, esp. after adding other error messages}*/}
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