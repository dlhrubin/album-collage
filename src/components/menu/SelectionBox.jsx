import React from 'react';
import PropTypes from 'prop-types';

const SelectionBox = ({
  selections, albumRange, error, deleteAlbum, dragStart, dragEnd, dragOver, drop,
}) => {
  // Populate selection box with selected albums (artist name and album thumbnail)
  const selectedAlbums = selections.map((selection, i) => (
    <div key={`${selection.artist}-${selection.album}`} artist={selection.artist} album={selection.album} thumbnail={selection.thumbnail} draggable="true" onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDrop={drop}>
      <img src={selection.thumbnail} alt={`${selection.album}, ${selection.artist}`} draggable="false" />
      <div className="title-container">
        <span>{`${selection.album} (${selection.artist})`}</span>
      </div>
      <button type="button" aria-label="Delete Selection" onClick={() => deleteAlbum(selection.artist, selection.album)}>
        <i className="fas fa-times" />
      </button>
    </div>
  ));
  return (
    <div className="album-selection">
      <p>
        Selection (
        {albumRange.min}
        -
        {albumRange.max}
        {' '}
        albums)
      </p>
      <div className="selection-box" style={{ borderColor: error ? 'red' : '' }}>
        {selectedAlbums}
      </div>
    </div>
  );
};

SelectionBox.defaultProps = {
  selections: [],
  error: '',
  albumRange: {},
  deleteAlbum: () => {},
  dragStart: () => {},
  dragEnd: () => {},
  dragOver: () => {},
  drop: () => {},
};

SelectionBox.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  error: PropTypes.string,
  albumRange: PropTypes.objectOf(PropTypes.number),
  deleteAlbum: PropTypes.func,
  dragStart: PropTypes.func,
  dragEnd: PropTypes.func,
  dragOver: PropTypes.func,
  drop: PropTypes.func,
};

export default SelectionBox;
