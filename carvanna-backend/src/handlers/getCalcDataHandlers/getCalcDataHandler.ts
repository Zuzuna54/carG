import { getCompany } from "../../neo4jCalls/compnayCalls/getCompany";
import { getAuction } from "../../neo4jCalls/auctionCalls/getAuction";
import { getState } from "../../neo4jCalls/stateCalls/getState";
import { getLocation } from "../../neo4jCalls/locationCalls/getLocation";
import { getPrice } from "../../neo4jCalls/priceCalls/getPrice";
import { GenericReturn } from "../../entities/genericReturn";
import { validateSession, decodeToken } from "../../utils/utils";


const getCalcDataHandler = async (jwtToken: string | undefined): Promise<GenericReturn> => {

    console.log(`initiating getCalcDataHandler \n`);
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        //Authorization check with JWT
        console.log(`Authorization check with JWT\n`)
        if (!jwtToken) {

            console.error('Error: 498 No JWT token provided');
            result.result = `failed`;
            result.statusCode = 498;
            result.message = `Error 498: No JWT token provided`;

            return result;

        }

        console.log(`Decoding the JWT token\n`)
        const user: Record<string, any> | null = decodeToken(jwtToken);

        //Validate session duration 
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateSession(user?.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            result.result = `failed`;
            result.statusCode = 440;
            result.message = `Error: 440 Session has expired`;

            return result;

        }

        //Get the companies
        console.log(`Getting the companies\n`)
        const companies: GenericReturn | null = await getCompany();
        if (companies.statusCode !== 200) {

            console.error('Error: 404 Companies not found');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Companies not found`;

            return result;

        }

        //Get the auctions
        console.log(`Getting the auctions\n`)
        const auctions: GenericReturn | null = await getAuction();
        if (auctions.statusCode !== 200) {

            console.error('Error: 404 Auctions not found');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Auctions not found`;

            return result;

        }

        //Get the states
        console.log(`Getting the states\n`)
        const states: GenericReturn | null = await getState();
        if (states.statusCode !== 200) {

            console.error('Error: 404 States not found');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 States not found`;

            return result;

        }

        //Get the locations
        console.log(`Getting the locations\n`)
        const locations: GenericReturn | null = await getLocation();
        if (locations.statusCode !== 200) {

            console.error('Error: 404 Locations not found');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Locations not found`;

            return result;

        }

        //Get the prices
        console.log(`Getting the prices\n`)
        const prices: GenericReturn | null = await getPrice();
        if (prices.statusCode !== 200) {

            console.error('Error: 404 Prices not found');
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Prices not found`;

            return result;

        }

        // const locationsToReturn: Record<string, any> = [];
        if (locations.data && prices.data) {

            console.log(`locations.data and prices.data exist\n`)
            console.log(`locations.data: ${locations.data}\n`)
            console.log(`prices.data: ${prices.data}\n`)

        }
        result.result = `success`;
        result.statusCode = 200;
        result.message = `200: Success`;
        result.data = {
            companies: companies.data,
            auctions: auctions.data,
            states: states.data,
            locations: locations.data,
            prices: prices.data
        }

        return result;


    } catch (error) {

        console.error(`Error: 500 ${error}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 ${error}`;

        return result;

    }

}

export default getCalcDataHandler;