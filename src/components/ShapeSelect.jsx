import React from 'react';
import PropTypes from 'prop-types';
import { shapes } from '../data';
import styles from '../css/base/_global.scss';

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

  const shapeButtons = shapes.map((shape) => {
    let color;
    // Make shapes red on "no shape selected" submission error
    if (error) {
      color = 'red';
    // Highlight shape if shape has been selected and submit button hasn't been pressed
    } else if (selected === shape.name) {
      color = styles.highlight;
    // Fill shape if shape has been selected and submit button hasn't been pressed
    } else {
      color = '';
    }
    const svgStyle = { fill: color, stroke: color };
    // Show shape only if minimum required number of albums have been selected
    const shapeStyle = { display: (shape.numbers.includes(numAlbums)) ? '' : 'none' };
    return (
      <button key={shape.name} name={shape.name} type="button" className={`shape-btn ${shape.name}`} aria-label={`Select ${shape.name} shape`} style={shapeStyle} onClick={handleClick}>
        <svg width="36" height="36" style={svgStyle}>
          <polygon points={shape.coords} />
        </svg>
      </button>
    );
  });
  return (
    <div className="shape-options">
      <h2>Collage shape:</h2>
      <div className="shapes">
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
