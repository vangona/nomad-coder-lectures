import React from "react";
import { gql, useQuery } from "@apollo/client"
import Movie from "../components/Movie";
import styled from "styled-components";

const GET_MOVIES = gql`
    {
        movies {
            id
            medium_cover_image
            isLiked @client
        }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background: linear-gradient(-90deg, hsla(177, 87%, 79%, 1) 0%, hsla(235, 89%, 70%, 1) 100%);
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

const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 80%;
    position: relative;
    top: -50px;
`;

export default () => {
    const { loading, data } = useQuery(GET_MOVIES);
    return (
    <Container>
        <Header>
            <Title>Apollo Movie Web 2021</Title>
            <Subtitle>Movies with GraphQL & Apollo</Subtitle>
        </Header>
        {loading && <Loading>Loading...</Loading>}
        {!loading && (
            <Movies>
                {data?.movies?.map(m => 
                <Movie 
                key={m.id} 
                id={m.id} 
                isLiked={m.isLiked} 
                bg={m.medium_cover_image} />)}
            </Movies>
        )}
    </Container>
    )
}