import React, { Component } from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import styles from '../../css/base/_global.scss';

class EditDock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadLink: '',
    };
    this.dockToMeasure = React.createRef();
    this.colorInput = React.createRef();
    this.downloadButton = React.createRef();
  }

  // Download collage locally
  handleDownload = () => {
    const { backgroundColor } = this.props;
    html2canvas(document.getElementById('collage-grid'), { useCORS: true, backgroundColor }).then((canvas) => {
      this.setState({
        downloadLink: canvas.toDataURL('image/png'),
      }, () => this.downloadButton.current.click());
    });
  }

  render() {
    const {
      selections, shape, editing, shuffleCollage, editCollage, changeBackground, resetCollage,
      deleteCollage,
    } = this.props;
    const { downloadLink } = this.state;
    const editingScreen = (editing || !shape);
    const editDockStyle = {
      background: editingScreen ? 'rgba(243, 244, 245, 0.8)' : '',
      borderColor: editingScreen ? 'rgba(44, 210, 238, 0.3)' : '',
      boxShadow: editingScreen ? '1px 1px 5px rgba(117, 117, 117, 0.3)' : '',
    };
    const buttonStyle = { opacity: editingScreen ? '0.3' : '' };
    const buttonDisabled = !!(editingScreen);
    const editFocus = {
      backgroundColor: editing ? styles.highlight : '',
      borderColor: editing ? styles.highlight : '',
      boxShadow: editing ? `0 0 7px ${styles.tertiary}` : '',
      opacity: !shape ? '0.3' : '',
    };
    return (
      <div id="edit-dock" ref={this.dockToMeasure} className="edit-dock" style={editDockStyle}>
        <button id="edit-collage" className="collage-btn" type="button" aria-label="Edit Collage" onClick={editCollage} style={editFocus} disabled={!shape}>
          <i className="fas fa-edit" />
        </button>
        <button id="change-background" className="collage-btn" type="button" aria-label="Change Background Color" onClick={() => this.colorInput.current.click()} style={buttonStyle} disabled={buttonDisabled}>
          <i className="fas fa-fill-drip" />
          <input type="color" ref={this.colorInput} onChange={changeBackground} disabled={buttonDisabled} />
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
    );
  }
}

EditDock.defaultProps = {
  selections: [],
  shape: '',
  backgroundColor: '#ffffff',
  editing: false,
  editCollage: () => {},
  changeBackground: () => {},
  shuffleCollage: () => {},
  resetCollage: () => {},
  deleteCollage: () => {},
};

EditDock.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  shape: PropTypes.string,
  backgroundColor: PropTypes.string,
  editing: PropTypes.bool,
  editCollage: PropTypes.func,
  changeBackground: PropTypes.func,
  shuffleCollage: PropTypes.func,
  resetCollage: PropTypes.func,
  deleteCollage: PropTypes.func,
};

export default EditDock;
