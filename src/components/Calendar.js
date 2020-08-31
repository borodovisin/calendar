/* eslint-disable no-unused-vars */
import React from 'react';
import { Container } from 'react-bootstrap';

import CalendarHeader from './calendar/CalendarHeader';
import CalendarBody from './calendar/CalendarBody';

import 'font-awesome/css/font-awesome.css';

const Calendar = () => {
    return (<Container fluid>
        <CalendarHeader />
        <CalendarBody />
    </Container>);
};

export default Calendar;