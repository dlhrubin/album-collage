import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumSelect from './Menu/AlbumSelect';
import SelectionBox from './Menu/SelectionBox';
import ShapeSelect from './Menu/ShapeSelect';
import { shapeMin, shapeMax, possibleNums } from '../data';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selections: [],
      shape: '',
      errors: { selection: '', shape: '' },
      albumRange: { min: shapeMin, max: shapeMax },
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
      const id = `${album} (${artist})`;
      this.setState({
        selections: [...selections, {
          id, artist, album, thumbnail, cover,
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

    // Drop album selection being dragged
    handleDrop = (targetId, droppedId) => {
      const { selections } = this.state;
      const rearranged = [...selections];
      const targetInd = selections.findIndex((selection) => selection.id === targetId);
      const droppedInd = selections.findIndex((selection) => selection.id === droppedId);
      const dropped = rearranged.splice(droppedInd, 1)[0];
      rearranged.splice(targetInd, 0, dropped);
      this.setState({
        selections: rearranged,
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
          errors: { selection: '', shape: 'No shape for this number of albums' },
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
      const {
        menuOffset, panelToDisplay, editing, submitted,
      } = this.props;
      const {
        selections, shape, errors, albumRange,
      } = this.state;
      // Enable menu if in editing mode
      const focused = !submitted || editing;
      // On small screens, hide selection menu if collage is not being created or edited
      const menuDisplay = (panelToDisplay === 'collage') ? 'none' : '';
      const menuWidth = (panelToDisplay === 'menu') ? '100%' : '';
      // Slide menu offscreen if collage is in focus
      const menuTransform = focused || panelToDisplay ? '' : `translate(-${menuOffset}px)`;

      return (
        <section
          id="menu-panel"
          className="menu"
          aria-hidden={focused || panelToDisplay ? 'false' : 'true'}
          style={{
            display: menuDisplay, width: menuWidth, transform: menuTransform, boxShadow: focused ? '' : 'none',
          }}
        >
          <div className="menu-content">
            <h1>Album Collage</h1>
            <AlbumSelect
              ref={this.albumSelectComponent}
              selections={selections}
              focused={focused}
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
              <button id="collage-submit" className="search-submit" type="button" disabled={!focused} onClick={this.handleSubmit}>
                {editing ? 'Save Edits' : 'Collage-ify'}
              </button>
              <p id="collage-warning" className="warning">{errors.selection || errors.shape}</p>
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
  submitted: false,
  menuOffset: 0,
  panelToDisplay: '',
  submitCollage: () => {},
};

Menu.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  shape: PropTypes.string,
  editing: PropTypes.bool,
  submitted: PropTypes.bool,
  menuOffset: PropTypes.number,
  panelToDisplay: PropTypes.string,
  submitCollage: PropTypes.func,
};

export default Menu;
