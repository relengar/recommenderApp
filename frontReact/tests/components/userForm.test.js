import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import UserForm from '../../components/userForm';

Enzyme.configure({ adapter: new Adapter() });
const user = {
    name: 'testUser',
    firstName: 'test',
    lastName: 'user',
    email: 'test.user@gmail.com'
}

function setup(isNew) {
    const props = {
        user,
        submitUser: jest.fn(),
        deleteUser: jest.fn(),
        isNew,
        error: null
    }
    const enzymeWrapper = mount(<UserForm {...props} />)
    return {
        props,
        enzymeWrapper
    }
}

describe('UserForm component', () => {
    it('Render for new user', () => {
        const { enzymeWrapper } = setup(true);
        
        expect(enzymeWrapper.find('input#password').length).toEqual(1)
        expect(enzymeWrapper.find('span.alert').length).toEqual(0)
        expect(enzymeWrapper.find('h1').text()).not.toContain(user.name)
        expect(enzymeWrapper.find('div.modal-footer').children().length).toEqual(1)
    })
    it('Render for user update', () => {
        const { enzymeWrapper } = setup(false);

        expect(enzymeWrapper.find('input#password').length).toEqual(0)
        expect(enzymeWrapper.find('h1').text()).toContain(user.name)
        expect(enzymeWrapper.find('div.modal-footer').children().length).toEqual(2)
    })
    it('Create new user matching passwords', () => {
        const { enzymeWrapper, props } = setup(true);

        enzymeWrapper.setState({password: 'testpassw', retypePassword: 'testpassw'})
        enzymeWrapper.find('form').simulate('submit')
        expect(props.submitUser.mock.calls.length).toBe(1);
        expect(enzymeWrapper.find('alert').length).toEqual(0);
    })
    it('Create new user not matching passwords', () => {
        const { enzymeWrapper, props } = setup(true);

        enzymeWrapper.setState({password: 'testpassw', retypePassword: 'anotherpassw'})
        enzymeWrapper.find('form').simulate('submit');
        expect(props.submitUser.mock.calls.length).toBe(0);
        expect(enzymeWrapper.state('error')).toBeDefined();
    })
})