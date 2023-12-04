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
            userType
            createdAt
            lastLogin
            accessToken
            refreshToken
            error
        }
    }
`;

export const REFRESH_ACCESS_TOKEN = gql`
    mutation refreshAccessToken($refreshToken: String!) {
        refreshAccessToken(refreshToken: $refreshToken) {
            data,
            message,
            statusCode
        }
    }
`;

export const CREATE_COMPANY = gql`
    mutation CreateCompany(
        $name: String!,
        $description: String!,
        $address: String!,
        $phone: String!,
        $email: String!
    ) {
        createCompany(
            name: $name,
            description: $description,
            address: $address,
            phone: $phone,
            email: $email
        ) {
            result
            statusCode
            message
            id
        }
    }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $password: String!,
    $email: String!,
    $username: String!,
    $userType: String!,
    $companyId: String!
  ) {
    createUser(
      password: $password,
      email: $email,
      username: $username,
      userType: $userType,
      companyId: $companyId
    ) {
      result
      statusCode
      message
      id
    }
  }
`;