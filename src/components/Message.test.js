import { render, screen } from '@testing-library/react';
import Message from './Message';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';


Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {

    it('renders without error', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Message />, div)
    })

    it('test star', () => {
        const mockCallBack = jest.fn();
        const button = shallow(( <i className={"star fa fa-star"} onClick={mockCallBack}></i>));
        button.find('i').simulate('click');
        expect(mockCallBack.mock.calls.length).toBe(1);
    })

})



