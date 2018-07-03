import user from '../reducers/user';
import access from '../reducers/access';
import company from '../reducers/company';
import discussion from '../reducers/discussion';

describe('User reducer', () => {
    it('Starts user request', () => {
        const action = {
            type: 'USER_REQUEST_START'
        }

        expect(user({}, action)).toEqual({
            isFetching: true,
            error: null
        })
    })
    it('Fails user request', () => {
        const action = {
            type: 'USER_REQUEST_FAIL',
            error: 'fail',
            values: {name: 'Dude'}
        }

        expect(user({}, action)).toEqual({
            isFetching: false,
            error: action.error,
            retrievedUser: action.values
        })
    })
    it('Set user', () => {
        const action = {
            type: 'USER_SET',
            user: {name: 'Dude'}
        }
        expect(user({}, action)).toEqual({
            isFetching: false,
            retrievedUser: action.user,
            error: null
        })
    })
    it('Set userlist', () => {
        const action = {
            type: 'USERLIST_SET',
            users: [{name: 'Dude'}],
            pagination: {offset: 0, limit: 2, count: 0}
        }

        expect(user({}, action)).toEqual({
            isFetching: false,
            userList: action.users,
            pagination: action.pagination,
            error: null
        })
    })
})

describe('Acccess reducer', () => {
    it('Start access request', () => {
        const action = {
            type: 'ACCESS_REQUEST_START'
        }
        
        expect(access({}, action)).toEqual({
            isFetching: true,
            userError: null
        })
    })
    it('Fail access request', () => {
        const action = {
            type: 'ACCESS_REQUEST_FAIL',
            error: 'fail'
        }
        
        expect(access({}, action)).toEqual({
            isFetching: false,
            userError: action.error
        })
    })
    it('Set current user', () => {
        const action = {
            type: 'ACCESS_SET',
            user: {name: 'Dude'}
        }
        
        expect(access({}, action)).toEqual({
            isFetching: false,
            currentUser: action.user
        })
    })
})

describe('Company reducers', () => {
    const companyObj = {name: 'testComp', id: 1};
    const pagination = {offset: 0, limit: 2, count: 0}
    it('Start company request', () => {
        const action = {
            type: 'COMPANY_REQUEST_START'
        }
        
        expect(company({}, action)).toEqual({
            isFetching: true,
            error: null
        })
    })
    it('Fail company request', () => {
        const action = {
            type: 'COMPANY_REQUEST_FAIL',
            error: 'Fail',
            companyObj
        }

        expect(company({}, action)).toEqual({
            isFetching: false,
            error: action.error,
            company: action.company
        })
    })
    it('Set company', () => {
        const action = {
            type: 'COMPANY_SET',
            companyObj
        }

        expect(company({}, action)).toEqual({
            retrievedCompany: action.company,
            isFetching: false,
            error: null
        })
    })
    it('Set list of companies', () => {
        const action = {
            type: 'COMPANIES_SET',
            companies: [companyObj],
            pagination
        }

        expect(company({}, action)).toEqual({
            companies: action.companies,
            pagination: action.pagination,
            isFetching: false,
            error: null
        })
    })
    it('Set list of categories', () => {
        const action = {
            type: 'CATEGORIES_SET',
            categories: [1,2,3,4,5]
        }

        expect(company({}, action)).toEqual({
            categories: action.categories,
            isFetching: false,
            error: null
        })
    })
    it('Start company gallery request', () => {
        const action = {
            type: 'GALLERY_FREEZE'
        }

        expect(company({}, action)).toEqual({
            galleryFrozen: true
        })
    })
    it('Delete company Gallery items', () => {
        const action = {
            type: 'GALLERY_DELETE_PICS',
            pics: ['pic1', 'pic3']
        }
        const initState = {
            retrievedCompany: {gallery: ['pic1', 'pic2', 'pic3']}
        }

        expect(company(initState, action)).toEqual({
            galleryFrozen: false,
            retrievedCompany: {gallery: ['pic2']},
            error: null
        })
    })
    it('Fail company gallery request', () => {
        const action = {
            type: 'GALLERY_FAIL',
            error: 'Fail'
        }

        expect(company({}, action)).toEqual({
            galleryFrozen: false,
            error: action.error
        })
    })
})

describe('Discussion reducers', () => {
    const pagination = {offset: 0, limit: 2, count: 0}
    it('Start discussion request', () => {
        const action = {
            type: 'DISCUSSION_REQUEST_START'
        }

        expect(discussion({}, action)).toEqual({
            isFetching: true
        })
    })
    it('Fail discussion request', () => {
        const action = {
            type: 'DISCUSSION_REQUEST_FAIL',
            error: 'Fail'
        }

        expect(discussion({}, action)).toEqual({
            isFetching: false,
            error: action.error
        })
    })
    it('Set reviews', () => {
        const action = {
            type: 'REVIEWS_SET',
            reviews: [{content: 'Meh', rating: 2}],
            pagination
        }

        expect(discussion({}, action)).toEqual({
            isFetching: false,
            reviews: action.reviews,
            revPagination: action.pagination
        })
    })
})
