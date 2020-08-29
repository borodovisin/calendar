import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledRow = styled(Row)`
    && {
        background: #cce5ff;
        color: #004085;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 10px 5px 0 5px;
        border: 1px solid #004085;
    }
`

const CalendarHeader = () => {
    return (<StyledRow className="text-center">
            <Col lg={true}>Sunday</Col>
            <Col lg={true}>Monday</Col>
            <Col lg={true}>Tuesday</Col>
            <Col lg={true}>Wednesday</Col>
            <Col lg={true}>Thursday</Col>
            <Col lg={true}>Friday</Col>
            <Col lg={true}>Saturday</Col>
        </StyledRow>);
};

export default CalendarHeader;