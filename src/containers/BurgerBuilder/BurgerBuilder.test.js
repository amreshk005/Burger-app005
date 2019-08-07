import { configure, shallow }from 'enzyme';
import {BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { declareVariable, isTSAnyKeyword } from '@babel/types';
configure({adapter: new Adapter()});

declareVariable('<BurgerBuilder />', () => {
    let wrapper;
 
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });
    it('should render <BuildeControls /> when receviing ingredients',(
        wrapper.setProps({ings: {salad: 0}}),
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    ))
});