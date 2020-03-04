import React from 'react';
import { mount, shallow } from 'enzyme';
import axios from '../__mocks__/axios';
import AlbumSelect from './AlbumSelect';
import Menu from '../Menu';
import { allThirty } from '../../examples';
import artist1 from '../__fixtures__/artist1';
import noArtist from '../__fixtures__/noArtist';
import album1 from '../__fixtures__/album1';
import noAlbum from '../__fixtures__/noAlbum';

const search = (wrapper, isArtist, value, data) => {
  const form = isArtist ? 'artist' : 'album';
  wrapper.find(`#${form}-search`).simulate('change', { target: { value } });
  wrapper.update();
  axios.get.mockImplementationOnce(() => Promise.resolve(data));
  wrapper.find(`#${form}-form`).simulate('submit');
};

describe('AlbumSelect', () => {
  it('renders without crashing', () => {
    shallow(<AlbumSelect />);
  });
  describe('Artist search', () => {
    const wrapper = mount(<Menu />);
    it('makes call to artist API when user searches for artist', async () => {
      await search(wrapper, true, 'a', artist1);
      wrapper.update();
      expect(wrapper.find(AlbumSelect).state().newArtist)
        .toEqual(artist1.data.results.artistmatches.artist[0].name);
    });
    it('populates artist input with name of artist found', () => {
      expect(wrapper.find('#artist-search').props().value).toEqual('Arctic Monkeys');
    });
    it('shows album search field on successfully finding an artist', () => {
      expect(wrapper.find('#album-form').props().style.visibility).toEqual('visible');
    });
    it('hides album search field when artist input is changed', () => {
      wrapper.find('#artist-search').simulate('change', { target: { value: 'Arctic Monkey' } });
      wrapper.update();
      expect(wrapper.find('#album-form').props().style.visibility).toEqual('hidden');
      expect(wrapper.find('#form-submit').props().style.visibility).toEqual('hidden');
    });
    it('displays warning when artist is not found', async () => {
      await search(wrapper, true, '$', noArtist);
      wrapper.update();
      expect(wrapper.find('#artist-warning').text()).toEqual('Artist not found');
    });
    it('clears warning when user types', () => {
      wrapper.find('#artist-search').simulate('change', { target: { value: '$a' } });
      expect(wrapper.find('#artist-warning').text()).toEqual('');
    });
    wrapper.setState({ selections: allThirty });
    it('is disabled when maximum number of albums have been selected', () => {
      ['search', 'submit'].forEach((element) => {
        expect(wrapper.find(`#artist-${element}`).props().disabled).toEqual('disabled');
      });
    });
    it('displays warning when maximum number of albums have been selected', () => {
      wrapper.find('#artist-form').find('div').simulate('click');
      expect(wrapper.find('#artist-warning').text()).toEqual(`${wrapper.state().albumRange.max} albums already selected`);
    });
  });

  describe('Album search', () => {
    const wrapper = mount(<Menu />);

    it('makes call to artist API when user searches for artist', async () => {
      await search(wrapper, true, 'a', artist1);
      wrapper.update();
      await search(wrapper, false, 'a', album1);
      wrapper.update();
      expect(wrapper.find(AlbumSelect).state().newAlbum)
        .toEqual(album1.data.results.albummatches.album[0].name);
    });
    it('populates album input with name of album found', () => {
      expect(wrapper.find('#album-search').props().value).toEqual('AM');
    });
    it('shows form submit button on successfully finding an album', () => {
      expect(wrapper.find('#form-submit').props().style.visibility).toEqual('visible');
    });
    it('hides form submit button when album input is changed', () => {
      wrapper.find('#album-search').simulate('change', { target: { value: 'AMa' } });
      wrapper.update();
      expect(wrapper.find('#form-submit').props().style.visibility).toEqual('hidden');
    });
    it('displays warning when album is not found', async () => {
      await search(wrapper, false, 'l', noAlbum);
      wrapper.update();
      expect(wrapper.find('#album-warning').text()).toEqual('Album not found');
      expect(wrapper.find('#form-submit').props().style.visibility).toEqual('hidden');
    });
    it('displays warning when album has already been selected', async () => {
      await search(wrapper, true, 'a', artist1);
      wrapper.update();
      await search(wrapper, false, 'a', album1);
      wrapper.update();
      wrapper.find('#form-submit').simulate('click');
      await search(wrapper, true, 'a', artist1);
      wrapper.update();
      await search(wrapper, false, 'a', album1);
      wrapper.update();
      expect(wrapper.find('#album-warning').text()).toEqual('Album already selected');
      expect(wrapper.find('#form-submit').props().style.visibility).toEqual('hidden');
    });
    it('clears warning when user types', () => {
      wrapper.find('#album-search').simulate('change', { target: { value: 'AMa' } });
      expect(wrapper.find('#album-warning').text()).toEqual('');
    });
  });
});
