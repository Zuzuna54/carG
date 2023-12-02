import { createCar } from '../../neo4jCalls/carCalls/createCar';
import { getCarByVin } from '../../neo4jCalls/carCalls/getCarByVin';
import { getCompanyById } from '../../neo4jCalls/compnayCalls/getCompanyById';
import { getUserById } from '../../neo4jCalls/userCalls/getUserById';
import { v4 as uuidv4 } from 'uuid';
import { Car } from '../../entities/Car';
import { ACTIVE, SUPER_ADMIN, COMPANY_ADMIN } from '../../constants/constants';
import { validateSession, decodeToken, validateVin } from '../../utils/utils';
import { GenericReturn } from "../../entities/genericReturn";

const createCarHandler = async (

    companyId: string,
    userId: string,
    description: string,
    make: string,
    model: string,
    modelYear: number,
    vin: string,
    mileage: number,
    color: string,
    transmission: string,
    engine: string,
    drivetrain: string,
    fuelType: string,
    title: string,
    condition: string,
    price: number,
    priceDue: number,
    transporationPrice: number,
    transporationPriceDue: number,
    jwtToken: string | undefined

): Promise<GenericReturn> => {

    console.log(`initiating createCarHandler \n`);
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

        //Decode the JWT token
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

        //Validate userType
        console.log(`Validating userType\n`)
        if (user?.userType !== SUPER_ADMIN && user?.userType !== COMPANY_ADMIN) {

            console.error('Error: 401 User not authorized to create cars');
            result.result = `failed`;
            result.statusCode = 401;
            result.message = `Error: 401 User not authorized to create cars`;

            return result;

        }

        //Validate that companyId, userId, vin, price, transportationPrice, priceDue and transportationPriceDue are not empty
        console.log(`Validating that companyId, userId, vin, price, transportationPrice, priceDue and transportationPriceDue are not empty\n`)
        if (!companyId || !vin || !price || !transporationPrice || !priceDue || !transporationPriceDue) {

            console.error('Error: 400 Missing required fields');
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 Missing required fields`;

            return result;

        }

        //validate vin
        console.log(`Validating vin\n`)
        const vinValidated: boolean = validateVin(vin);
        if (!vinValidated) {

            console.error('Error: 400 Invalid vin');
            result.result = `failed`;
            result.statusCode = 400;
            result.message = `Error: 400 Invalid vin`;

            return result;

        }

        //Validate companyId company exists
        console.log(`Validating companyId company exists\n`)
        const companyExists: GenericReturn = await getCompanyById(companyId);
        if (companyExists.statusCode !== 200) {

            console.error(`Error: 404 Company ${companyId} not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 Company ${companyId} not found`;

            return result;

        }

        //Validate userId user exists
        console.log(`Validating userId user exists\n`)
        const userExists: GenericReturn = await getUserById(userId);
        if (userExists.statusCode !== 200) {

            console.error(`Error: 404 User ${userId} not found`);
            result.result = `failed`;
            result.statusCode = 404;
            result.message = `Error: 404 User ${userId} not found`;

            return result;

        }

        //Validate car doesn't already exist
        console.log(`Validating car doesn't already exist\n`)
        const carExists: GenericReturn = await getCarByVin(vin);
        if (carExists.statusCode === 200) {

            console.error(`Error: 409 Car ${vin} already exists`);
            result.result = `failed`;
            result.statusCode = 409;
            result.message = `Error: 409 Car ${vin} already exists`;

            return result;

        }

        //Generate a UUID for the Car
        console.log(`Generating a UUID for the Car\n`)
        const id: string = uuidv4();

        //Create a new Car object
        console.log(`Creating a new Car object\n`)
        const car: Car = new Car(
            id,
            companyId,
            userId,
            description,
            make,
            model,
            modelYear,
            vin,
            mileage,
            color,
            transmission,
            engine,
            drivetrain,
            fuelType,
            title,
            condition,
            price,
            priceDue,
            transporationPrice,
            transporationPriceDue,
            new Date().toISOString(),
            user.username,
            ACTIVE,
        );

        //Create the Car
        console.log(`Creating the Car\n`)
        const carCreated: GenericReturn = await createCar(car);
        if (carCreated.statusCode !== 200) {

            console.error(`Error: 500 ${carCreated.message} car could not be created\n`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 ${carCreated.message} car could not be created`;

            return result;

        }

        console.log(`Car ${id} created successfully\n`);
        result.id = id;
        result.result = `success`;
        result.statusCode = 200;
        result.message = carCreated.message;

        return result;

    } catch (error) {

        console.error(`Error: ${error}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: ${error}`;

        return result;

    }
}

export default createCarHandler;