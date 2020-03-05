import axios from './components/__mocks__/axios';
import artist1 from './components/__fixtures__/artist1';
import album1 from './components/__fixtures__/album1';
import album2 from './components/__fixtures__/album2';

// Trigger artist or album API call/search event
export const search = (wrapper, isArtist, value, data) => {
  const form = isArtist ? 'artist' : 'album';
  wrapper.find(`#${form}-search`).simulate('change', { target: { value } });
  wrapper.update();
  axios.get.mockImplementationOnce(() => Promise.resolve(data));
  wrapper.find(`#${form}-form`).simulate('submit');
};

export const addFirstAlbum = async (wrapper) => {
  await search(wrapper, true, 'a', artist1);
  wrapper.update();
  await search(wrapper, false, 'a', album1);
  wrapper.update();
};

export const addSecondAlbum = async (wrapper) => {
  await search(wrapper, true, 'a', artist1);
  wrapper.update();
  await search(wrapper, false, 'w', album2);
  wrapper.update();
};
