import React, {Component} from "react";

export class AlbumSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newArtist: "",
            newAlbum: "",
            searchVis: "hidden"
        }
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
                searchVis: (isArtist) ? "visible" : "hidden"
            })
            if (isArtist) {
                setTimeout(() => {
                    this.albumInput.current.focus();
                }, 1)
            }    
        }
    }

    render() {
        return (
            <div className="album-options">
                <h2>Albums:</h2>
                <form onSubmit={this.handleSubmit.bind(this, true)}>
                    Artist
                    <input type="text" placeholder="Enter artist name..." value={this.state.newArtist} onChange={this.handleChange.bind(this, true)}></input>
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>                    
                </form>
                <form onSubmit={this.handleSubmit.bind(this, false)} style={{visibility: this.state.searchVis}}>
                    Album
                    <input type="text" placeholder="Enter album name..." ref={this.albumInput} value={this.state.newAlbum} onChange={this.handleChange.bind(this, false)}></input>
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
                <div className="album-selection">
                    <p>Selection</p>
                    <div className="selection-box"></div>
                </div>
            </div>
        )
    }
}

export default AlbumSelect;