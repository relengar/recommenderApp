import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { CompanyContainer } from '../../containers/companyContainer';
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

function setup(alterations, shallowRender=false) {
    const props = Object.assign({
        dispatch: jest.fn(),
        isFetching: false,
        company: {},
        reviews: [],
        fetchingReviews: false,
        categories: [],
        error: null,
        currentUser: {},
        urlId: '1'
    }, alterations);
    const enzymeWrapper = 
        !shallowRender ? 
        mount(<MemoryRouter><CompanyContainer {...props} /></MemoryRouter>) :
        shallow(<CompanyContainer {...props} />);
    return {
        props,
        enzymeWrapper
    }
}

describe('CompanyContainer container' , () => {
    it('Render loading screen', () => {
        const { enzymeWrapper } = setup({isFetching: true});

        expect(enzymeWrapper.find('section').children()).toHaveLength(1)
    })
    it('View company', () => {
        const stateAlterations = {
            company: {id: 2, name: 'testCompany', owner: {id: 1, name: 'owner'}, gallery: []}
        }
        const { enzymeWrapper } = setup(stateAlterations, true);

        expect(enzymeWrapper.find('ViewDataFields')).toHaveLength(1);
        expect(enzymeWrapper.find('ViewDataFields').props().docId).toEqual(stateAlterations.company.id);
    })
    it('Edit company', () => {
        const stateAlterations = {
            company: {id: 2, name: 'testCompany', owner: {id: 1, name: 'owner'}, gallery: []},
            currentUser: {id: 1, name: 'compOwner'}
        }
        const { enzymeWrapper, props } = setup(stateAlterations, true);

        expect(enzymeWrapper.find('CompanyForm')).toHaveLength(1);
        expect(enzymeWrapper.find('CompanyForm').props().isNew).toBe(false);
        enzymeWrapper.find('CompanyForm').props().submitCompany()
        expect(props.dispatch.mock.calls).toHaveLength(2)
        enzymeWrapper.find('CompanyForm').props().submitCompany()
        expect(props.dispatch.mock.calls).toHaveLength(3)
    })
    it('Create company', () => {
        const stateAlterations = {
            urlId: null,
            currentUser: {id: 1, name: 'compOwner'}
        }
        const { enzymeWrapper, props } = setup(stateAlterations);

        expect(enzymeWrapper.find('CompanyForm')).toHaveLength(1);
        expect(enzymeWrapper.find('CompanyForm').props().isNew).toBe(true);
        enzymeWrapper.find('CompanyForm').props().submitCompany()
        expect(props.dispatch.mock.calls).toHaveLength(2)
    })
    // it('Redirect to main page', () => {
    //     const stateAlterations = {
    //         urlId: null,
    //         currentUser: {id: 1, name: 'compOwner'},
    //         company: {id: 2, name: 'testCompany', owner: {id: 1, name: 'owner'}, gallery: []},
    //     }
    //     const { enzymeWrapper, props } = setup(stateAlterations);

    //     expect(enzymeWrapper.find('Redirect')).toHaveLength(1)
    //     // test works properly but followin error is raised:
    //     // Warning: You tried to redirect to the same route you're currently on: "/"
    // })
})