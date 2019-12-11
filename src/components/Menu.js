import React, {Component} from "react";
import AlbumSelect from "./AlbumSelect";
import ShapeSelect from "./ShapeSelect";

let possibleNums = [2, 4, 5, 6, 7, 8, 9, 10, 13, 14, 16, 17, 18, 20, 22, 24, 25, 26, 28, 30];

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selections: [],
            shape: "",
            errors: {selection: "", shape: ""},
            albumRange: {min: 2, max: 30},
            rearranged: [],
            dragging: null
        }
        this.albumSelectComponent = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.editing !== prevProps.editing) {
            // If in editing mode, add the submitted selections and shape back into the menu
            if (this.props.editing) {
                this.setState({
                    selections: this.props.selections,
                    shape: this.props.shape
                })
            } else {
                this.setState({
                    selections: [],
                    shape: ""
                })
                this.handleClearError();
            }
            this.albumSelectComponent.current.handleReset();
        }
    }

    // Add user-added album to selections
    handleAddAlbum = (artist, album, thumbnail, cover) => {
        this.setState({
            selections: [...this.state.selections, {artist, album, thumbnail, cover}],
            shape: ""
        })
    }

    // Remove user-deleted album from selections
    handleDeleteAlbum = (artist, album) => {
        this.setState({
            selections: this.state.selections.filter(selection => (selection.artist !== artist || selection.album !== album)),
            shape: ""
        })
    }

    // Drag album selection
    handleDragStart = (e) => {
        e.dataTransfer.setData("text", e.target)
        let dragInd = this.state.selections.findIndex(selection => selection.artist === e.target.getAttribute("artist") && selection.album === e.target.getAttribute("album") && selection.thumbnail === e.target.getAttribute("thumbnail"));
        this.setState({
            dragging: dragInd
        })
    }

    // Drop album selection being dragged
    handleDrop = (e) => {
        this.setState({
            selections: this.state.rearranged,
            rearranged: [],
            dragging: null
        })
    }

    // Rearrange selections as albums are dragged over
    handleDragOver = (e) => {
        e.preventDefault();
        let draggedOver = {
            artist: e.target.parentNode.getAttribute("artist"),
            album: e.target.parentNode.getAttribute("album"),
            thumbnail: e.target.parentNode.getAttribute("thumbnail"),
        }
        let draggedOverInd = this.state.selections.findIndex(selection => selection.artist === draggedOver.artist && selection.album === draggedOver.album && selection.thumbnail === draggedOver.thumbnail);
        let newSelections = [...this.state.selections]
        let dragged = newSelections.splice(this.state.dragging, 1)[0]
        newSelections.splice(draggedOverInd, 0, dragged);
        this.setState({
            rearranged: newSelections
        })
    }

    // Store shape user clicks 
    handleSelectShape = (name, active) => {
        this.setState({
            shape: active ? name : "" 
        })
    }

    // Submit collage selections and shape
    handleSubmit = () => {
        // Throw error if minimum number of albums have not been selected
        if (this.state.selections.length < this.state.albumRange.min) {
            this.setState({
                errors: {selection: "Please select at least " + this.state.albumRange.min + " albums", shape: ""}
            })
        // Throw error if no collage shape available for selected number of albums 
        } else if (!possibleNums.includes(this.state.selections.length)) {
            this.setState({
                errors: {selection: "", shape: "No collage shape for this number of albums"}
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
            this.albumSelectComponent.current.handleReset();
        }
    }

    // Clear error messages
    handleClearError = () => {
        this.setState({
            errors: {selection: "", shape: ""}
        })
    }

    render() {
        // On small screens, hide selection menu if collage is not being created or edited
        let menuDisplay = (this.props.panelToDisplay === "collage") ? "none" : "";
        let menuWidth = (this.props.panelToDisplay === "menu") ? "100%" : "";
        return (
            <section className="menu" style={{display: menuDisplay, width: menuWidth}}>
                <h1>Music Collage</h1>
                <AlbumSelect ref={this.albumSelectComponent} selections={this.state.selections} errors={this.state.errors} albumRange={this.state.albumRange} inputWidth={menuWidth} addAlbum={this.handleAddAlbum} deleteAlbum={this.handleDeleteAlbum} clearError={this.handleClearError} dragStart={this.handleDragStart} dragEnd={this.handleDragEnd} dragOver={this.handleDragOver} drop={this.handleDrop}/>
                <ShapeSelect selectedShape={this.state.shape} numAlbums={this.state.selections.length} shape={this.state.shape} errors={this.state.errors} selectShape={this.handleSelectShape} clearError={this.handleClearError}/>
                <div className="collage-submit">
                    <button id="submit-selections" className="search-submit" onClick={this.handleSubmit}>{this.props.editing ? "Save Edits" : "Collage-ify"}</button>
                    <p className="warning">{(this.state.errors.selection) ? this.state.errors.selection : (this.state.errors.shape) ? this.state.errors.shape : ""}</p>
                </div>
            </section>
        )
    }
}

export default Menu;