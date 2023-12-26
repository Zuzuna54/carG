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

export const UPDATE_COMPANY = gql`
    mutation UpdateCompany(
        $id: String!,
        $name: String!,
        $description: String!,
        $address: String!,
        $phone: String!,
        $email: String!,
    ) {
        updateCompany(
            id: $id,
            name: $name,
            description: $description,
            address: $address,
            phone: $phone,
            email: $email,
        ) {
            result
            statusCode
            message
            id
        }
    }
`;

export const DISABLE_COMPANY = gql`
    mutation DisableCompany($id: String!) {
        disableCompany(id: $id) {
            result
            statusCode
            message
            id
        }
    }
`;

export const ENABLE_COMPANY = gql`
    mutation EnableCompany($id: String!) {
        enableCompany(id: $id) {
            result
            statusCode
            message
            id
        }
    }
`;

export const DELETE_COMPANY = gql`
    mutation DeleteCompany($id: String!) {
        deleteCompany(id: $id) {
            result
            statusCode
            message
            id
        }
    }
`;
