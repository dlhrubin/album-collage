import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumSelect from './menu/AlbumSelect';
import SelectionBox from './menu/SelectionBox';
import ShapeSelect from './menu/ShapeSelect';
import { possibleNums } from '../data';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selections: [],
      shape: '',
      errors: { selection: '', shape: '' },
      albumRange: { min: 2, max: 30 },
      rearranged: [],
      dragging: null,
    };
    this.albumSelectComponent = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { shape, selections, editing } = this.props;
    if (editing !== prevProps.editing) {
      // If in editing mode, add the submitted selections and shape back into the menu
      if (editing) {
        this.setState({
          selections,
          shape,
        });
      } else {
        this.setState({
          selections: [],
          shape: '',
        });
        this.handleClearError();
      }
      this.albumSelectComponent.current.clearAlbumSelect();
    }
  }

    // Add user-added album to selections
    handleAddAlbum = (artist, album, thumbnail, cover) => {
      const { selections } = this.state;
      this.setState({
        selections: [...selections, {
          artist, album, thumbnail, cover,
        }],
        shape: '',
        errors: { selection: '', shape: '' },
      });
    }

    // Remove user-deleted album from selections
    handleDeleteAlbum = (artist, album) => {
      const { selections } = this.state;
      this.setState({
        selections: selections.filter((selection) => (
          selection.artist !== artist || selection.album !== album
        )),
        shape: '',
        errors: { selection: '', shape: '' },
      });
    }

    // Drag album selection
    handleDragStart = (e) => {
      const { selections } = this.state;
      e.dataTransfer.setData('text', e.target);
      const dragInd = selections.findIndex((selection) => selection.artist === e.target.getAttribute('artist') && selection.album === e.target.getAttribute('album') && selection.thumbnail === e.target.getAttribute('thumbnail'));
      this.setState({
        dragging: dragInd,
      });
    }

    // Drop album selection being dragged
    handleDrop = () => {
      const { rearranged } = this.state;
      this.setState({
        selections: rearranged,
        rearranged: [],
        dragging: null,
      });
    }

    // Rearrange selections as albums are dragged over
    handleDragOver = (e) => {
      const { selections, dragging } = this.state;
      e.preventDefault();
      const draggedOver = {
        artist: e.target.parentNode.getAttribute('artist'),
        album: e.target.parentNode.getAttribute('album'),
        thumbnail: e.target.parentNode.getAttribute('thumbnail'),
      };
      const draggedOverInd = selections.findIndex((selection) => (
        selection.artist === draggedOver.artist
        && selection.album === draggedOver.album
        && selection.thumbnail === draggedOver.thumbnail));
      const newSelections = [...selections];
      const dragged = newSelections.splice(dragging, 1)[0];
      newSelections.splice(draggedOverInd, 0, dragged);
      this.setState({
        rearranged: newSelections,
      });
    }

    // Store shape user clicks
    handleSelectShape = (name) => {
      this.setState({
        shape: name || '',
      });
    }

    // Submit collage selections and shape
    handleSubmit = () => {
      const { submitCollage } = this.props;
      const { selections, shape, albumRange } = this.state;
      // Throw error if minimum number of albums have not been selected
      if (selections.length < albumRange.min) {
        this.setState({
          errors: { selection: `Please select at least ${albumRange.min} albums`, shape: '' },
        });
        // Throw error if no collage shape available for selected number of albums
      } else if (!possibleNums.includes(selections.length)) {
        this.setState({
          errors: { selection: '', shape: 'No collage shape for this number of albums' },
        });
        // Throw error if no shape has been selected
      } else if (!shape) {
        this.setState({
          errors: { selection: '', shape: 'Please select a collage shape' },
        });
        // Submit album selections and shape to the App component, then reset
      } else {
        submitCollage(selections, shape);
        this.setState({
          selections: [],
          shape: '',
          errors: { selection: '', shape: '' },
        });
        this.albumSelectComponent.current.clearAlbumSelect();
      }
    }

    // Clear error messages
    handleClearError = () => {
      this.setState({
        errors: { selection: '', shape: '' },
      });
    }

    render() {
      const { panelToDisplay, editing } = this.props;
      const {
        selections, shape, errors, albumRange,
      } = this.state;
      // On small screens, hide selection menu if collage is not being created or edited
      const menuDisplay = (panelToDisplay === 'collage') ? 'none' : '';
      const menuWidth = (panelToDisplay === 'menu') ? '100%' : '';
      return (
        <section className="menu" style={{ display: menuDisplay, width: menuWidth }}>
          <div className="menu-content">
            <h1>Album Collage</h1>
            <AlbumSelect
              ref={this.albumSelectComponent}
              selections={selections}
              albumRange={albumRange}
              inputWidth={menuWidth}
              addAlbum={this.handleAddAlbum}
              clearError={this.handleClearError}
            />
            <SelectionBox
              selections={selections}
              error={errors.selection}
              albumRange={albumRange}
              deleteAlbum={this.handleDeleteAlbum}
              dragStart={this.handleDragStart}
              dragEnd={this.handleDragEnd}
              dragOver={this.handleDragOver}
              drop={this.handleDrop}
            />
            <ShapeSelect
              selected={shape}
              numAlbums={selections.length}
              error={errors.shape}
              selectShape={this.handleSelectShape}
              clearError={this.handleClearError}
            />
            <div className="collage-submit">
              <button className="search-submit" type="button" onClick={this.handleSubmit}>
                {editing ? 'Save Edits' : 'Collage-ify'}
              </button>
              <p className="warning">{errors.selection || errors.shape}</p>
            </div>
          </div>
        </section>
      );
    }
}

Menu.defaultProps = {
  selections: [],
  shape: '',
  editing: false,
  panelToDisplay: '',
  submitCollage: () => {},
};

Menu.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  shape: PropTypes.string,
  editing: PropTypes.bool,
  panelToDisplay: PropTypes.string,
  submitCollage: PropTypes.func,
};

export default Menu;
