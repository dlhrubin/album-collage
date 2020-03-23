import React from 'react';
import PropTypes from 'prop-types';
import { shapes } from '../../data';
import styles from '../../css/base/_global.scss';

const ShapeSelect = ({
  selected, numAlbums, error, selectShape, clearError,
}) => {

  const handleClick = (e) => {
    const clicked = (e.target.name === selected) ? '' : e.target.name;
    // Submit selected shape to the Menu component
    selectShape(clicked);
    // Clear any submission errors when a shape is clicked
    clearError();
  };

  // Show shape only if required number of albums has been selected
  const shapeButtons = shapes.filter((shape) => shape.numbers.includes(numAlbums))
    .map((shape) => {
      let color;
      // Make shapes red on "no shape selected" submission error
      if (error) {
        color = 'red';
        // Highlight and fill shape if shape has been selected and submit button hasn't been pressed
      } else if (selected === shape.name) {
        color = styles.highlight;
      } else {
        color = '';
      }
      return (
        <button key={shape.name} name={shape.name} type="button" className={`shape-btn ${shape.name}`} aria-label={`Select ${shape.name} shape`} onClick={handleClick}>
          <svg width="36" height="36" style={{ fill: color, stroke: color }}>
            <polygon points={shape.coords} />
          </svg>
        </button>
      );
    });
  return (
    <div className="shape-options">
      <h2>Collage shape:</h2>
      <div id="shapes" className="shapes">
        {shapeButtons}
      </div>
    </div>
  );
};

ShapeSelect.defaultProps = {
  selected: '',
  numAlbums: 0,
  error: '',
  selectShape: () => {},
  clearError: () => {},
};

ShapeSelect.propTypes = {
  selected: PropTypes.string,
  numAlbums: PropTypes.number,
  error: PropTypes.string,
  selectShape: PropTypes.func,
  clearError: PropTypes.func,
};

export default ShapeSelect;
