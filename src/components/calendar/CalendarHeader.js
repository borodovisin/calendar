/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { inject, observer }  from 'mobx-react';
import styled from 'styled-components';
import moment from 'moment';

import { StyledRow } from '../../utils/styledComponent';

const CalendarHeader = props => {
    const monthName = moment().month(props.store.month).format('MMMM');

    const handlePreviousMonth = () => {
        props.store.setMonth(( props.store.month - 1));
    };

    const handleNextMonth = () => {
        props.store.setMonth(( props.store.month + 1));
    };

    return (<React.Fragment>
        <Row className="text-center">
            <Col lg={5} className="no-padding">
                <i
                    className="fa fa-chevron-circle-left float-right no-padding icon-margin-top"
                    onClick={handlePreviousMonth}>
                    </i>
            </Col>
            <Col lg={2} className="no-padding month">{monthName}</Col>
            <Col lg={5} className="no-padding">
                <i
                    className="fa fa-chevron-circle-right float-left no-padding icon-margin-top"
                    onClick={handleNextMonth}
                >
                </i>
            </Col>
        </Row>
        <StyledRow className="text-center">
            <Col lg={true}>Sunday</Col>
            <Col lg={true}>Monday</Col>
            <Col lg={true}>Tuesday</Col>
            <Col lg={true}>Wednesday</Col>
            <Col lg={true}>Thursday</Col>
            <Col lg={true}>Friday</Col>
            <Col lg={true}>Saturday</Col>
        </StyledRow>
    </React.Fragment>);
};

export default inject('store')(observer(CalendarHeader));