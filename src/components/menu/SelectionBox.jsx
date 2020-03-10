import React from 'react';
import PropTypes from 'prop-types';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import { DndProvider } from 'react-dnd';
import Item from './SelectionBox/Item';

const SelectionBox = ({
  selections, albumRange, error, deleteAlbum, drop,
}) => {
  // Populate selection box with selected albums (artist name and album thumbnail)
  const selectedAlbums = selections.map((selection) => (
    <Item key={selection.id} selection={selection} deleteAlbum={deleteAlbum} drop={drop} />
  ));
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="album-selection">
        <p>
          Selection (
          {albumRange.min}
          -
          {albumRange.max}
          {' '}
          albums)
        </p>
        <div id="selections" className="selection-box" style={{ borderColor: error ? 'red' : '' }}>
          {selectedAlbums}
        </div>
      </div>
    </DndProvider>
  );
};

SelectionBox.defaultProps = {
  selections: [],
  error: '',
  albumRange: {},
  deleteAlbum: () => {},
  drop: () => {},
};

SelectionBox.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  error: PropTypes.string,
  albumRange: PropTypes.objectOf(PropTypes.number),
  deleteAlbum: PropTypes.func,
  drop: PropTypes.func,
};

export default SelectionBox;
