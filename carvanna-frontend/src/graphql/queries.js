import { gql } from "@apollo/client";


export const GET_CALC_DATA = gql`
    query {
        getCalcData {
            statusCode
            message
            data
            result
        }
    }
`;

export const GET_COMPANIES_LIST = gql`
    query GetCompaniesList($status: String!) {
        getCompaniesList(status: $status) {
            statusCode
            message
            result
            data
        }
    }
`;

export const GET_COMPANY = gql`
    query GetCompany($id: String!) {
        getCompany(id: $id) {
            statusCode
            message
            result
            data
        }
    }
`;
