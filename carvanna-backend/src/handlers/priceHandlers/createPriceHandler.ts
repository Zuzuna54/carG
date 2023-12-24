import { createPrice } from "../../neo4jCalls/priceCalls/createPrice";
import { v4 as uuidv4 } from "uuid";
import { Price } from "../../entities/Price";
import { decodeToken, validateSession } from '../../utils/utils';
import { ACTIVE, SUPER_ADMIN, COMPANY_ADMIN } from "../../constants/constants";
import { GenericReturn } from "../../entities/genericReturn";
import { getLocation } from "../../neo4jCalls/locationCalls/getLocation";
import { getCompany } from "../../neo4jCalls/compnayCalls/getCompany";

const createPriceHandler = async (

    cost: number,
    locationId: string,
    companyId: string,
    description: string,
    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating createPriceHandler \n`);
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
        if (user?.userType !== SUPER_ADMIN && user?.userType !== COMPANY_ADMIN) {

            console.error('Error: 401 User not authorized to create states');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create states`;

            return result;
        }

        //Validate session duration 
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateSession(user.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            result.result = `failed`;
            result.statusCode = 440;
            result.message = `Error: 440 Session has expired`;

            return result;

        }

        //Validate that cost, locationId, and companyId are provided in the request body
        console.log(`Validating that cost, locationId, and companyId are provided in the request body\n`)
        if (!cost || !locationId || !companyId) {

            console.error('Error: 400 Missing required parameters');
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 Missing required parameters`;

            return result;

        }

        //Validate locationId
        console.log(`Validating locationId\n`)
        const location: GenericReturn = await getLocation(locationId);
        if (location.statusCode !== 200) {

            console.error(`Error: 500 ${location.message}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${location.message}`;

            return result;

        }

        //Validate companyId
        console.log(`Validating companyId\n`)
        const company: GenericReturn = await getCompany(companyId);
        if (company.statusCode !== 200) {

            console.error(`Error: 500 ${company.message}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${company.message}`;

            return result;

        }

        //Create new Price object
        console.log(`Creating new Price object\n`)
        const newPrice: Price = new Price(
            uuidv4(),
            cost,
            locationId,
            companyId,
            description,
            new Date().toISOString(),
            user.username,
            "",
            ACTIVE
        );

        //Create new Price
        console.log(`Creating new Price\n`)
        const createPriceResult: GenericReturn = await createPrice(newPrice);
        if (createPriceResult.statusCode !== 200) {

            console.error(`Error: 500 ${createPriceResult.message}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${createPriceResult.message}`;

            return result;

        }

        console.log(`200: Price ${newPrice.id} created with id ${newPrice.id}\n`);
        result.result = `success`;
        result.statusCode = 200;
        result.message = `200: Price ${newPrice.id} created with id ${newPrice.id}`;
        result.id = newPrice.id;
        result.data = newPrice;

        return result;

    } catch (err) {

        console.error(`500: failed to create price ${name}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create price ${name}`;

        return result

    }

}

export default createPriceHandler;
