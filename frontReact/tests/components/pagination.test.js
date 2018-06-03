import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '../../components/pagination';

Enzyme.configure({ adapter: new Adapter() });

const paginationNxtOnly = {offset: 0, limit: 2, count: 10}
const paginationPrevOnly = {offset: 10, limit: 2, count: 10}
const paginationAllLinks = {offset: 2, limit: 2, count: 10}
const paginationNoLinks = {offset: 0, limit: 0, count: 0}

function setup(pagination, isFetching=false) {
    const props = {
        children: [<div key={1}>1</div>, <div key={2}>2</div>],
        pagination,
        getItems: jest.fn(),
        isFetching: isFetching
    }
    const enzymeWrapper = shallow(<Pagination {...props} />)
    return {
        props,
        enzymeWrapper
    }
}

describe('Pagination component', () => {
    it('Renders pagination with children', () => {
        const { enzymeWrapper, props } = setup(paginationNxtOnly);

        expect(enzymeWrapper.find('div.modal-body').children()).toHaveLength(2);
        enzymeWrapper.find('a#next').props().onClick()
        expect(props.getItems.mock.calls.length).toBe(1)

    })
    it('Renders loading screen', () => {
        const { enzymeWrapper, props } = setup(paginationNxtOnly, true);

        expect(enzymeWrapper.find('div.modal-body')).toHaveLength(0);
    })
    it('Render no links', () => {
        const { enzymeWrapper, props } = setup(paginationNoLinks);

        expect(enzymeWrapper.find('a#prev')).toHaveLength(0)
        expect(enzymeWrapper.find('a#next')).toHaveLength(0)
    })
    it('Render previous link only', () => {
        const { enzymeWrapper } = setup(paginationPrevOnly);

        expect(enzymeWrapper.find('a#prev')).toHaveLength(1)
        expect(enzymeWrapper.find('a#next')).toHaveLength(0)
    })
    it('Render next link only', () => {
        const { enzymeWrapper } = setup(paginationNxtOnly);

        expect(enzymeWrapper.find('a#prev')).toHaveLength(0)
        expect(enzymeWrapper.find('a#next')).toHaveLength(1)
    })
    it('Render all links', () => {
        const { enzymeWrapper } = setup(paginationAllLinks);

        expect(enzymeWrapper.find('a#prev')).toHaveLength(1)
        expect(enzymeWrapper.find('a#next')).toHaveLength(1)
    })
})
