import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import FormSelect from '../../components/formSelect';

Enzyme.configure({ adapter: new Adapter() });

const complex = {
    valueAttr: 'value',
    nameAttr: 'name',
    data: [
        {value: 1, name: 'One'},
        {value:2, name: 'Two'}
    ]
}
const props = {
    id: 'select',
    data: ['1','2'],
    onChange: jest.fn(),
    value: 'iniVal',
    label: 'Select'
}

describe('FormSelect component', () => {
    it('Render form select simple values', () => {
        const enzymeWrapper = shallow(<FormSelect {...props} />)

        expect(enzymeWrapper.find('label').text()).toEqual(props.label)
        expect(enzymeWrapper.find('option')).toHaveLength(3)
        expect(enzymeWrapper.find('option').last().props().value).toBe('2')
        expect(enzymeWrapper.find('option').last().text()).toBe('2');
    })
    it('Render form select complex values', () => {
        const enzymeWrapper = shallow(<FormSelect {...Object.assign({}, props, complex)} />)

        expect(enzymeWrapper.find('option')).toHaveLength(3)
        expect(enzymeWrapper.find('option').last().props().value).toBe(2)
        expect(enzymeWrapper.find('option').last().text()).toBe('Two')
    })
})