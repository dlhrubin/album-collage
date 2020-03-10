import React from 'react';
import { mount, shallow } from 'enzyme';
import { addFirstAlbum, addSecondAlbum } from '../../testUtils';
import SelectionBox from './SelectionBox';
import Menu from '../Menu';

const testSelection = (wrapper, selectionState, ind) => {
  const selections = wrapper.find('#selections').find('.selection');
  expect(selections.length).toEqual(ind + 1);
  // Check that correct album cover thumbnail, album title, and artist are displayed
  expect(selections.at(ind).find('img').props().src).toEqual(selectionState.thumbnail);
  expect(selections.at(ind).find('span').text()).toEqual(`${selectionState.album} (${selectionState.artist})`);
};

const addSelection = async (wrapper, albumFunc, ind) => {
  await albumFunc(wrapper);
  wrapper.find('#form-submit').simulate('click');
  testSelection(wrapper, wrapper.state().selections[ind], ind);
};

describe('SelectionBox', () => {
  it('renders without crashing', () => {
    shallow(<SelectionBox />);
  });
  const wrapper = mount(<Menu />);
  it('populates with albums as they are submitted', async () => {
    addSelection(wrapper, addFirstAlbum, 0);
  });
  it('displays selections in order of album additions', async () => {
    addSelection(wrapper, addSecondAlbum, 1);
  });
  it('deletes album from selection box on clicking x button', async () => {
    const secondAlbumState = wrapper.state().selections[1];
    wrapper.find('#selections').find('.selection').at(0).find('button')
      .simulate('click');
    wrapper.update();
    // Album that wasn't deleted should be displayed as first selection in the box
    testSelection(wrapper, secondAlbumState, 0);
    // Try adding album back to test that it was sucessfully deleted from the app
    await addFirstAlbum(wrapper);
    expect(wrapper.find('#album-warning').text()).toEqual('');
    expect(wrapper.find('#form-submit').props().style.visibility).toEqual('visible');
  });
});
