/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CalendarDay from '../components/calendar/CalendarDay';
import createStore from '../mst/createStore';

configure({ adapter: new Adapter() });

describe('PopoverContent suite test', () => {
    const mockStore = createStore();

    test('Should render correct day', () => {
        render(<CalendarDay
            store={mockStore} day={1} isActive />);

        expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('Should render popover', () => {
        const wrapper = mount(<CalendarDay
                store={mockStore} isActive day={1} isDark={false} />);

        expect(wrapper.props().isActive).toBe(true);
        expect(wrapper.props().day).toBe(1);
        expect(wrapper.props().store).toMatchObject(mockStore);
        expect(wrapper.props().isDark).toBe(false);
    });

});