import React from "react";
import { useParams } from "react-router-dom";
import {gql, useQuery} from "@apollo/client"

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
    }
`

export default () => {
    let { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {variables: { id: parseInt(id) }}
    );
    if (loading) {
        return "loading"
    }
    if (data && data.movie) {
        return data.movie.title;
    }
    return "Detail";
};