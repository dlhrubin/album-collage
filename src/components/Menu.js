import React, {Component} from "react";
import AlbumSelect from "./AlbumSelect";
import ShapeSelect from "./ShapeSelect";

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: [],
            shape: "",
            errors: {selection: "", shape: ""},
            albumRange: {min: 3, max: 10}
        }
    }

    // Add user-added album to selections
    handleAddAlbum = (artist, album, thumbnail, cover) => {
        this.setState({
            selections: [...this.state.selections, {artist, album, thumbnail, cover}],
        })
    }

    // Remove user-deleted album from selections
    handleDeleteAlbum = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist || selection.album !== album)),
        })
    }

    // Store shape user clicks 
    handleSelectShape = (name, active) => {
        this.setState({
            shape: active ? name : "" 
        })
    }

    handleSubmit = () => {
        // Throw error if minimum number of albums have not been selected
        if (this.state.selections.length < this.state.albumRange.min) {
            this.setState({
                errors: {selection: "Please select at least 3 albums", shape: ""}
            })
        // Throw error if no shape has been selected
        } else if (!this.state.shape) {
            this.setState({
                errors: {selection: "", shape: "Please select a collage shape"}
            })
        // Submit album selections and shape to the App component, then reset
        } else {
            this.props.submitCollage(this.state.selections, this.state.shape)
            this.setState({
                selections: [],
                shape: "",
                errors: {selection: "", shape: ""}
            })
        }
    }

    // Clear error messages
    handleClearError = () => {
        this.setState({
            errors: {selection: "", shape: ""}
        })
    }

    render() {
        return (
            <section className="menu">
                <h1>Music Collage</h1>
                <AlbumSelect selections={this.state.selections} errors={this.state.errors} addAlbum={this.handleAddAlbum} deleteAlbum={this.handleDeleteAlbum} clearError={this.handleClearError}/>
                <ShapeSelect shape={this.state.shape} errors={this.state.errors} selectShape={this.handleSelectShape} clearError={this.handleClearError}/>
                <div className="collage-submit">
                    <button className="search-submit" onClick={this.handleSubmit}>Collage-ify</button>
                    <p className="warning">{(this.state.errors.selection) ? this.state.errors.selection : (this.state.errors.shape) ? this.state.errors.shape : ""}</p>
                </div>
            </section>
        )
    }
}

export default Menu;