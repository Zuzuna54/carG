import { createAuction } from "../../neo4jCalls/auctionCalls/createAuction";
import { getAuctionByName } from "../../neo4jCalls/auctionCalls/getAuctionByName";
import { v4 as uuidv4 } from "uuid";
import { Auction } from "../../entities/Auction";
import { decodeToken, validateSession } from '../../utils/utils';
import { ACTIVE, SUPER_ADMIN } from "../../constants/constants";


const createAuctionHandler = async (

    name: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    jwtToken: string | undefined

): Promise<string> => {

    console.log(`initiating createAuctionHandler \n`);

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

            console.error('Error: 401 User not authorized to create auctions');
            return `Error: 401 User not authorized to create auctions`;
        }

        //Validate session duration 
        console.log(`Validating session duration\n`)
        const sessionValidated: boolean = validateSession(user.lastLogIn);
        if (!sessionValidated) {

            console.error('Error: 440 Session has expired');
            return `Error: 440 Session has expired`;

        }

        // Validate that name, email, and phone are provided in the request body
        console.log(`Validating that name, email, password and userType are provided in the request body\n`)
        if (!name || !description || !address || !phone || !email) {

            console.error('Error: 400 name, description, address, phone and email are required parameters.\n');
            return `Error: 400 name, description, address, phone and email are required parameters.`;

        }

        // Validate that the Auction doesn't already exist
        console.log(`Validating that the Auction doesn't already exist\n`)
        const auctionReturned: Record<string, any> = await getAuctionByName(name);
        if (auctionReturned.result) {

            console.error(`Error: 409 Auction ${name} already exists\n`);
            return `Error: 409 Auction ${name} already exists`;

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
        if (!auctionCreated.createdAuction) {

            console.error(`Error: 500 Auction ${auctionCreated.result} could not be created\n`);
            return `Error: 500 Auction ${auctionCreated.result} could not be created`;

        }

        console.log(`Auction ${id} created successfully\n`);
        return auctionCreated.result

    } catch (err) {

        console.error(`Error: ${err}\n`);
        return `Error: ${err}`;

    }
}

export default createAuctionHandler;

