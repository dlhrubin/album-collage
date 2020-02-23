import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getStyle from '../utils';
import { collageDimensions } from '../data';
import styles from '../css/base/_global.scss';

// Helper function to populate collage initially with a single copy of each album cover
const populate = (selections) => (
  selections.map((album) => (
    <div key={album.album}>
      <img src={album.cover} alt={`${album.album}, ${album.artist}`} />
    </div>
  ))
);

// Helper function to add blank squares to the collage
const addBlanks = (collage, indices) => {
  const newArr = [...collage];
  indices.forEach((coord) => newArr.splice(coord, 0, <div key={`blank-${coord}`} className="blank-square" />));
  return newArr;
};

// Helper function to insert duplicate covers into the collage as needed
const addDups = (selections, collage, indices) => {
  const newArr = [...collage];
  indices.forEach((tuple) => {
    newArr.splice(tuple[1], 0,
      <div key={`${selections[tuple[0]].album}-${tuple[1]}`}>
        <img src={selections[tuple[0]].cover} alt={`${selections[tuple[0]].album}, ${selections[tuple[0]].artist}`} />
      </div>);
  });
  return newArr;
};

/*
let shapeSingleCross = (collage, n) => {
    let gridSize = 5 + (4 * n) - 2 * (n + 1);
    return [...Array(gridSize ** 2).keys()].filter(i =>
      (i - 1) % gridSize && (i < (gridSize * (n + 1)) || i >= (gridSize * (n + 1) + gridSize))
    )
}
*/
class Collage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      scaleFactor: 1,
    };
    this.editButton = React.createRef();
  }

  componentDidMount() {
    const { width, height } = this.state;
    window.addEventListener('resize', () => {
      this.handleResize(width, height);
    });
  }

  // Update width and height of collage grid when shape or number of albums changes
  componentDidUpdate(prevProps) {
    const { selections, shape } = this.props;
    if ((shape !== prevProps.shape) || (selections.length !== prevProps.selections.length)) {
      const newWidth = shape ? collageDimensions[`${shape}-${selections.length}`][0] * 174 : 0;
      const newHeight = shape ? collageDimensions[`${shape}-${selections.length}`][1] * 174 : 0;
      this.setState({
        width: newWidth,
        height: newHeight,
      });
      this.handleResize(newWidth, newHeight);
    }
  }

  componentWillUnmount() {
    const { width, height } = this.state;
    window.removeEventListener('resize', () => {
      this.handleResize(width, height);
    });
  }

  // Resize collage grid responsively according to browser size
  handleResize = (gridWidth, gridHeight) => {
    const collageWidth = getStyle('collage', 'width');
    let collageHeight = getStyle('collage', 'height');
    // Take height of editing buttons dock into account to avoid overlap
    collageHeight -= getStyle('edit-dock', 'height') * 2 + 30;

    const xScaleFactor = collageWidth / gridWidth;
    const yScaleFactor = collageHeight / gridHeight;
    const smallerFactor = Math.min(xScaleFactor, yScaleFactor);

    // Prevent collage from disappearing or flipping due to 0/negative scaling
    if (xScaleFactor >= 0 && yScaleFactor >= 0) {
      // Set minimum size for collage such that covers are still likely to be visible
      if (smallerFactor * gridWidth < 215 || smallerFactor * gridHeight < 215) {
        this.setState({
          scaleFactor: (gridWidth > gridHeight) ? 215 / gridHeight : 215 / gridWidth,
        });
      } else {
        this.setState({
          scaleFactor: (xScaleFactor <= 1 || yScaleFactor <= 1) ? smallerFactor : 1,
        });
      }
    }
  }

  // Focus on first button in edit docket when collage is generated
  handleChangeFocus = () => {
    this.editButton.current.focus();
  }

  render() {
    const {
      selections, shape, editing, panelToDisplay, shuffleCollage, editCollage, resetCollage,
      deleteCollage,
    } = this.props;
    const { scaleFactor } = this.state;
    // Map covers to their positions
    let collage = populate(selections);
    // Implement cross shape
    if (shape === 'cross') {
      // Add blank squares
      if (selections.length === 5) {
        collage = addBlanks(collage, [0, 2, 6, 8]);
      } else if (selections.length === 9) {
        collage = addBlanks(collage, [0, 1, 3, 4, 5, 6, 8, 9, 15, 16, 18, 19, 20, 21, 23, 24]);
      } else if (selections.length === 13) {
        collage = addBlanks(collage, [0, 1, 2, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19,
          20, 28, 29, 30, 32, 33, 34, 35, 36, 37, 39, 40, 41, 42, 43,
          44, 46, 47, 48]);
      } else if (selections.length === 17) {
        collage = addBlanks(collage, [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18,
          19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35,
          45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 59, 60, 61,
          62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78,
          79, 80]);
      } else if (selections.length === 20) {
        collage = addBlanks(collage, [0, 1, 4, 5, 6, 7, 10, 11, 24, 25, 28, 29, 30, 31, 34, 35]);
      } else if (selections.length === 28) {
        collage = addBlanks(collage, [0, 1, 2, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 21, 22,
          23, 40, 41, 42, 45, 46, 47, 48, 49, 50, 53, 54, 55, 56, 57,
          58, 61, 62, 63]);
      }
      // Implement x collage shape
    } else if (shape === 'x') {
      if (selections.length === 10) {
        collage = addDups(selections, collage,
          [[9, 4], [6, 7], [3, 12], [2, 13], [1, 14], [0, 15]]);
      } else if (selections.length === 14) {
        collage = addDups(selections, collage,
          [[1, 2], [0, 7], [11, 8], [8, 11], [0, 16], [4, 18], [3, 19], [1, 21],
            [1, 22], [0, 23]]);
        collage = addBlanks(collage, [0, 2, 3, 5, 12, 17, 18, 23, 30, 32, 33, 35]);
      } else if (selections.length === 18) {
        collage = addDups(selections, collage,
          [[17, 4], [14, 9], [13, 10], [10, 13], [6, 20], [5, 21], [3, 24],
            [2, 25], [1, 26], [0, 27]]);
        collage = addBlanks(collage, [2, 3, 12, 17, 18, 23, 32, 33]);
      } else if (selections.length === 22) {
        collage = addDups(selections, collage,
          [[1, 2], [0, 7], [19, 8], [16, 13], [15, 14], [12, 17], [8, 24], [7, 25],
            [0, 28], [4, 30], [3, 31], [1, 33], [1, 34], [0, 35]]);
        collage = addBlanks(collage,
          [0, 2, 3, 4, 5, 7, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40,
            47, 51, 52, 56, 58, 59, 60, 61, 63]);
      } else if (selections.length === 26) {
        collage = addDups(selections, collage,
          [[25, 4], [22, 9], [21, 10], [18, 15], [17, 16], [14, 19], [10, 26],
            [9, 27], [6, 32], [5, 33], [3, 36], [2, 37], [1, 38], [0, 39]]);
        collage = addBlanks(collage,
          [2, 3, 4, 5, 11, 12, 16, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40, 47,
            51, 52, 58, 59, 60, 61]);
      } else if (selections.length === 30) {
        collage = addDups(selections, collage,
          [[1, 2], [0, 7], [27, 8], [24, 13], [23, 14], [20, 19], [19, 20],
            [16, 23], [12, 30], [11, 31], [8, 36], [7, 37], [0, 40], [4, 42],
            [3, 43], [1, 45], [1, 46], [0, 47]]);
        collage = addBlanks(collage,
          [0, 2, 3, 4, 5, 6, 7, 9, 13, 14, 15, 16, 20, 24, 25, 29, 30, 31, 38,
            39, 40, 41, 42, 47, 48, 49, 50, 51, 52, 57, 58, 59, 60, 61, 68, 69, 70,
            74, 75, 79, 83, 84, 85, 86, 90, 92, 93, 94, 95, 96, 97, 99]);
      }
      // Add overlay
      ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right']
        .forEach((triangle) => {
          collage.push(<div className={`overlay ${triangle}`} key={`${triangle}`} />);
        });
      // Implement square collage shape
    } else if (shape === 'square') {
      // Implement diamond collage shape
    } else if (shape === 'diamond') {
      if (selections.length === 2) {
        collage = addDups(selections, collage, [[1, 2], [0, 3]]);
      } else if (selections.length === 8) {
        collage = addDups(selections, collage, [[0, 4], [0, 8], [3, 9], [1, 11], [0, 12]]);
        collage = addBlanks(collage, [0, 1, 3, 4, 5, 9, 15, 19, 20, 21, 23, 24]);
      } else if (selections.length === 18) {
        collage = addDups(selections, collage,
          [[11, 12], [6, 17], [5, 18], [2, 21], [1, 22], [0, 23]]);
        collage = addBlanks(collage, [0, 1, 4, 5, 6, 11, 24, 29, 30, 31, 34, 35]);
      }
      // Add overlay
      ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((triangle) => {
        collage.push(<div className={`overlay ${triangle}`} key={`${triangle}`} />);
      });
      // Implement heart collage shape
    } else if (shape === 'heart') {
      if (selections.length === 6) {
        collage = addDups(selections, collage, [[1, 4], [2, 7], [3, 9], [0, 10]]);
        collage = addBlanks(collage, [8, 11]);
      } else if (selections.length === 10) {
        collage = addDups(selections, collage, [[1, 8], [2, 11], [3, 12], [0, 13]]);
        collage = addBlanks(collage, [12, 15]);
      } else if (selections.length === 22) {
        collage = addDups(selections, collage,
          [[6, 16], [7, 21], [1, 22], [2, 25], [3, 26], [0, 27]]);
        collage = addBlanks(collage, [2, 3, 24, 29, 30, 31, 34, 35]);
      } else if (selections.length === 24) {
        collage = addDups(selections, collage,
          [[7, 12], [8, 19], [1, 20], [2, 25], [11, 26], [4, 29], [3, 30],
            [0, 31]]);
        collage = addBlanks(collage,
          [0, 3, 4, 7, 24, 31, 32, 33, 38, 39, 40, 41, 42, 45, 46, 47]);
      }
      // Add overlay
      ['top', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((triangle) => {
        collage.push(<div className={`overlay ${triangle}`} key={`${triangle}`} />);
      });
      // Implement octagon collage shape
    } else if (shape === 'octagon') {
      if (selections.length === 7) {
        collage = addDups(selections, collage, [[2, 6], [0, 8]]);
      } else if (selections.length === 28) {
        collage = addDups(selections, collage, [[9, 22], [4, 27], [3, 28], [0, 31]]);
        collage = addBlanks(collage, [0, 5, 30, 35]);
      }
      // Add overlay
      ['top-left', 'top-right', 'bottom-left', 'bottom-right'].forEach((triangle) => {
        collage.push(<div className={`overlay ${triangle}`} key={`${triangle}`} />);
      });
    } else {
      collage = <div />;
    }

    const buttonStyle = { opacity: (editing || !shape) ? '0.3' : '' };
    const buttonDisabled = !!((editing || !shape));
    // On small screens, hide collage if collage is being created or edited in the selection menu
    const collageDisplay = (panelToDisplay === 'menu') ? 'none' : '';

    return (
      <section className="collage" style={{ display: collageDisplay }}>
        <div className="edit-dock">
          <button ref={this.editButton} type="button" aria-label="Edit Collage" onClick={editCollage} style={{ backgroundColor: editing ? styles.highlight : '', borderColor: editing ? styles.highlight : '', opacity: !shape ? '0.3' : '' }} disabled={!shape}>
            <i className="fas fa-edit" />
          </button>
          <button type="button" aria-label="Shuffle Collage" onClick={shuffleCollage} style={buttonStyle} disabled={buttonDisabled}>
            <i className="fas fa-random" />
          </button>
          <button type="button" aria-label="Reset Collage" onClick={resetCollage} style={buttonStyle} disabled={buttonDisabled}>
            <i className="fas fa-undo" />
          </button>
          <button type="button" aria-label="Delete Collage" onClick={deleteCollage} style={buttonStyle} disabled={buttonDisabled}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div className={`collage-grid ${shape}-${selections.length}`} style={{ transform: `scale(${scaleFactor})`, opacity: editing ? '0.3' : '' }}>
          {collage}
        </div>
      </section>
    );
  }
}


Collage.defaultProps = {
  selections: [],
  shape: '',
  editing: false,
  panelToDisplay: '',
  shuffleCollage: () => {},
  editCollage: () => {},
  resetCollage: () => {},
  deleteCollage: () => {},
};

Collage.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  shape: PropTypes.string,
  editing: PropTypes.bool,
  panelToDisplay: PropTypes.string,
  shuffleCollage: PropTypes.func,
  editCollage: PropTypes.func,
  resetCollage: PropTypes.func,
  deleteCollage: PropTypes.func,
};

export default Collage;
