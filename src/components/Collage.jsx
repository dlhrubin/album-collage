import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { collageDimensions } from '../data';
import EditDock from './Collage/EditDock';
import Display from './Collage/Display';

class Collage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      scaleFactor: 1,
      collageOffset: 0,
    };
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
    const dockHeight = this.editDock.current.dockToMeasure.current.offsetHeight;
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

  render() {
    const {
      selections, shape, editing, backgroundColor, submitted, menuOffset, panelToDisplay,
      shuffleCollage, editCollage, changeBackground, resetCollage, deleteCollage,
    } = this.props;
    const { scaleFactor, collageOffset } = this.state;

    // On small screens, hide collage if collage is being created or edited in the selection menu
    const collageDisplay = (panelToDisplay === 'menu') ? 'none' : '';
    // Position collage based on visibility of menu panel
    const collageTransform = (!submitted || editing) || panelToDisplay ? '' : `translate(-${menuOffset / 2}px)`;

    return (
      <section id="collage-panel" className="collage" ref={this.collagePanel} style={{ display: collageDisplay, transform: collageTransform }}>
        <EditDock
          ref={this.editDock}
          selections={selections}
          shape={shape}
          editing={editing}
          shuffleCollage={shuffleCollage}
          editCollage={editCollage}
          changeBackground={changeBackground}
          resetCollage={resetCollage}
          deleteCollage={deleteCollage}
        />
        <Display
          selections={selections}
          shape={shape}
          backgroundColor={backgroundColor}
          collageOffset={collageOffset}
          scaleFactor={scaleFactor}
          editing={editing}
        />
      </section>
    );
  }
}

Collage.defaultProps = {
  selections: [],
  shape: '',
  backgroundColor: '#ffffff',
  editing: false,
  submitted: false,
  menuOffset: 0,
  panelToDisplay: '',
  editCollage: () => {},
  changeBackground: () => {},
  shuffleCollage: () => {},
  resetCollage: () => {},
  deleteCollage: () => {},
};

Collage.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  shape: PropTypes.string,
  backgroundColor: PropTypes.string,
  editing: PropTypes.bool,
  submitted: PropTypes.bool,
  menuOffset: PropTypes.number,
  panelToDisplay: PropTypes.string,
  editCollage: PropTypes.func,
  changeBackground: PropTypes.func,
  shuffleCollage: PropTypes.func,
  resetCollage: PropTypes.func,
  deleteCollage: PropTypes.func,
};

export default Collage;
