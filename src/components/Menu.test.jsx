import React from 'react';
import { mount, shallow } from 'enzyme';
import { addFirstAlbum, addSecondAlbum, addThirdAlbum } from '../testUtils';
import App from '../App';
import Menu from './Menu';

describe('Menu', () => {
  it('renders without crashing', () => {
    shallow(<Menu />);
  });
  const wrapper = mount(<App />);
  const minAlbums = wrapper.find(Menu).state().albumRange.min;
  it('throws error when minimum number of album selections have not been selected', async () => {
    await addFirstAlbum(wrapper);
    wrapper.find('#form-submit').simulate('click');
    wrapper.find('#collage-submit').simulate('click');
    expect(wrapper.state().submitted).toEqual(false);
    expect(wrapper.find('#collage-warning').text()).toEqual(`Please select at least ${minAlbums} albums`);
  });
  it('hides error message when album selection is deleted', () => {
    wrapper.find('#selections').find('.selection').at(0).find('button')
      .simulate('click');
    expect(wrapper.find('#collage-warning').text()).toEqual('');
  });
  it('hides error message when user types in album selection box', () => {
    wrapper.find('#collage-submit').simulate('click');
    expect(wrapper.find('#collage-warning').text()).toEqual(`Please select at least ${minAlbums} albums`);
    wrapper.find('#artist-search').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('#collage-warning').text()).toEqual('');
  });
  it('throws error when user has not selected shape', async () => {
    await addFirstAlbum(wrapper);
    wrapper.find('#form-submit').simulate('click');
    await addSecondAlbum(wrapper);
    wrapper.find('#form-submit').simulate('click');
    wrapper.find('#collage-submit').simulate('click');
    expect(wrapper.state().submitted).toEqual(false);
    expect(wrapper.find('#collage-warning').text()).toEqual('Please select a collage shape');
  });
  it('hides select shape error when shape is clicked', () => {
    wrapper.find('#shapes').find('.shape-btn').simulate('click');
    expect(wrapper.find('#collage-warning').text()).toEqual('');
  });
  it('throws error when there is no collage shape for number of albums selected', async () => {
    await addThirdAlbum(wrapper);
    wrapper.find('#form-submit').simulate('click');
    wrapper.find('#collage-submit').simulate('click');
    expect(wrapper.state().submitted).toEqual(false);
    expect(wrapper.find('#collage-warning').text()).toEqual('No shape for this number of albums');
  });
  it('submits collage and hides menu if all requirements are met', async () => {
    wrapper.find('#selections').find('.selection').at(2).find('button')
      .simulate('click');
    wrapper.find('#shapes').find('.shape-btn').simulate('click');
    // Search for third album to test that search bars reset on submit later
    await addThirdAlbum(wrapper);
    wrapper.find('#collage-submit').simulate('click');
    expect(wrapper.state().submitted).toEqual(true);
    expect(wrapper.find('#menu-panel').props().style.display).toEqual('none');
  });
  it('clears all warnings when collage is submitted', () => {
    wrapper.find('.warning').forEach((warn) => expect(warn.text()).toEqual(''));
  });
  it('resets menu and disables search when collage is submitted', async () => {
    expect(wrapper.find('#artist-search').props().value).toEqual('');
    expect(wrapper.find('#artist-search').props().disabled).toBeTruthy();
    expect(wrapper.find('#artist-submit').props().disabled).toBeTruthy();
    expect(wrapper.find('#selections').find('.selection').length).toEqual(0);
    expect(wrapper.find('#shapes').find('.shape-btn').length).toEqual(0);
  });
});
