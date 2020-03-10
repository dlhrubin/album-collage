import React from 'react';
import { mount, shallow } from 'enzyme';
import { addFirstAlbum, addSecondAlbum, addThirdAlbum } from '../testUtils';
import App from '../App';
import Collage from './Collage';

const checkCollageOrder = (wrapper, shuffled, album2 = 'Tranquility Base Hotel & Casino, Arctic Monkeys') => {
  const images = wrapper.find('#collage-grid').find('img');
  const album1 = 'AM, Arctic Monkeys';
  expect(images.at(0).props().alt).toEqual(shuffled ? album2 : album1);
  expect(images.at(1).props().alt).toEqual(shuffled ? album1 : album2);
  expect(images.at(2).props().alt).toEqual(shuffled ? album1 : album2);
  expect(images.at(3).props().alt).toEqual(shuffled ? album2 : album1);
};

const swapAlbum = async (wrapper, button) => {
  wrapper.find('#selections').find('.selection').at(1).find('button')
    .simulate('click');
  // Change second album
  await addThirdAlbum(wrapper);
  wrapper.find('#form-submit').simulate('click');
  wrapper.find('#shapes').find('.shape-btn').simulate('click');
  wrapper.find(button).simulate('click');
};

describe('Collage', () => {
  it('renders without crashing', () => {
    shallow(<Collage />);
  });
  const wrapper = mount(<App />);
  it('disables all collage editing buttons when focused on menu', () => {
    wrapper.find('#edit-dock').find('.search-submit').forEach((btn) => {
      expect(btn.props().disabled).toBeTruthy();
    });
  });
  it('displays collage when collage is submitted', async () => {
    await addFirstAlbum(wrapper);
    wrapper.find('#form-submit').simulate('click');
    await addSecondAlbum(wrapper);
    wrapper.find('#form-submit').simulate('click');
    wrapper.find('#shapes').find('.shape-btn').simulate('click');
    wrapper.find('#collage-submit').simulate('click');
    expect(wrapper.find('#collage-grid').find('div').length).toBeGreaterThan(0);
    checkCollageOrder(wrapper, false, "Whatever People Say I Am, That's What I'm Not, Arctic Monkeys");
  });
  it('enables all collage editing buttons when collage is submitted', () => {
    wrapper.find('#edit-dock').find('.search-submit').forEach((btn) => {
      expect(btn.props().disabled).toBeFalsy();
    });
  });
  it('jumps to menu panel in editing mode when edit button is clicked', () => {
    wrapper.find('#edit-collage').simulate('click');
    expect(wrapper.find('#collage-panel').props().style.display).toEqual('none');
    expect(wrapper.find('#menu-panel').props().style.display).toEqual('');
    const selections = wrapper.find('#selections').find('.selection');
    expect(selections.length).toEqual(2);
    expect(selections.at(0).find('span').text()).toEqual('AM (Arctic Monkeys)');
    expect(selections.at(1).find('span').text()).toEqual("Whatever People Say I Am, That's What I'm Not (Arctic Monkeys)");
    expect(wrapper.find('#shapes').find('.shape-btn').props().name).toEqual('diamond');
  });
  it('disables all collage editing buttons but the edit button when in editing mode', () => {
    expect(wrapper.find('#edit-collage').props().disabled).toBeFalsy();
    ['#shuffle-collage', '#reset-collage', '#delete-collage'].forEach((btn) => {
      expect(wrapper.find(btn).props().disabled).toBeTruthy();
    });
  });
  it('does not save changes if edit button is clicked again', async () => {
    await swapAlbum(wrapper, '#edit-collage');
    checkCollageOrder(wrapper, false, "Whatever People Say I Am, That's What I'm Not, Arctic Monkeys");
  });
  it('saves changes if Submit/Save Edits button is clicked', async () => {
    wrapper.find('#edit-collage').simulate('click');
    await swapAlbum(wrapper, '#collage-submit');
    checkCollageOrder(wrapper, false);
  });
  it('shuffles collage when shuffle button is clicked', () => {
    wrapper.find('#shuffle-collage').simulate('click');
    checkCollageOrder(wrapper, true);
    wrapper.find('#shuffle-collage').simulate('click');
    checkCollageOrder(wrapper, false);
  });
  it('resets collage to original order when reset button is clicked', () => {
    wrapper.find('#shuffle-collage').simulate('click');
    checkCollageOrder(wrapper, true);
    wrapper.find('#reset-collage').simulate('click');
    checkCollageOrder(wrapper, false);
    wrapper.find('#reset-collage').simulate('click');
    checkCollageOrder(wrapper, false);
  });
  it('deletes collage and jumps to menu panel when delete button is clicked', () => {
    wrapper.find('#delete-collage').simulate('click');
    expect(wrapper.find('#collage-grid').find('.album-tile').length).toEqual(0);
    expect(wrapper.find('#collage-panel').props().style.display).toEqual('none');
    expect(wrapper.find('#menu-panel').props().style.display).toEqual('');
    // Menu panel should be empty
    expect(wrapper.find('#selections').find('.selection').length).toEqual(0);
    expect(wrapper.find('#shapes').find('.shape-btn').length).toEqual(0);
  });
});
