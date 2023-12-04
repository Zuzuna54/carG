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
    query{
        getCompaniesList{
            statusCode,
            message,
            result,
            data
        }
    }
`;
