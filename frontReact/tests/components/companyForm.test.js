import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import CompanyForm from '../../components/companyForm';

Enzyme.configure({ adapter: new Adapter() });

const company = {
    id: 1,
    name: 'testCompany',
    email: 'test.company@gmail.com',
}

function setup(isNew, gallery = ['pic1', 'pic2'], shallowRender = true) {
    const props = {
        company: Object.assign(company, {gallery}),
        categories: ['Builders', 'Carpenters'],
        submitCompany: jest.fn(),
        deleteCompany: jest.fn(),
        isNew,
        error: null,
    }
    const enzymeWrapper = shallowRender ? shallow(<CompanyForm {...props} />) : mount(<CompanyForm {...props} />)
    return {
        props,
        enzymeWrapper
    }
}

describe('CompanyForm component', () => {
    it('Renders comapny form for new company', () => {
        const { enzymeWrapper } = setup(true);

        expect(enzymeWrapper.find('h1').text()).not.toContain(company.name)
        expect(enzymeWrapper.find('FormInput')).toHaveLength(5)
        expect(enzymeWrapper.find('FormSelect')).toHaveLength(1)
        expect(enzymeWrapper.find('Gallery')).toHaveLength(0)
        expect(enzymeWrapper.find('.modal-footer button')).toHaveLength(1)
    })
    it('Renders comapny form for company update', () => {
        const { enzymeWrapper } = setup(false);

        expect(enzymeWrapper.find('h1').text()).toContain(company.name)
        expect(enzymeWrapper.find('FormInput')).toHaveLength(4)
        expect(enzymeWrapper.find('FormSelect')).toHaveLength(0)
        expect(enzymeWrapper.find('.modal-footer button')).toHaveLength(2)
    })
    it('Upload a picture to the gallery', () => {
        const { enzymeWrapper, props } = setup(false);
        
        enzymeWrapper.find('input[type="file"]').simulate('change', {target: {files: [{name: 'addedPic'}]}})
        expect(enzymeWrapper.state().gallery.length).toBe(3)
    })
    it('Submit company', () => {
        const { enzymeWrapper, props } = setup(false, [], false);

        enzymeWrapper.find('form').simulate('submit')
        expect(props.submitCompany.mock.calls.length).toBe(1);
    })
    it('Delete company', () => {
        const { enzymeWrapper, props } = setup(false, [], false);

        enzymeWrapper.find('button.btn-secondary').simulate('click')
        expect(props.deleteCompany.mock.calls.length).toBe(1);
    })
})