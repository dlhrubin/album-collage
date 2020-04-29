import React from 'react';
import PropTypes from 'prop-types';

// Populate collage initially with a single copy of each album cover
const populate = (selections) => (
  selections.map((selection) => (
    <div key={selection.id} className="album-tile">
      <img src={selection.cover} alt={`${selection.album}, ${selection.artist}`} />
    </div>
  ))
);

// Add blank squares to the collage
const addBlanks = (collage, indices) => {
  const newArr = [...collage];
  indices.forEach((coord) => newArr.splice(coord, 0, <div key={`blank-${coord}`} className="blank-square" />));
  return newArr;
};

// Insert duplicate covers into the collage as needed
const addDups = (selections, collage, indices) => {
  const newArr = [...collage];
  indices.forEach((tuple) => {
    newArr.splice(tuple[1], 0,
      <div key={`${selections[tuple[0]].id}-${tuple[1]}`} className="album-tile">
        <img src={selections[tuple[0]].cover} alt={`${selections[tuple[0]].album}, ${selections[tuple[0]].artist}`} />
      </div>);
  });
  return newArr;
};

// Add triangle overlays to form final collage shape
const addOverlays = (collage, backgroundColor, overlays) => {
  const finalCollage = [...collage];
  overlays.forEach((triangle) => {
    // Set overlay color
    let side = triangle.match(/^\w*/)[0];
    side = side.charAt(0).toUpperCase() + side.slice(1);
    const overlayColor = {};
    overlayColor[`border${side}Color`] = backgroundColor;
    finalCollage.push(<div className={`overlay ${triangle}`} key={`${triangle}`} style={overlayColor} />);
  });
  return finalCollage;
};

// Get indices to insert blanks to shape cross
const getCrossBlanks = (gridSize, n) => (
  [...Array(gridSize ** 2).keys()]
    .filter((i) => (i - n) % gridSize
        && (i < gridSize * n || i >= gridSize * n + gridSize))
);

// Dynamically generate single cross shape
const shapeSingleCross = (collage, n) => {
  const gridSize = 2 * n + 1;
  return addBlanks(collage, getCrossBlanks(gridSize, n));
};

// Dynamically generate double cross shape
const shapeDoubleCross = (collage, n) => {
  const gridSize = 2 * n + 2;
  const cross1 = getCrossBlanks(gridSize, n);
  const cross2 = getCrossBlanks(gridSize, n + 1);
  return addBlanks(collage, cross1.filter((i) => cross2.includes(i)));
};

// Build collage shapes
const buildCollage = (selections, shape, backgroundColor) => {
  let collage = populate(selections);
  switch (shape) {
    case 'cross':
      if (selections.length < 20) {
        collage = shapeSingleCross(collage, (selections.length - 1) / 4);
      } else {
        collage = shapeDoubleCross(collage, (selections.length - 4) / 8);
      }
      break;
    case 'x':
      switch (selections.length) {
        case 10:
          collage = addDups(selections, collage,
            [[9, 4], [6, 7], [3, 12], [2, 13], [1, 14], [0, 15]]);
          break;
        case 14:
          collage = addDups(selections, collage,
            [[1, 2], [0, 7], [11, 8], [8, 11], [0, 16], [4, 18], [3, 19], [1, 21],
              [1, 22], [0, 23]]);
          collage = addBlanks(collage, [0, 2, 3, 5, 12, 17, 18, 23, 30, 32, 33, 35]);
          break;
        case 18:
          collage = addDups(selections, collage,
            [[17, 4], [14, 9], [13, 10], [10, 13], [6, 20], [5, 21], [3, 24],
              [2, 25], [1, 26], [0, 27]]);
          collage = addBlanks(collage, [2, 3, 12, 17, 18, 23, 32, 33]);
          break;
        case 22:
          collage = addDups(selections, collage,
            [[1, 2], [0, 7], [19, 8], [16, 13], [15, 14], [12, 17], [8, 24], [7, 25],
              [0, 28], [4, 30], [3, 31], [1, 33], [1, 34], [0, 35]]);
          collage = addBlanks(collage,
            [0, 2, 3, 4, 5, 7, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40,
              47, 51, 52, 56, 58, 59, 60, 61, 63]);
          break;
        case 26:
          collage = addDups(selections, collage,
            [[25, 4], [22, 9], [21, 10], [18, 15], [17, 16], [14, 19], [10, 26],
              [9, 27], [6, 32], [5, 33], [3, 36], [2, 37], [1, 38], [0, 39]]);
          collage = addBlanks(collage,
            [2, 3, 4, 5, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40, 47,
              51, 52, 58, 59, 60, 61]);
          break;
        case 30:
          collage = addDups(selections, collage,
            [[1, 2], [0, 7], [27, 8], [24, 13], [23, 14], [20, 19], [19, 20],
              [16, 23], [12, 30], [11, 31], [8, 36], [7, 37], [0, 40], [4, 42],
              [3, 43], [1, 45], [1, 46], [0, 47]]);
          collage = addBlanks(collage,
            [0, 2, 3, 4, 5, 6, 7, 9, 13, 14, 15, 16, 20, 24, 25, 29, 30, 31, 38,
              39, 40, 41, 42, 47, 48, 49, 50, 51, 52, 57, 58, 59, 60, 61, 68, 69, 70,
              74, 75, 79, 83, 84, 85, 86, 90, 92, 93, 94, 95, 96, 97, 99]);
          break;
        default:
            // No selections, so do nothing
      }
      collage = addOverlays(collage, backgroundColor, ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right']);
      break;
    case 'square':
      // Square shapes require no overlays or added blanks
      break;
    case 'diamond':
      switch (selections.length) {
        case 2:
          collage = addDups(selections, collage, [[1, 2], [0, 3]]);
          break;
        case 8:
          collage = addDups(selections, collage, [[0, 4], [0, 8], [3, 9], [1, 11], [0, 12]]);
          collage = addBlanks(collage, [0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24]);
          break;
        case 18:
          collage = addDups(selections, collage,
            [[11, 12], [6, 17], [5, 18], [2, 21], [1, 22], [0, 23]]);
          collage = addBlanks(collage, [0, 1, 4, 5, 6, 11, 24, 29, 30, 31, 34, 35]);
          break;
        default:
            // No selections, so do nothing
      }
      collage = addOverlays(collage, backgroundColor, ['top-left', 'top-right', 'bottom-left', 'bottom-right']);
      break;
    case 'heart':
      switch (selections.length) {
        case 6:
          collage = addDups(selections, collage, [[1, 4], [2, 7], [3, 9], [0, 10]]);
          collage = addBlanks(collage, [8, 11]);
          break;
        case 10:
          collage = addDups(selections, collage, [[1, 8], [2, 11], [3, 12], [0, 13]]);
          collage = addBlanks(collage, [12, 15]);
          break;
        case 22:
          collage = addDups(selections, collage,
            [[6, 16], [7, 21], [1, 22], [2, 25], [3, 26], [0, 27]]);
          collage = addBlanks(collage, [2, 3, 24, 29, 30, 31, 34, 35]);
          break;
        case 24:
          collage = addDups(selections, collage,
            [[7, 12], [8, 19], [1, 20], [2, 25], [11, 26], [4, 29], [3, 30],
              [0, 31]]);
          collage = addBlanks(collage,
            [0, 3, 4, 7, 24, 31, 32, 33, 38, 39, 40, 41, 42, 45, 46, 47]);
          break;
        default:
            // No selections, so do nothing
      }
      collage = addOverlays(collage, backgroundColor, ['top', 'top-left', 'top-right', 'bottom-left', 'bottom-right']);
      break;
    case 'octagon':
      switch (selections.length) {
        case 7:
          collage = addDups(selections, collage, [[2, 6], [0, 8]]);
          break;
        case 28:
          collage = addDups(selections, collage, [[9, 22], [4, 27], [3, 28], [0, 31]]);
          collage = addBlanks(collage, [0, 5, 30, 35]);
          break;
        default:
            // No selections, so do nothing
      }
      collage = addOverlays(collage, backgroundColor, ['top-left', 'top-right', 'bottom-left', 'bottom-right']);
      break;
    default:
      collage = <div />;
  }
  return collage;
};

const Display = ({
  selections, shape, backgroundColor, collageOffset, scaleFactor, editing,
}) => {
  // Build collage
  const collage = buildCollage(selections, shape, backgroundColor);
  return (
    <div id="collage-grid" className={`collage-grid ${shape}-${selections.length}`} style={{ marginTop: `${collageOffset}px`, transform: `scale(${scaleFactor})`, opacity: editing ? '0.3' : '' }}>
      {collage}
    </div>
  );
};

Display.defaultProps = {
  selections: [],
  shape: '',
  backgroundColor: '#ffffff',
  collageOffset: 0,
  scaleFactor: 1,
  editing: false,
};

Display.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  shape: PropTypes.string,
  backgroundColor: PropTypes.string,
  collageOffset: PropTypes.number,
  scaleFactor: PropTypes.number,
  editing: PropTypes.bool,
};

export default Display;
