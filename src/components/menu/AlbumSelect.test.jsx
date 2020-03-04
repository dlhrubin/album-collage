import React from 'react';
import { mount, shallow } from 'enzyme';
import axios from '../__mocks__/axios';
import App from '../../App';
import AlbumSelect from './AlbumSelect';
import artist1 from '../__fixtures__/artist1';

describe('AlbumSelect', () => {
  it('renders without crashing', () => {
    shallow(<AlbumSelect />);
  });
  const wrapper = mount(<App />);
  wrapper.find('#artist-search').simulate('change', { target: { value: 'a' } });
  console.log(wrapper.find('#artist-search').props().value);
  axios.get.mockImplementationOnce(artist1);
  const albumWrapper = shallow(<AlbumSelect />);
  wrapper.find('#artist-form').simulate('submit');
  it('makes call to artist API when user searches for artist', () => {
    console.log(albumWrapper.state().newArtist);
  });
});
