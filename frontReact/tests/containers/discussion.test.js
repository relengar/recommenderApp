import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Discussion } from '../../containers/discussion';

Enzyme.configure({ adapter: new Adapter() });

function setup(alterations) {
    const props = Object.assign({}, {
        reviews: [],
        paginatiom: {offset: 0, limit: 2, count: 10},
        getItems: jest.fn(),
        isFetching: false
    }, alterations);
    const enzymeWrapper = shallow(<Discussion {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('Discussion container', () => {
    it('Display loading screen', () => {
        const { enzymeWrapper } = setup({isFetching: true});

        expect(enzymeWrapper.find('div').children()).toHaveLength(1);
    })
})