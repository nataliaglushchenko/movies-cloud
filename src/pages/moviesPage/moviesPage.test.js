import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";

import MoviesPage from './moviesPage';
import Cloud from '../../components/cloud';
import SideBar from '../../components/sideBar';

configure({ adapter: new Adapter() });

describe('<MoviesPage />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <MoviesPage 
                onFetchMovies={() => {}} 
                movies={[]}
                isLoaded={false}
                isLoading={false}
                decades={[{ type: '', quantity: 0 }]}
                match={{ params: { mode: '', genre: ''} }}
                location={{}}
            />
        );
    });
    
    it('renders one Cloud element', () => {
        wrapper.setProps({ isLoaded: true, decades: [{ type: '', quantity: 0 }] });
        expect(wrapper.find(Cloud)).toHaveLength(1);
    })
    
    it('renders SideBar', () => {
        wrapper.setProps({ isLoaded: true });
        expect(wrapper.find(SideBar)).toHaveLength(1);
    });
});




