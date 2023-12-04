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
`
