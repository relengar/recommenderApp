import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { LoginContainer } from '../../containers/loginContainer';

Enzyme.configure({ adapter: new Adapter() });

function setup(alterations) {
    const props = Object.assign({}, {
        loggedUser: {
            id: 1,
            name: 'testUser'
        },
        isFetching: false,
        dispatch: jest.fn(),
        userError: null
    }, alterations);
    const enzymeWrapper = mount(<LoginContainer {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('LoginContainer container', () => {
    it('Render loading screen', () => {
        const { enzymeWrapper } = setup({isFetching: true});

        expect(enzymeWrapper.find('header div p').children()).toHaveLength(0)
    })
    it('User is logged in', () => {
        const { enzymeWrapper, props } = setup();

        expect(enzymeWrapper.find('h4').text()).toBe(`Welcome ${props.loggedUser.name}`);
        enzymeWrapper.find('button').simulate('click');
        expect(props.dispatch.mock.calls).toHaveLength(1);
    })
    it('No user is logged in', () => {
        const { enzymeWrapper, props } = setup({loggedUser: {}});

        expect(enzymeWrapper.find('input')).toHaveLength(2);
        enzymeWrapper.find('#username').simulate('change', {target: {id: 'username', value: 'usernameTest'}})
        expect(enzymeWrapper.state('username')).toBe('usernameTest')
        enzymeWrapper.find('form').simulate('submit')
        expect(props.dispatch.mock.calls).toHaveLength(1);
    })
    it('Display Error', () => {
        const { enzymeWrapper, props } = setup({userError: 'Not enough minerals!', loggedUser: null});

        expect(enzymeWrapper.find('span.alert')).toHaveLength(1)
    })
})