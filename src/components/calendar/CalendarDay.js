/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import { nanoid } from 'nanoid';

import popover from '../popover/popover';
import Reminder from './Reminder';

const StyledCol = styled(Col)`
    && {
        padding: 0;
        border: 1px solid #1b1e21;
    }
`;

const CalendarDay = props => {
    const keyDay = moment().set('date', props.day).format('YYYY-MM-D');
    const currentDay = moment().date();
    const getColClassName = () => props.isDark ? ' col-dark' : '';
    const getDayClassName = () => props.day === currentDay ?
        'calendar-day calendar-day-active' : 'calendar-day';

    const getReminder = () => {
        const reminder = get(props.store.reminder, keyDay, {});

        if (!isEmpty(reminder)) {
            const sortedReminder = keys(reminder).sort();

            return map(sortedReminder, key => (<Reminder
                key={nanoid()} keyDay={keyDay}
                reminder={reminder[key]} time={key} />));
        }
        return null;
    };

    const hasReminder = () => props.store.hasReminder(keyDay);

    const removeAllReminder = event => {
        event.stopPropagation();
        props.store.removeAllReminders(keyDay);
    };
    
    return (<OverlayTrigger
            trigger="click"
            rootClose
            placement="auto"
            overlay={popover(keyDay)}
            onToggle={show => { if (!show) props.store.cleanSelection(); }}
            >
            <StyledCol
                className={getColClassName()}>   
                <span className={getDayClassName(keyDay)}>{props.day}</span>
                {hasReminder() &&
                    <i className="fa fa-trash float-right text-danger hand-cursor"
                    style={{ marginRight: '2px' }}
                    title="Delete all"
                    onClick={removeAllReminder}
                    ></i>
                }
                <Container className="container-reminder">
                    <Row>
                        {getReminder()}
                    </Row>
                </Container>
            </StyledCol>
        </OverlayTrigger>);
};

CalendarDay.propTypes = {
    day: PropTypes.number.isRequired,
    isDark: PropTypes.bool
};

CalendarDay.defaultProps  = {
    isDark: false
};

export default inject('store')(observer(CalendarDay));