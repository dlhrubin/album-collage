import React, {Component} from "react";
import AlbumSelect from "./AlbumSelect";
import ShapeSelect from "./ShapeSelect";

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: [],
            shape: ""
        }
    }

    handleAddAlbum = (artist, album, thumbnail, cover) => {
        this.setState({
            selections: [...this.state.selections, {artist, album, thumbnail, cover}]
        })
    }

    handleDeleteAlbum = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist || selection.album !== album))
        })
    }

    handleSelectShape = (shape) => {
        this.setState({
            shape
        })
    }

    render() {
        return (
            <section className="menu">
                <h1>Music Collage</h1>
                <AlbumSelect selections={this.state.selections} addAlbum={this.handleAddAlbum} deleteAlbum={this.handleDeleteAlbum}/>
                <ShapeSelect selections={this.state.selections} selectShape={this.handleSelectShape}/>
                <button className="search-submit submit-btn" onClick={this.props.submitCollage.bind(this, this.state.selections, this.state.shape)}>Collage-ify</button>
            </section>
        )
    }
}

export default Menu;