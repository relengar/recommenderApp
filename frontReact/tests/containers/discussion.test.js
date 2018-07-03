import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Discussion } from '../../containers/discussion';

Enzyme.configure({ adapter: new Adapter() });

function setup(alterations) {
    const props = Object.assign({}, {
        reviews: [],
        companyId: 1,
        currentUser: null,
        currentReview: null,
        pagination: {
            reviews: {offset: 0, limit: 2, count: 10}, 
            comments: {offset: 0, limit: 2, count: 10}
        },
        dispatch: jest.fn(),
        isFetching: false,
        error: null
    }, alterations);
    const enzymeWrapper = shallow(<Discussion {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('Discussion container', () => {
    it('Render discussion with reviews', () => {
        const { enzymeWrapper, props } = setup({reviews: [{id:1, content: 'meh'}, {id:2, content: 'test'}]});

        expect(enzymeWrapper.find('Pagination')).toHaveLength(1);
        expect(enzymeWrapper.find('Pagination').props().children).toHaveLength(2);
        expect(enzymeWrapper.find('form')).toHaveLength(0);
        enzymeWrapper.find('ReviewItem').first().props().toggleView();
        expect(props.dispatch.mock.calls).toHaveLength(1);
        enzymeWrapper.find('Pagination').props().getItems({target: 'next'}, 'reviews')
        expect(props.dispatch.mock.calls).toHaveLength(2);
    })
    it('Render discussion with comments', () => {
        const { enzymeWrapper, props } = setup({currentUser: {id: 1, name: 'testUser'}, currentReview: {id: 1, content: 'test', comments: [{id:1, content: 'ok'}]}});

        expect(enzymeWrapper.find('ReviewItem')).toHaveLength(1);
        enzymeWrapper.find('#content').simulate('change', {target: {id: 'content', value: 'data'}});
        enzymeWrapper.find('form').simulate('submit', {preventDefault: () => {}})
        expect(props.dispatch.mock.calls[0][0].type).not.toBe('DISCUSSION_REQUEST_FAIL')        
    })
    it('Submit new review with logged in user', () => {
        const { enzymeWrapper, props } = setup({reviews: [{id:1, content: 'meh'}], currentUser: {id: 1, name: 'testUser'}});
        const form = enzymeWrapper.find('form');

        expect(enzymeWrapper.find('form')).toHaveLength(1)
        
        form.simulate('submit', {preventDefault: () => {}})
        expect(props.dispatch.mock.calls).toHaveLength(1);
        expect(props.dispatch.mock.calls[0][0].type).toBe('DISCUSSION_REQUEST_FAIL')

        enzymeWrapper.find('#content').simulate('change', {target: {id: 'content', value: 'data'}});
        enzymeWrapper.find('#rating').simulate('change', {target: {id: 'rating', value: 8}});
        form.simulate('submit', {preventDefault: () => {}})
        expect(props.dispatch.mock.calls[1][0].type).not.toBe('DISCUSSION_REQUEST_FAIL')
    })
})