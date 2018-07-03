import * as company from '../../actions/company';
import configureMockStore from 'redux-mock-store'
import MockAdapter  from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockServer = new MockAdapter(axios);

describe('Company actions', () => {
    let store = mockStore({});
    const pagination = {offset: 0, limit: 2, count: 0}
    const companyObj = {
        id: 1,
        name: 'testComp',
        description: 'testDesc'
    }
    afterEach(() => {
        store = mockStore({});
        mockServer.reset();
    })
    it('Get company', () => {
        const dispActions = [
            {type: 'COMPANY_REQUEST_START'},
            {type: 'COMPANY_SET', company: Object.assign(companyObj, {gallery: undefined})},
            {type: 'SET_CURRENT_REVIEW', review: null},
            {type: 'DISCUSSION_REQUEST_START'},
            {type: 'REVIEWS_SET', reviews: [], pagination : pagination}
        ];
        mockServer.onGet(`/company/${companyObj.id}`).reply(200, {company: companyObj});
        mockServer.onGet(`/review/company/${companyObj.id}?offset=0&limit=2`).reply(200, {rows: [], count: pagination.count})

        return store.dispatch(company.getCompany(companyObj.id)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Get all companies', () => {
        const dispActions = [
            {type: 'COMPANY_REQUEST_START'},
            {type: 'COMPANIES_SET', companies: [], pagination, categoryId: 1},
        ];
        mockServer.onGet(`/category/${1}?offset=${pagination.offset}&limit=${pagination.limit}`).reply(200, {rows: [], count: pagination.count})

        return store.dispatch(company.getAllCompanies(1)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Create new company', () => {
        const dispActions = [
            {type: 'COMPANY_REQUEST_START'},
            {type: 'COMPANY_SET', company: Object.assign(companyObj, {gallery: undefined})}
        ];
        mockServer.onPost('/company').reply(200, {comp: companyObj})

        return store.dispatch(company.createCompany(companyObj)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Update company', () => {
        const dispActions = [
            {type: 'COMPANY_REQUEST_START'},
            {type: 'COMPANY_SET', company: Object.assign(companyObj, {gallery: undefined})}
        ];
        mockServer.onPost(`/company/${companyObj.id}`).reply(200, companyObj)

        return store.dispatch(company.updateCompany(Object.assign(companyObj, {gallery: []}), companyObj.id)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        }) 
    })
    it('Delete company', () => {
        const dispActions = [
            {type: 'COMPANY_REQUEST_START'},
            {type: 'COMPANY_SET', company: {}}
        ];
        mockServer.onDelete(`/company/delete/${companyObj.id}`).reply(200, {})

        return store.dispatch(company.deleteCompany(companyObj.id)).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        })
    })
    it('Get categories', () => {
        const dispActions = [
            {type: 'COMPANY_REQUEST_START'},
            {type: 'CATEGORIES_SET', categories: []}
        ];
        mockServer.onGet('/category').reply(200, [])

        return store.dispatch(company.getCategories()).then(() => {
            expect(store.getActions()).toEqual(dispActions);
        }) 
    })
})
