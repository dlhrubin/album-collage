import React from 'react';
import { mount, shallow } from 'enzyme';
import { addFirstAlbum, addSecondAlbum, addThirdAlbum } from '../../testUtils';
import ShapeSelect from './ShapeSelect';
import Menu from '../Menu';

describe('ShapeSelect', () => {
    it('renders without crashing', () => {
      shallow(<ShapeSelect />);
    });
    const wrapper = mount(<Menu />);
    it('displays nothing when no albums have been selected', () => {
        expect(wrapper.find("#shapes").find(".shape-btn").length).toEqual(0)
    })
    it('displays 1 shape (diamond) when 2 albums are selected', async () => {
        await addFirstAlbum(wrapper);
        wrapper.find('#form-submit').simulate('click');
        await addSecondAlbum(wrapper);
        wrapper.find('#form-submit').simulate('click');
        expect(wrapper.find("#shapes").find(".shape-btn").length).toEqual(1)
        expect(wrapper.find("#shapes").find(".shape-btn").props().name).toEqual("diamond")
    });
    it('stores selected shape name on click', () => {
        wrapper.find("#shapes").find(".shape-btn").simulate("click")
        expect(wrapper.state().shape).toEqual("diamond")
    })
    it('deselects shape on clicking again', () => {
        wrapper.find("#shapes").find(".shape-btn").simulate("click")
        expect(wrapper.state().shape).toEqual("")        
    })
    it('deselects and removes shape button when album selection changes', async () => {
        // Remove album
        wrapper.find("#shapes").find(".shape-btn").simulate("click")
        wrapper.find('#selections').find('.selection').at(1).find('button').simulate('click');
        expect(wrapper.state().shape).toEqual("");
        expect(wrapper.find("#shapes").find(".shape-btn").length).toEqual(0);
        // Add album
        await addSecondAlbum(wrapper);
        wrapper.find('#form-submit').simulate('click');
        wrapper.find("#shapes").find(".shape-btn").simulate("click")
        expect(wrapper.state().shape).toEqual("diamond");
        await addThirdAlbum(wrapper);
        wrapper.find('#form-submit').simulate('click');
        expect(wrapper.state().shape).toEqual("");
        expect(wrapper.find("#shapes").find(".shape-btn").length).toEqual(0);
    })
});