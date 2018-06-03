import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { UserContainer } from '../../containers/userContainer';

Enzyme.configure({ adapter: new Adapter() });

function setup(alterations) {
    const props = Object.assign({}, {
        dispatch: jest.fn(),
        isFetching: false,
        user: {
            id: 1,
            name: "viewedUser"
        },
        error: null,
        currentUser: {},
        urlId: '1'
    }, alterations)
    const enzymeWrapper = shallow(<UserContainer {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('UserContainer container', () => {
    it('Display loading screen', () => {
        const { enzymeWrapper } = setup({isFetching: true});

        expect(enzymeWrapper.find('section#main').children()).toHaveLength(1);
    })
    it('Edit user profile', () => {
        const { enzymeWrapper, props } = setup({currentUser: {id: 1, name: 'viewedUser'}});

        expect(enzymeWrapper.find('UserForm')).toHaveLength(1);
        expect(enzymeWrapper.find('UserForm').props().isNew).toBe(false);
        expect(enzymeWrapper.props().submitUser.name).toBe('bound updateUser');
        enzymeWrapper.find('UserForm').props().submitUser();
        expect(props.dispatch.mock.calls).toHaveLength(2);
    })
    it('Create new user', () => {
        const { enzymeWrapper, props } = setup({currentUser: null, urlId: null});

        expect(enzymeWrapper.find('UserForm')).toHaveLength(1);
        expect(enzymeWrapper.find('UserForm').props().isNew).toBe(true);
        expect(enzymeWrapper.props().submitUser.name).toBe('bound registerNewUser');
        enzymeWrapper.find('UserForm').props().submitUser();
        expect(props.dispatch.mock.calls).toHaveLength(2);
    })
    it('View user profile', () => {
        const { enzymeWrapper, props } = setup({});

        expect(enzymeWrapper.find('ViewDataFields')).toHaveLength(1);
        expect(enzymeWrapper.find('ViewDataFields').props().dataArr).toEqual([{label: 'name', value: props.user.name}])
    })
})