import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment';
import range from 'lodash/range';
import chunk from 'lodash/chunk';
import flow from 'lodash/flow';

const StyledRow = styled(Row)`
    && {
        padding: 0;
        margin: 0 5px 0 5px;
        height: 18.5vh;
    }
`;

const StyledCol = styled(Col)`
    && {
        padding: 0;
        border: 1px solid;
    }
`;
const StyledGreyCol = styled(StyledCol)`
    && {
        background: #e2e3e5;
        color: #383d41;
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

    const getComponentByDays = dayList => {
        return dayList.map(element => 
            (<StyledRow key={new Buffer(JSON.stringify(element))
                .toString('base64')}>
                <StyledGreyCol lg={true}>{element.shift()}</StyledGreyCol>
                {element.map(day => <StyledCol key={day} lg={true}>
                        <span style={{ paddingLeft: '5px' }}>{day}</span>
                    </StyledCol>)}
            </StyledRow>)
        );
    }

    return (<React.Fragment>
            {flow(getCalendarDays, getComponentByDays)()}
        </React.Fragment>
    );
};

export default CalendarBody;