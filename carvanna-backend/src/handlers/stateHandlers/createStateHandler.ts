import { createState } from "../../neo4jCalls/stateCalls/createState";
import { getStateByName } from "../../neo4jCalls/stateCalls/getStateByName";
import { getAuctionById } from "../../neo4jCalls/auctionCalls/getAuctionById";
import { v4 as uuidv4 } from "uuid";
import { State } from "../../entities/State";
import { decodeToken, validateSession } from '../../utils/utils';
import { ACTIVE, SUPER_ADMIN } from "../../constants/constants";


const createStateHandler = async (

    name: string,
    abbrevation: string,
    auctionId: string,
    jwtToken: string | undefined

): Promise<string> => {

    console.log(`initiating createStateHandler \n`);

    try {

        //Authorization check with JWT
        console.log(`Authorization check with JWT\n`)
        if (!jwtToken) {

            console.error('Error: 498 No JWT token provided');
            return `Error: 498 No JWT token provided `;

        }

        console.log(`Decoding the JWT token\n`)
        const user: Record<string, any> | null = decodeToken(jwtToken);
        if (user?.userType !== SUPER_ADMIN) {

            console.error('Error: 401 User not authorized to create states');
            return `Error: 401 User not authorized to create states`;
        }

        //Validate session duration 
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateSession(user.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            return `Error: 440 Session has expired`;

        }

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, abbrevation and auctionId are provided in the request body\n`)
        if (!name || !abbrevation || !auctionId) {

            console.error('Error: 400 name, abbrevation and auctionId are required parameters.\n');
            return `Error: 400 name, abbrevation and auctionId are required parameters.`;

        }

        // Validate that the Auction exists
        console.log(`Validating that the Auction exists\n`)
        const auction: Record<string, any> = await getAuctionById(auctionId);
        if (!auction.result) {

            console.error(`Error: 404 Auction ${auctionId} not found`);
            return `Error: 404 Auction ${auctionId} not found`;

        }

        // Validate that the State doesn't already exist
        console.log(`Validating that the State doesn't already exist\n`)
        const state: Record<string, any> = await getStateByName(name);
        if (state.result) {

            console.error(`Error: 409 State ${name} already exists`);
            return `Error: 409 State ${name} already exists`;

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
            user.id,
            ACTIVE
        );
        const createdState: Record<string, any> = await createState(newState);

        if (!createdState.createdState) {

            console.error(`Error: 500 Failed to create State ${name}`);
            return `Error: 500 Failed to create State ${name}`;

        }

        console.log(`State ${name} created successfully\n`);
        return createdState.result;

    } catch (err) {

        console.error(`Error: 500 Failed to create State ${name}: ${err}`);
        return `Error: 500 Failed to create State ${name}: ${err}`;

    }
}

export default createStateHandler;