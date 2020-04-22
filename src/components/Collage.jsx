import React, { Component } from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import { collageDimensions } from '../data';
import styles from '../css/base/_global.scss';

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
const addOverlays = (collage, overlays) => {
  const finalCollage = [...collage];
  overlays.forEach((triangle) => {
    finalCollage.push(<div className={`overlay ${triangle}`} key={`${triangle}`} />);
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
const buildCollage = (selections, shape) => {
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
      collage = addOverlays(collage, ['top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right']);
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
      collage = addOverlays(collage, ['top-left', 'top-right', 'bottom-left', 'bottom-right']);
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
      collage = addOverlays(collage, ['top', 'top-left', 'top-right', 'bottom-left', 'bottom-right']);
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
      collage = addOverlays(collage, ['top-left', 'top-right', 'bottom-left', 'bottom-right']);
      break;
    default:
      collage = <div />;
  }
  return collage;
};

class Collage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      scaleFactor: 1,
      collageOffset: 0,
      downloadLink: '',
    };
    this.editButton = React.createRef();
    this.downloadButton = React.createRef();
    this.editDock = React.createRef();
    this.collagePanel = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      const { width, height } = this.state;
      this.handleResize(width, height);
    });
  }

  // Update width and height of collage grid when panel display or shape/number of albums changes
  componentDidUpdate(prevProps) {
    const { selections, shape, panelToDisplay } = this.props;
    const { width, height } = this.state;
    if ((shape !== prevProps.shape) || (selections.length !== prevProps.selections.length)) {
      const newWidth = shape ? collageDimensions[`${shape}-${selections.length}`][0] * 174 : 0;
      const newHeight = shape ? collageDimensions[`${shape}-${selections.length}`][1] * 174 : 0;
      this.setState({
        width: newWidth,
        height: newHeight,
      });
      this.handleResize(newWidth, newHeight);
    } else if (prevProps.panelToDisplay !== panelToDisplay) {
      this.handleResize(width, height);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      const { width, height } = this.state;
      this.handleResize(width, height);
    });
  }

  // Resize collage grid responsively according to browser size
  handleResize = (gridWidth, gridHeight) => {
    const dockHeight = this.editDock.current.offsetHeight;
    const collageWidth = this.collagePanel.current.offsetWidth;
    // Subtract margin and height of editing buttons dock to avoid overlap/spillover
    const collageHeight = this.collagePanel.current.offsetHeight - dockHeight - 30;

    const xScaleFactor = collageWidth / gridWidth;
    const yScaleFactor = collageHeight / gridHeight;
    const smallerFactor = Math.min(xScaleFactor, yScaleFactor);

    // Prevent collage from disappearing or flipping due to 0/negative scaling
    if (xScaleFactor >= 0 && yScaleFactor >= 0) {
      // Set minimum size for collage such that covers are still likely to be visible
      if (smallerFactor * gridWidth < 215 || smallerFactor * gridHeight < 215) {
        this.setState({
          scaleFactor: (gridWidth > gridHeight) ? 215 / gridHeight : 215 / gridWidth,
          collageOffset: dockHeight / 2,
        });
      } else {
        this.setState({
          scaleFactor: (xScaleFactor <= 1 || yScaleFactor <= 1) ? smallerFactor : 1,
          collageOffset: dockHeight / 2,
        });
      }
    }
  }

  // Focus on first button in edit docket when collage is generated
  handleChangeFocus = () => {
    this.editButton.current.focus();
  }

  // Download collage locally
  handleDownload = () => {
    html2canvas(document.getElementById('collage-grid'), { useCORS: true }).then((canvas) => {
      this.setState({
        downloadLink: canvas.toDataURL('image/png'),
      }, () => this.downloadButton.current.click());
    });
  }

  render() {
    const {
      selections, shape, editing, submitted, menuOffset, panelToDisplay, shuffleCollage,
      editCollage, resetCollage, deleteCollage,
    } = this.props;
    const { scaleFactor, collageOffset, downloadLink } = this.state;
    // Build collage
    const collage = buildCollage(selections, shape);
    const buttonStyle = { opacity: (editing || !shape) ? '0.3' : '' };
    const buttonDisabled = !!((editing || !shape));
    const editFocus = {
      backgroundColor: editing ? styles.highlight : '',
      borderColor: editing ? styles.highlight : '',
      boxShadow: editing ? `0 0 7px ${styles.tertiary}` : '',
      opacity: !shape ? '0.3' : '',
    };
    // On small screens, hide collage if collage is being created or edited in the selection menu
    const collageDisplay = (panelToDisplay === 'menu') ? 'none' : '';
    // Position collage based on visibility of menu panel
    const collageTransform = (!submitted || editing) || panelToDisplay ? '' : `translate(-${menuOffset / 2}px)`;

    return (
      <section id="collage-panel" className="collage" ref={this.collagePanel} style={{ display: collageDisplay, transform: collageTransform }}>
        <div id="edit-dock" className="edit-dock" ref={this.editDock}>
          <button id="edit-collage" className="collage-btn" ref={this.editButton} type="button" aria-label="Edit Collage" onClick={editCollage} style={editFocus} disabled={!shape}>
            <i className="fas fa-edit" />
          </button>
          <button id="shuffle-collage" className="collage-btn" type="button" aria-label="Shuffle Collage" onClick={shuffleCollage} style={buttonStyle} disabled={buttonDisabled}>
            <i className="fas fa-random" />
          </button>
          <button id="reset-collage" className="collage-btn" type="button" aria-label="Reset Collage" onClick={resetCollage} style={buttonStyle} disabled={buttonDisabled}>
            <i className="fas fa-undo" />
          </button>
          <button id="download-collage" className="collage-btn" type="button" aria-label="Download Collage" onClick={this.handleDownload} style={buttonStyle} disabled={buttonDisabled}>
            <i className="fas fa-download" />
          </button>
          <a href={downloadLink} download={`${shape}-${selections.length}`} ref={this.downloadButton}>Hidden download link</a>
          <button id="delete-collage" className="collage-btn" type="button" aria-label="Delete Collage" onClick={deleteCollage} style={buttonStyle} disabled={buttonDisabled}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div id="collage-grid" className={`collage-grid ${shape}-${selections.length}`} style={{ marginTop: `${collageOffset}px`, transform: `scale(${scaleFactor})`, opacity: editing ? '0.3' : '' }}>
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
  submitted: false,
  menuOffset: 0,
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
  submitted: PropTypes.bool,
  menuOffset: PropTypes.number,
  panelToDisplay: PropTypes.string,
  shuffleCollage: PropTypes.func,
  editCollage: PropTypes.func,
  resetCollage: PropTypes.func,
  deleteCollage: PropTypes.func,
};

export default Collage;
