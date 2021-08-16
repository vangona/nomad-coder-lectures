import React from "react";
import { useParams } from "react-router-dom";
import {gql, useQuery} from "@apollo/client"
import styled from "styled-components";
import Suggestion from "../components/Suggestion";

const GET_MOVIE = gql`
    query getMovie($id: Int!){
        movie(id: $id) {
            id
            title
            medium_cover_image
            language
            rating
            description_intro
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(-90deg, hsla(177, 87%, 79%, 1) 0%, hsla(235, 89%, 70%, 1) 100%);
    color: white;
    overflow: auto;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 40px;
    margin-bottom: 20px;
`;

const Subtitle = styled.h4`
    font-size: 30px;
    margin-bottom: 15px;
`;

const Description = styled.p`
    font-size: 20px;
    line-height: normal;
    margin-bottom: 30px;
`;

const Suggestions = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    height: 200px; 
`;

const Poster = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

export default () => {
    let { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {variables: { id: parseInt(id) }}
    );
    console.log(data)
    return (
    <Container>
        <Column>
            <Title>{loading ? "Loading..." : data.movie.title}</Title>
            {!loading && (
                <>
                <Subtitle>{data?.movie?.language} · {data?.movie?.rating}</Subtitle>
                <Description>{data?.movie?.description_intro}</Description>
                <Suggestions>
                    {data?.suggestions?.map(s => (
                    <Suggestion key={s.id} id={s.id} bg={s.medium_cover_image}></Suggestion>
                    ))}
                </Suggestions>
                </>
            )}
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
    );
};