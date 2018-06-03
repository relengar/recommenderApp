import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import ReviewItem from '../../components/reviewItem';

Enzyme.configure({ adapter: new Adapter() });

function setup(displayComments=true, canBeCommented=true) {
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
        canBeCommented,
        displayComments,
        submitComment: jest.fn()
    }
        submitComment: jest.fn()
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
    expect(enzymeWrapper.find('div.w-50')).toHaveLength(1)
  })
  it('Render component with displayed comments and edit disabled', () => {
    const { enzymeWrapper, props } = setup(true, false)

    expect(enzymeWrapper.find('button')).toHaveLength(0)
  })
  it('Render component with comments view disabled', () => {
    const { enzymeWrapper, props } = setup(false)

    expect(enzymeWrapper.find('div.w-50')).toHaveLength(0)
  })
})