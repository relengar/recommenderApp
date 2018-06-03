import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { MainPage, mapStateToProps } from '../../containers/mainPage';
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

function setup(isLoggedIn, alterPagination = {}, alterFetching = {}) {
    const pagination = Object.assign({
        companies: {offset: 0, limit: 2, count: 10},
        users: {offset: 0, limit: 2, count: 10}
    }, alterPagination);
    const isFetching = Object.assign({users: false,companies: false}, alterFetching);
    const props = {
        isFetching,
        userList: [
            {id: 1, name: 'Dude'},
            {id: 2, name: 'Another dude'},
        ],
        companies: [
            {id: 1, name: 'Test company 1'}, 
            {id: 2, name: 'Test company 2'}, 
        ],
        categories: [
            {id:1, name: 'IT'},
            {id:2, name: 'Builders'}
        ],
        dispatch: jest.fn(),
        isLoggedIn,
        pagination,
    }
    const enzymeWrapper = mount(<MemoryRouter><MainPage {...props}/></MemoryRouter>)
    return {
        props,
        enzymeWrapper
    }
}

describe('MainPage component', () => {
    it('Render container without user logged in', () => {
        const { enzymeWrapper, props } = setup(false);
        
        expect(enzymeWrapper.find('.btn-outline-primary').first().props().to).toBe('/app/user');
        expect(props.dispatch.mock.calls).toHaveLength(2);
    })
    it('Render container with user logged in', () => {
        const { enzymeWrapper, props } = setup(true);

        expect(enzymeWrapper.find('.btn-outline-primary').first().props().to).toBe('/app/company');
        expect(props.dispatch.mock.calls).toHaveLength(2);
    })
    it('Render paginated users', () => {
        const { enzymeWrapper, props } = setup(true);
        const userPagination = enzymeWrapper.find('Pagination').first();
        
        expect(userPagination.props().children).toHaveLength(props.userList.length);
        expect(userPagination.props().children[0].props.children.props.to).toBe('/app/user/1');
        userPagination.props().getItems({target: {id:1}})
        expect(props.dispatch.mock.calls).toHaveLength(3) //3 dispatches, because 2 are called on componentDidMount
    })
    it('Render paginated companies', () => {
        const { enzymeWrapper, props } = setup(true);
        const userPagination = enzymeWrapper.find('Pagination').last();
        
        expect(userPagination.props().children).toHaveLength(props.companies.length);
        expect(userPagination.props().children[0].props.children.props.to).toBe('/app/company/1');
        userPagination.props().getItems({target: {id:1}});
        expect(props.dispatch.mock.calls).toHaveLength(3); //3 dispatches, because 2 are called on componentDidMount
    })
    it('Render categories', () => {
        const { enzymeWrapper, props } = setup(true);

        expect(enzymeWrapper.find('a.nav-link')).toHaveLength(props.categories.length)
        enzymeWrapper.find('a.nav-link').first().props().onClick({target: {getAttribute: () => {return 'val'}}})
        expect(props.dispatch.mock.calls).toHaveLength(3);
    })
})

describe('MainPage mapStateToProps', () => {
    const stateObj = {
        user: {
            isFetching: false, 
            pagination: {offset: 0, limit: 2, count: 10}, 
            userList: [{name: 'user1', id:1}, {name: 'user2', id:2}]
        },
        company: {
            isFetching: false, 
            pagination: {offset: 0, limit: 2, count: 10}, 
            companies: [{name: 'company1', id:1}, {name: 'company2', id:2}]
        },
        access: {
            currentUser: {name: 'currentUser', id:1}
        }
    }
    it('Returns required props form state', () => {
        const props = mapStateToProps(stateObj);

        expect(props.pagination.users).toEqual(stateObj.user.pagination)
        expect(props.pagination.companies).toEqual(stateObj.company.pagination)
        expect(props.isFetching.users).toEqual(stateObj.user.isFetching)
        expect(props.isFetching.companies).toEqual(stateObj.company.isFetching)
        expect(props.isLoggedIn).toBe(true)
    })
    it('Returns required props form state - with logged out user', () => {
        const props = mapStateToProps(Object.assign({}, stateObj, {access: {currentUser: {}}}));

        expect(props.isLoggedIn).toBe(false)
    })
})
