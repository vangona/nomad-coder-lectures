import React from "react";
import { gql, useQuery } from "@apollo/client"
import Movie from "../components/Movie";
import styled from "styled-components";

const GET_MOVIES = gql`
    {
        movies {
            id
            medium_cover_image
        }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: window.innerHeight;
`;
const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background: gray;
    color: white;
`;
const Title = styled.h1`
    font-size: 2rem;
    margin-bottom : 2rem;
`;
const Subtitle = styled.h2`
    font-size: 1.5rem;
`;
const Loading = styled.span`
    color: gray;
`;

export default () => {
    const { loading, data } = useQuery(GET_MOVIES);
    return (
    <Container>
        <Header>
            <Title>Apollo 2021</Title>
            <Subtitle>Movie web with GraphQL & Apollo</Subtitle>
        </Header>
        {loading && <Loading>Loading...</Loading>}
        {!loading && data.movies && data.movies.map(m => <Movie key={m.id} {...m} id={m.id}/>)}
    </Container>
    )
}