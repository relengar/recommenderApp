import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import FormInput from '../../components/formInput';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        type: 'text',
        label: 'Test input',
        id: 'testInput',
        value: 'meh',
        onChange: jest.fn(),
    }
    const enzymeWrapper = shallow(<FormInput {...props} />)
    return {
        props,
        enzymeWrapper
    }
}
describe('FormInput component', () => {
    it('Render Form input', () => {
        const { enzymeWrapper, props } = setup();
        const input = enzymeWrapper.find('input');

        expect(enzymeWrapper.find(`input#${props.id}`)).toHaveLength(1)
        expect(enzymeWrapper.find('label').text()).toBe(props.label)
        expect(input.props().value).toBe(props.value)
        expect(input.props().type).toBe(props.type)
        input.props().onChange('')
        expect(props.onChange.mock.calls.length).toBe(1)
    })
})
