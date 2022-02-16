import { render, screen } from '@testing-library/react';
import Toolbar from './Toolbar';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom'

Enzyme.configure({ adapter: new Adapter() });

describe('Toolbar', () => {
    it('renders without error', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Toolbar />, div)
    })

    it('test button', () => {
        const mockCallBack = jest.fn();
        const button = shallow((<button onClick={mockCallBack}>Ok!</button>));
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toBe(1);
    })

    it('check if button has classname', async () => {
        const wrapper = mount(<Toolbar />)
        wrapper.find('button').forEach(btn => expect(btn.prop('className')).toBe('btn btn-default'))
    })
})



