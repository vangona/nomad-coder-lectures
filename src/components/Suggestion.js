import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: auto;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;
    border-radius: 5px;
`;

const Poster = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

export default ({ id, bg }) => (
    <Container>
        <Link to={`/${id}`}>
            <Poster bg={bg} />
        </Link>
    </Container>
);