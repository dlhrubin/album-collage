import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class AlbumSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newArtist: '',
      newAlbum: '',
      searchVis: 'hidden',
      addVis: 'hidden',
      warnings: { artist: '', album: '' },
      key: '',
    };
    this.artistInput = React.createRef();
    this.albumInput = React.createRef();
    this.addAlbum = React.createRef();
  }

  // Fetch API key when component mounts
  componentDidMount() {
    axios.get('https://iv0kqf6z1c.execute-api.us-east-2.amazonaws.com/prod').then((res) => {
      this.setState({
        key: res.data,
      });
    });
  }

  // If user deletes album from full selection box, clear "max number of albums selected" warning
  componentDidUpdate(prevProps) {
    const { selections, albumRange } = this.props;
    if (selections.length !== prevProps.selections.length && selections.length < albumRange.max) {
      clearTimeout(this.flashWarning);
      this.setState({
        warnings: { artist: '', album: '' },
      });
    }
  }

  // Reset search bars when submit button or edit button is clicked in App
  clearAlbumSelect = () => {
    const { clearError } = this.props;
    this.setState({
      newArtist: '',
      newAlbum: '',
      searchVis: 'hidden', // Toggle album search field visibility
      addVis: 'hidden', // Toggle add album button field visibility
      warnings: { artist: '', album: '' },
    });
    clearTimeout(this.flashWarning);
    clearError();
  }

  // Display warning that the max number of albums have been selected
  handleClick = () => {
    const { selections, albumRange } = this.props;
    if (selections.length === albumRange.max) {
      this.setState({
        warnings: { artist: `${albumRange.max} albums already selected`, album: '' },
      });
      this.flashWarning = setTimeout(() => {
        this.setState({
          warnings: { artist: '', album: '' },
        });
      }, 5000);
    }
  }

  // Update local state values for new artist and album entries as user types
  handleChange = (isArtist, e) => {
    const { clearError } = this.props;
    const { newArtist } = this.state;
    this.setState({
      newArtist: (isArtist) ? e.target.value : newArtist,
      newAlbum: (isArtist) ? '' : e.target.value,
      searchVis: (isArtist) ? 'hidden' : 'visible',
      addVis: 'hidden',
      warnings: { artist: '', album: '' },
      img: { thumbnail: '', cover: '' },
    });
    clearError();
  }

  handleSearch = (isArtist, e) => {
    const { selections } = this.props;
    const { newArtist, newAlbum, key } = this.state;
    e.preventDefault();
    // Check that user has entered text into the field
    const hasContent = (isArtist) ? newArtist : newAlbum;
    if (hasContent) {
      if (isArtist) {
        axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=${key}&artist=${newArtist}&format=json`)
          .then((res) => {
            const artistsFound = res.data.results.artistmatches.artist;
            if (artistsFound.length) {
              this.setState({
                newArtist: artistsFound[0].name,
                searchVis: 'visible', // Toggle album search field visibility
              }, () => { setTimeout(() => this.albumInput.current.focus(), 1); });
            } else {
              this.setState({
                warnings: { artist: 'Artist not found', album: '' },
              });
            }
          });
      } else {
        axios.get(`https://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${key}&album=${newAlbum}&format=json`)
          .then((res) => {
            // Limit to albums with artist fields that match the user-entered artist
            const albumsFound = res.data.results.albummatches.album
              .filter((album) => album.artist === newArtist);
            // Check that an album was returned and has an image
            if (albumsFound.length && albumsFound[0].image[0]['#text']) {
              // Check that the album entered has not already been selected
              const repeat = selections
                .filter((selection) => selection.artist === newArtist
                                     && selection.album === albumsFound[0].name)
                .length;
              if (!repeat) {
                this.setState({
                  newAlbum: albumsFound[0].name,
                  addVis: 'visible',
                  img: {
                    thumbnail: albumsFound[0].image.filter((entry) => entry.size === 'small')[0]['#text'],
                    cover: albumsFound[0].image.filter((entry) => entry.size === 'large')[0]['#text'],
                  },
                }, () => { setTimeout(() => this.addAlbum.current.focus(), 15); });
              } else {
                this.setState({
                  newAlbum: albumsFound[0].name,
                  warnings: { artist: '', album: 'Album already selected' },
                });
              }
            } else {
              this.setState({
                warnings: { artist: '', album: 'Album not found' },
              });
            }
          });
      }
    }
  }

  handleSubmit = () => {
    const { newArtist, newAlbum, img } = this.state;
    const { addAlbum } = this.props;
    this.setState({
      newArtist: '',
      newAlbum: '',
      searchVis: 'hidden', // Toggle album search field visibility
      addVis: 'hidden',
    });
    addAlbum(newArtist, newAlbum, img.thumbnail, img.cover);
    // Jump focus to the artist search field after submitting new album
    this.artistInput.current.focus();
  }

  render() {
    const {
      selections, focused, albumRange, inputWidth,
    } = this.props;
    const {
      newArtist, newAlbum, warnings, searchVis, addVis,
    } = this.state;
    // Style input field border (depending on warnings) and width (depending on screen size)
    const inputStyle = (field) => ({ borderColor: warnings[field] ? 'red' : '', width: inputWidth });
    // Add red border to search boxes when a warning is present
    const warningBorder = (field) => (warnings[field] ? { borderColor: 'red' } : { borderColor: '' });
    const maxAlbums = selections.length === albumRange.max;
    // Disable album search if menu panel is not in focus
    const disableSearch = selections.length === albumRange.max || !focused;
    return (
      <div className="album-options">
        <h2>Albums:</h2>
        <form onSubmit={this.handleSearch.bind(this, true)}>
          <div className="artist-search-box" onClick={maxAlbums ? this.handleClick : undefined} onKeyPress={maxAlbums ? this.handleClick : undefined} role={maxAlbums ? 'button' : undefined} tabIndex={maxAlbums ? 0 : undefined}>
            <label htmlFor="artist-search">
              <span>Artist</span>
              <input id="artist-search" type="search" spellCheck="false" style={inputStyle('artist')} placeholder="Enter artist name..." autoComplete="off" disabled={disableSearch ? 'disabled' : ''} ref={this.artistInput} value={newArtist} onChange={this.handleChange.bind(this, true)} />
            </label>
            <button className="search-submit" type="submit" aria-label="Artist Search" style={warningBorder('artist')} disabled={disableSearch ? 'disabled' : ''}>
              <i className="fas fa-search" />
            </button>
          </div>
          <p className="warning">{warnings.artist}</p>
        </form>
        <form onSubmit={this.handleSearch.bind(this, false)} style={{ visibility: searchVis }}>
          <div>
            <label htmlFor="album-search">
              <span>Album</span>
              <input id="album-search" type="search" spellCheck="false" style={inputStyle('album')} placeholder="Enter album name..." autoComplete="off" ref={this.albumInput} value={newAlbum} onChange={this.handleChange.bind(this, false)} />
            </label>
            <button className="search-submit" type="submit" aria-label="Album Search" style={warningBorder('album')}>
              <i className="fas fa-search" />
            </button>
          </div>
          <p className="warning">{warnings.album}</p>
        </form>
        <button className="search-submit" type="button" aria-label="Add Album" onClick={this.handleSubmit} ref={this.addAlbum} style={{ visibility: addVis }}>
          <i className="fas fa-plus" />
          {' '}
          Add album
        </button>
      </div>
    );
  }
}

AlbumSelect.defaultProps = {
  selections: [],
  focused: true,
  albumRange: {},
  inputWidth: '',
  addAlbum: () => {},
  clearError: () => {},
};

AlbumSelect.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  focused: PropTypes.bool,
  albumRange: PropTypes.objectOf(PropTypes.number),
  inputWidth: PropTypes.string,
  addAlbum: PropTypes.func,
  clearError: PropTypes.func,
};


export default AlbumSelect;
