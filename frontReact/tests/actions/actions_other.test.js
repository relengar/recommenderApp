import * as gallery from '../../actions/gallery';
import configureMockStore from 'redux-mock-store'
import MockAdapter  from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockServer = new MockAdapter(axios);

describe('Gallery actions', () => {
    const picName = 'test.jpg';
    let store = mockStore({});
    afterEach(() => {
        store = mockStore({});
        mockServer.reset();
    })
    it('Delete picture', () => {
        const pics = [picName];
        const dispActions = [
            {type: 'GALLERY_FREEZE'},
            {type: 'GALLERY_DELETE_PICS', pics}
        ];
        mockServer.onDelete(`/company/deletePicture/${picName}?id=1`).reply(200, {})

        return store.dispatch(gallery.deletePicture(1, picName)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        }) 
    })
})
