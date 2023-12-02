import { createAuction } from "../../neo4jCalls/auctionCalls/createAuction";
import { getAuctionByName } from "../../neo4jCalls/auctionCalls/getAuctionByName";
import { v4 as uuidv4 } from "uuid";
import { Auction } from "../../entities/Auction";
import { decodeToken, validateSession } from '../../utils/utils';
import { ACTIVE, SUPER_ADMIN } from "../../constants/constants";
import { GenericReturn } from "../../entities/genericReturn";



const createAuctionHandler = async (

    name: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating createAuctionHandler \n`);
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

            console.error('Error: 401 User not authorized to create auctions');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create auctions`;

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
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)
        if (!name || !description || !address || !phone || !email) {

            console.error('Error: 400 name, description, address, phone and email are required parameters.\n');
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 name, description, address, phone and email are required parameters.`;

            return result;

        }

        // Validate that the Auction doesn't already exist
        console.log(`Validating that the Auction doesn't already exist\n`)
        const auctionReturned: GenericReturn = await getAuctionByName(name);
        if (auctionReturned.statusCode === 200) {

            console.error(`Error: 409 Auction ${name} already exists\n`);
            result.result = `failed`;
            result.statusCode = 409;
            result.message = `Error: 409 Auction ${name} already exists`;

            return result;

        }

        //Generate ID
        console.log(`Generating ID`)
        const id: string = uuidv4();

        // Create the Auction
        console.log(`Creating the Auction\n`)
        const auction: Auction = new Auction(
            id,
            name,
            description,
            address,
            phone,
            email,
            new Date().toISOString(),
            user?.username,
            ACTIVE
        );

        const auctionCreated: Record<string, any> = await createAuction(auction);
        if (auctionCreated.statusCode !== 200) {

            console.error(`Error: 500 Auction ${auctionCreated.message} could not be created\n`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Auction ${auctionCreated.message} could not be created`;

            return result;

        }

        console.log(`Auction ${id} created successfully\n`);
        result.id = id;
        result.result = `success`;
        result.statusCode = 200;
        result.message = auctionCreated.result;

        return result;

    } catch (err) {

        console.error(`Error: ${err}\n`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${err}`;

        return result;

    }
}

export default createAuctionHandler;

