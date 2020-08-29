import React from 'react';
import { Container} from 'react-bootstrap';

import CalendarHeader from './calendar/CalendarHeader';
import CalendarBody from './calendar/CalendarBody';


const Calendar = () => {
    return (<Container fluid>
        <CalendarHeader />
        <CalendarBody />
    </Container>);
};

export default Calendar;