import { createState } from "../../neo4jCalls/stateCalls/createState";
import { getStateByName } from "../../neo4jCalls/stateCalls/getStateByName";
import { getAuctionById } from "../../neo4jCalls/auctionCalls/getAuctionById";
import { v4 as uuidv4 } from "uuid";
import { State } from "../../entities/State";
import { decodeToken, validateSession } from '../../utils/utils';
import { ACTIVE, SUPER_ADMIN } from "../../constants/constants";
import { GenericReturn } from "../../entities/genericReturn";


const createStateHandler = async (

    name: string,
    abbrevation: string,
    auctionId: string,
    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating createStateHandler \n`);
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
        if (user?.userType !== SUPER_ADMIN) {

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

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, abbrevation and auctionId are provided in the request body\n`)
        if (!name || !abbrevation || !auctionId) {

            console.error('Error: 400 name, abbrevation and auctionId are required parameters.\n');
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 name, abbrevation and auctionId are required parameters.`;

            return result;

        }

        // Validate that the Auction exists
        console.log(`Validating that the Auction exists\n`)
        const auction: GenericReturn = await getAuctionById(auctionId);
        if (auction.statusCode !== 200) {

            console.error(`Error: 404 Auction ${auctionId} not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Auction ${auctionId} not found`;

            return result;

        }

        // Validate that the State doesn't already exist
        console.log(`Validating that the State doesn't already exist\n`)
        const state: GenericReturn = await getStateByName(name);
        if (state.statusCode === 200) {

            console.error(`Error: 409 State ${name} already exists`);
            result.result = `failed`;
            result.statusCode = 409;
            result.message = `Error: 409 State ${name} already exists`;

            return result;

        }

        // Create the State
        console.log(`Creating the State\n`)
        const id: string = uuidv4();
        const newState: State = new State(
            id,
            name,
            abbrevation,
            auctionId,
            new Date().toISOString(),
            user.username,
            ACTIVE
        );
        const createdState: Record<string, any> = await createState(newState);

        if (createdState.statusCode !== 200) {

            console.error(`Error: 500 Failed to create State ${createdState.message}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create State ${createdState.message} `;

            return result;

        }

        console.log(`State ${name} created successfully\n`);
        result.id = id;
        result.result = `success`;
        result.statusCode = 200;
        result.message = createdState.result;

        return result;

    } catch (err) {

        console.error(`Error: 500 Failed to create State ${name}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create State ${name}: ${err}`;

        return result;

    }
}

export default createStateHandler;