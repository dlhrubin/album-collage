import axios from './components/__mocks__/axios';
import artist1 from './components/__fixtures__/artist1';
import album1 from './components/__fixtures__/album1';
import album2 from './components/__fixtures__/album2';
import album3 from './components/__fixtures__/album3';

// Trigger artist or album API call/search event
export const search = (wrapper, isArtist, value, data) => {
  const form = isArtist ? 'artist' : 'album';
  wrapper.find(`#${form}-search`).simulate('change', { target: { value } });
  wrapper.update();
  axios.get.mockImplementationOnce(() => Promise.resolve(data));
  wrapper.find(`#${form}-form`).simulate('submit');
};

const addAlbum = (query, album) => (
  async (wrapper) => {
    await search(wrapper, true, 'a', artist1);
    wrapper.update();
    await search(wrapper, false, query, album);
    wrapper.update();
  }
);

export const addFirstAlbum = addAlbum('a', album1);
export const addSecondAlbum = addAlbum('w', album2);
export const addThirdAlbum = addAlbum('tr', album3);
