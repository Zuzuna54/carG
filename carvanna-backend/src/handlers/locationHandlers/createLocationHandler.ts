import { createLocation } from "../../neo4jCalls/locationCalls/createLocation";
import { getLocationByName } from "../../neo4jCalls/locationCalls/getLocationByName";
import { getStateById } from "../../neo4jCalls/stateCalls/getStateById";
import { v4 as uuidv4 } from "uuid";
import { Location } from "../../entities/Location";
import { decodeToken, validateSession } from '../../utils/utils';
import { ACTIVE, SUPER_ADMIN } from "../../constants/constants";
import { GenericReturn } from "../../entities/genericReturn";

const createLocationHandler = async (

    name: string,
    stateId: string,
    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating createLocationHandler \n`);
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

            console.error('Error: 401 User not authorized to create locations');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create locations`;

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

        //Validate location name
        console.log(`Validating location name\n`)
        const locationNameValidated: GenericReturn = await getLocationByName(name);
        if (locationNameValidated.statusCode === 200) {

            console.error(`Error: ${locationNameValidated.statusCode} ${locationNameValidated.result}`);
            result.result = `failed`;
            result.statusCode = locationNameValidated.statusCode;
            result.message = `Error: ${locationNameValidated.statusCode} ${locationNameValidated.result}`;

            return result;

        }

        //Validate state id
        console.log(`Validating state id\n`)
        const stateIdValidated: GenericReturn = await getStateById(stateId);
        if (stateIdValidated.statusCode !== 200) {

            console.error(`Error: ${stateIdValidated.statusCode} ${stateIdValidated.result}`);
            result.result = `failed`;
            result.statusCode = stateIdValidated.statusCode;
            result.message = stateIdValidated.message

            return result;
        }

        //Validate that the location does not already exist
        console.log(`Validating that the location does not already exist\n`)
        const location: GenericReturn = await getLocationByName(name);
        if (location.statusCode === 200) {

            console.error(`Error: 409 Location ${name} already exists`);
            result.result = `failed`;
            result.statusCode = 409;
            result.message = `Error: 409 Location ${name} already exists`;

            return result;

        }

        //Create the location
        console.log(`Creating the location\n`)
        const locationId: string = uuidv4();
        const locationToBeCreated: Location = new Location(locationId, name, stateId, new Date().toISOString(), user.username, ACTIVE);
        const locationCreated: GenericReturn = await createLocation(locationToBeCreated);

        if (locationCreated.statusCode !== 200) {

            console.error(`Error: 500 ${locationCreated.message}`);
            result.result = `failed`;
            result.statusCode = locationCreated.statusCode;
            result.message = `Error: 500 ${locationCreated.message}`;

            return result;

        }

        console.log(`Location ${name} created successfully\n`);
        result.id = locationId;
        result.result = `success`;
        result.statusCode = 200;
        result.message = locationCreated.message;

        return result;

    } catch (err) {

        console.error(`Error: 500 Failed to create location ${name}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create location ${name}: ${err}`;

        return result;

    }

}

export default createLocationHandler;