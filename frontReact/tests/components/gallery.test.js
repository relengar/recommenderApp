import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Gallery } from '../../components/gallery';

Enzyme.configure({ adapter: new Adapter() });

const pictures = [
    'testPic1.jpg',
    'testPic2.jpg'
]

function setup(editable = true) {
    const props = {
        dispatch: jest.fn(),
        editable,
        companyId: 1,
        pictures,
    }
    const enzymeWrapper = mount(<Gallery {...props}/>)
    return {
        props,
        enzymeWrapper
    }
}

describe('Gallery  component', () => {
    it('Render a editable gallery', () => {
        const { enzymeWrapper, props } = setup();

        expect(enzymeWrapper.find('img')).toHaveLength(2)
        enzymeWrapper.find('a').last().simulate('click')
        expect(props.dispatch.mock.calls.length).toBe(1)
    })
    it('Render a non editable gallery', () => {
        const { enzymeWrapper, props } = setup(false);

        expect(enzymeWrapper.find('img')).toHaveLength(2)
        expect(enzymeWrapper.find('a')).toHaveLength(0)
    })
})