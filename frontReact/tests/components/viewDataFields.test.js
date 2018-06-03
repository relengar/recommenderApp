import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import ViewDataFields from '../../components/viewDataFields';

Enzyme.configure({ adapter: new Adapter() });

function setup(type) {
    const props = {
        dataArr: [{label: 'label1', value: 'val1'}, {label: 'label2', value: 'val2'}],
        header: 'Heading',
        docId: 1,
        docType: type,
        children: <div id="child">Some Div</div>
    }
    const enzymeWrapper = mount(<ViewDataFields {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('ViewDataFields component', () => {
    it('Render component of type company', () => {
        const { enzymeWrapper } = setup('company');

        expect(enzymeWrapper.find('h2').text()).toBe('Heading')
        expect(enzymeWrapper.find('label')).toHaveLength(2);
        expect(enzymeWrapper.find('span i').last().text()).toBe('val2');
        expect(enzymeWrapper.find('#child')).toBeDefined();
    })
    it('Render component of type user', () => {
        const { enzymeWrapper } = setup('user');

        expect(enzymeWrapper.find('ProfilePic')).toBeDefined();
        expect(enzymeWrapper.find('ProfilePic').props().docId).toEqual(1);
    })
})
