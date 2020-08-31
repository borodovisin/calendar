/* eslint-disable no-unused-vars */
import React from 'react';
import { Row } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment';
import range from 'lodash/range';
import chunk from 'lodash/chunk';
import flow from 'lodash/flow';

import CalendarDay from './CalendarDay';

const StyledRow = styled(Row)`
    && {
        padding: 0;
        margin: 0 5px 0 5px;
        height: 18.5vh;
    }
`;

const CalendarBody = () => {
    const getCalendarDays = () => {
        const lastDayOfCurrentMonth = moment().subtract('months')
        .startOf('month').daysInMonth();
        const lastDayPreviousMonth = moment().subtract(1, 'months')
        .startOf('month').daysInMonth();
        const daysFromNextMonth = (35 - 2 - lastDayOfCurrentMonth);

        return chunk([(lastDayPreviousMonth - 1), lastDayPreviousMonth,
            ...range(1, (lastDayOfCurrentMonth + 1)),
            ...range(1, (daysFromNextMonth + 1))], 7);
    };

    const getActiveDay = day => moment().date() === day;

    const getCalendarRow = element => {
        const firstDay = element.shift();
        const lastDay = element.pop();

        return (<React.Fragment>
                <CalendarDay day={firstDay} isDark />
                {element.map(day => (<CalendarDay
                        key={day}
                        day={day} 
                    />))}
                <CalendarDay day={lastDay} isDark />
            </React.Fragment>);
    };

    const getComponentByDays = dayList => {
        return dayList.map(element => 
            (<StyledRow key={new Buffer(element).toString('base64')}>
                {getCalendarRow(element)}
            </StyledRow>)
        );
    };

    return (<React.Fragment>
            {flow(getCalendarDays, getComponentByDays)()}
        </React.Fragment>
    );
};

export default CalendarBody;