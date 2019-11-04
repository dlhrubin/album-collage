import React, {Component} from "react";

export class AlbumSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newArtist: "",
            newAlbum: "",
            searchVis: "hidden",
            selections: [],
        }
        this.artistInput = React.createRef();
        this.albumInput = React.createRef();        
    }

    handleChange = (isArtist, e) => {
        this.setState({
            newArtist: (isArtist) ? e.target.value : this.state.newArtist,
            newAlbum: (isArtist) ? "" : e.target.value,
            searchVis: (isArtist) ? "hidden" : "visible"
        })
    }

    handleSubmit = (isArtist, e) => {
        e.preventDefault();
        let hasContent = (isArtist) ? this.state.newArtist : this.state.newAlbum;
        if (hasContent) {
            this.setState({
                newArtist: (isArtist) ? this.state.newArtist : "",
                newAlbum: (isArtist) ? this.state.newAlbum : "",
                searchVis: (isArtist) ? "visible" : "hidden",
                selections: (isArtist) ? this.state.selections : [...this.state.selections, {"artist": this.state.newArtist, "album": this.state.newAlbum}]
            })
            if (isArtist) {
                //Jump focus to the album search form after state changes to make it visible
                setTimeout(() => {
                    this.albumInput.current.focus();
                }, 1)
            } else {
                this.artistInput.current.focus();
            }
        }
    }

    unSelect = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist && selection.album !== album))
        })
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
        return (
            <div className="album-options">
                <h2>Albums:</h2>
                <form onSubmit={this.handleSubmit.bind(this, true)}>
                    <div>
                        <span>Artist</span>
                        <input type="text" placeholder="Enter artist name..." disabled={(this.state.selections.length === 10) ? "disabled" : ""} ref={this.artistInput} value={this.state.newArtist} onChange={this.handleChange.bind(this, true)}></input>
                        <button type="submit" disabled={(this.state.selections.length === 10) ? "disabled" : ""}>
                            <i className="fas fa-search"></i>
                        </button>     
                    </div>
                    {/*NTS: may want to use a conditional render here instead, esp. after adding other error messages}*/}
                    <p className="warning">{(this.state.selections.length === 10) ? "10 albums already selected" : ""}</p>               
                </form>
                <form onSubmit={this.handleSubmit.bind(this, false)} style={{visibility: this.state.searchVis}}>
                    <div>
                        <span>Album</span>
                        <input type="text" placeholder="Enter album name..." ref={this.albumInput} value={this.state.newAlbum} onChange={this.handleChange.bind(this, false)}></input>
                        <button type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
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