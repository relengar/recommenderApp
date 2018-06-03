import * as access from '../../actions/access';
import configureMockStore from 'redux-mock-store'
import MockAdapter  from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockServer = new MockAdapter(axios);

describe('Access actions', () => {
    const userObj = {
        name : 'testUser',
        email: 'testUser@gmail.com',
        id: 1
    };
    afterEach((() => {
        mockServer.reset();
    }))
    it('Login', () => {
        const store = mockStore({});
        const dispActions = [
            {type: 'ACCESS_REQUEST_START'},
            {type: 'ACCESS_SET', user: userObj}
        ];
        mockServer.onPost('/login').reply(200, userObj)

        return store.dispatch(access.logIn(userObj.name, 'password123')).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        });
    })
    it('Logout', () => {
        const store = mockStore({});
        const dispActions = [
            {type: 'ACCESS_REQUEST_START'},
            {type: 'ACCESS_SET', user: null}
        ];
        mockServer.onGet('/logout').reply(200, {})

        return store.dispatch(access.logOut()).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        });
    })
})