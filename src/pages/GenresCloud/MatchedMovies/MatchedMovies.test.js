import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";

import MatchedMovies from './MatchedMovies';
import Cloud from '../../../components/Cloud';

configure({adapter: new Adapter()});

describe('<MatchedMovies />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MatchedMovies onFetchMovies={() => {}} />);
    });
    
    it('renders one <Cloud /> element', () => {
        expect(wrapper.find(Cloud)).toHaveLength(1);
    })
    
    it('renders one Layout element', function() {
        expect(wrapper.find('.Layout')).toHaveLength(1);
      });

    it('renders a sidebar with classes .Sidebar and .Hidden', () => {
        wrapper.setProps({showSidebar: false});
        expect(wrapper.exists('.Sidebar.Hidden')).toEqual(true);
    });
});




