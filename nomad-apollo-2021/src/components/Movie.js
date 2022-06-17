import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int!) {
        toggleLikeMovie(id: $id) @client
    }
`;

const Container = styled.div`
    height: 350px;
    width: 100%;
    border-radius: 7px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;
    margin-bottom: 5px;
`;

const Poster = styled.div`
    background-image: url(${props => props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
`;

export default ({id, bg, isLiked}) => {
    const [toggleLikeMovie] = useMutation(LIKE_MOVIE, { variables: { id: parseInt(id) } });
    return (
        (
            <Container>
                <Link to={`/${id}`}>
                    <Poster bg={bg} />
                </Link>
                <button onClick={toggleLikeMovie}>{isLiked ? "Unlike" : "Like" }</button>
                {isLiked ? "❤" : null}
            </Container>
        )
            
    )
}