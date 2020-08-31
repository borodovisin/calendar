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
        height: 18vh;
    }
`;

const getValues = (list, active) => list.map(item => ({ value: item, active }));

const CalendarBody = () => {
    const getCalendarDays = () => {
        const lastDayOfCurrentMonth = moment().subtract('months')
        .startOf('month').daysInMonth();
        const lastDayPreviousMonth = moment().subtract(1, 'months')
        .startOf('month').daysInMonth();
        const daysFromNextMonth = (35 - 2 - lastDayOfCurrentMonth);

        return chunk([{ value: (lastDayPreviousMonth - 1), active: false }, 
            { value: lastDayPreviousMonth, active: false },
            ...getValues(range(1, (lastDayOfCurrentMonth + 1)), true),
            ...getValues(range(1, (daysFromNextMonth + 1)), false)], 7);
    };

    const getCalendarRow = element => {
        const firstDay = element.shift();
        const lastDay = element.pop();

        return (<React.Fragment>
                <CalendarDay day={firstDay.value} isActive={firstDay.active}
                    isDark />
                {element.map(item => (<CalendarDay
                        key={item.value}
                        day={item.value} 
                        isActive={item.active}
                    />))}
                <CalendarDay day={lastDay.value} isActive={lastDay.active}
                    isDark />
            </React.Fragment>);
    };

    const getComponentByDays = dayList => {
        return dayList.map(element => 
            (<StyledRow key={element.map(i => i.value).join('')}>
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