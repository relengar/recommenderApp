import * as user from '../../actions/user';
import configureMockStore from 'redux-mock-store'
import MockAdapter  from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockServer = new MockAdapter(axios);

describe('User actions', () => {
    it('Start request', () => {
        const action = {
            type: 'USER_REQUEST_START'
        }
        expect(user.requestStart()).toEqual(action);
    })
    it('Fail request', () => {
        const action = {
            type: 'USER_REQUEST_FAIL'
        }
        expect(user.requestFail()).toEqual(action)
    })
    it('Set userlist', () => {
        const users = [];
        const pagination = {limit:1, offset:1};
        const action = {
            type: 'USERLIST_SET',
            users,
            pagination
        }
        expect(user.setUserList(users, pagination)).toEqual(action)
    })
    it('Set user', () => {
        const userObj = {name: "Dude"}
        const action = {
            type: 'USER_SET',
            user: userObj
        }
        expect(user.setUser(userObj)).toEqual(action)
    })
})

describe('User actions hitting server', () => {
    const userObj = {
        name : 'testUser',
        email: 'testUser@gmail.com',
        id: 1
    }
    afterEach((() => {
        mockServer.reset();
    }))
    it('Get user list from server', () => {
        const store = mockStore({});
        const pagination = {limit:1, offset:1};
        const users = [{name: "Dude"}]
        const dispActions = [
            {type: 'USER_REQUEST_START'},
            {type: 'USERLIST_SET', users, pagination}
        ];
        mockServer.onGet('/user/all?offset=1&limit=1',).reply(200, {
            rows: users,
            pagination
        })

        return store.dispatch(user.getUserList(pagination.offset, pagination.limit)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Create new user', () => {
        const store = mockStore({});
        const dispActions = [
            {type: 'USER_REQUEST_START'},
            {type: 'ACCESS_SET', user: userObj},
            {type: 'USER_SET', user: userObj}
        ];
        
        mockServer.onPut('/user').reply(200, userObj)
    
        return store.dispatch(user.createUser(Object.assign(userObj, {password: '12345abcd'}))).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Updates existing user', () => {
        const store = mockStore({});
        const dispActions = [
            {type: 'USER_REQUEST_START'},
            {type: 'USER_SET', user: userObj}
        ];

        mockServer.onPost('/user/update').reply(200, userObj);

        return store.dispatch(user.updateUser(userObj)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Get user', () => {
        const store = mockStore({});
        const dispActions = [
            {type: 'USER_REQUEST_START'},
            {type: 'USER_SET', user: userObj}
        ];

        mockServer.onGet(`/user/${userObj.id}`).reply(200, userObj);

        return store.dispatch(user.getUser(1)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Delete user', () => {
        const store = mockStore({});
        const dispActions = [
            {type: 'USER_REQUEST_START'},
            {type: 'USER_SET', user: {}},
            {type: 'ACCESS_SET', user: null}
        ];

        mockServer.onDelete('/user').reply(200, {});

        return store.dispatch(user.deleteUser(1)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
})

