import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
    mutation logInUser($username: String!, $password: String!) {
        logInUser(
            username: $username,
            password: $password,
        ){
            id
            username
            email
            password
            userType
            createdAt
            lastLogin
            token
            error
        }
    }
`