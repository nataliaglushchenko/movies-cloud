import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";

import Cloud from '../../components/cloud';
import GenresPage from './genresPage';
import { Spinner } from 'reactstrap';

configure({adapter: new Adapter()});

describe('<GenresPage />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <GenresPage 
                onFetchRules={() => {}} 
                isLoading={false} 
                isLoaded={false}
                onSelectSearchMode={() => {}}
                searchMode={'searchByAllGenres'}
                genres={[]}
            />
        );
    });

    it('renders one <Cloud /> element if rules loaded', () => {
        wrapper.setProps({ isLoaded: true });
        expect(wrapper.find(Cloud)).toHaveLength(1);
    });

    it('renders <Spinner /> element when loading', () => {
        wrapper.setProps({ isLoading: true });
        expect(wrapper.contains(<Spinner />)).toEqual(true);
    });
});
