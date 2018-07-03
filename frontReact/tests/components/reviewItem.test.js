import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import ReviewItem from '../../components/reviewItem';

Enzyme.configure({ adapter: new Adapter() });

function setup(displayComments=true) {
    const props = {
        review: {
            id: 1,
            rating: 5,
            content: 'Meh',
            reviewer: {
                id: 2,
                name: 'Dude'
            },
            comments: [
                {
                    id: 3,
                    content: 'Nah',
                    commentingUser: {
                        id: 4,
                        name: 'anotherDude'
                    }
                }
            ]
        },
        pagination: {offset: 0, limit: 2, count: 10},
        displayComments,
        getItems: jest.fn(),
        toggleView: jest.fn(),
        isFetching: false
    }

    const enzymeWrapper = shallow(<ReviewItem {...props}/>)
    return {
        props,
        enzymeWrapper
    }
}

describe('ReviewItem component', () => {
  it('Render component', () => {
    const { enzymeWrapper, props } = setup()

    expect(enzymeWrapper.find('NavLink').first().props().to).toBe(`/app/user/${props.review.reviewer.id}`)
    expect(enzymeWrapper.find('button')).toHaveLength(1)
    expect(enzymeWrapper.find('Pagination')).toHaveLength(1)
    enzymeWrapper.find('button').simulate('click', {preventDefault: () => {}})
    expect(props.toggleView.mock.calls).toHaveLength(1);
  })
  it('Render component without comments', () => {
    const { enzymeWrapper } = setup(false)

    expect(enzymeWrapper.find('Pagination')).toHaveLength(0)
  })
  it('Render component with comments', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('div.card')).toHaveLength(2);
    expect(enzymeWrapper.find('Pagination').props().children).toHaveLength(1);
  })
})