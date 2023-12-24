import { QueryResult, RecordShape, Session } from 'neo4j-driver';
import { Car } from '../../entities/Car';
import driver from '../db';
import { GenericReturn } from '../../entities/genericReturn';


export const createCar = async (car: Car): Promise<GenericReturn> => {

    console.log(`opening neo4j session\n`)
    const session: Session = driver.session();
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        console.log(`session opened, creating car vin:${car.vin}\n`);

        const queryResult: QueryResult<RecordShape> = await session.run(
            `
                MATCH (u:User {id: $userId})
                MATCH (c:Company {id: $companyId})
                CREATE (car:Car {
                    id: $id, 
                    companyId: $companyId,
                    userId: $userId,
                    description: $description, 
                    make: $make,
                    model: $model,
                    modelYear: $modelYear,
                    vin: $vin,
                    mileage: $mileage,
                    color: $color,
                    transmission: $transmission,
                    engine: $engine,
                    drivetrain: $drivetrain,
                    fuelType: $fuelType,
                    title: $title,
                    condition: $condition,
                    price: $price,
                    priceDue: $priceDue,
                    transporationPrice: $transporationPrice,
                    transporationPriceDue: $transporationPriceDue,
                    createdAt: $createdAt, 
                    createdBy: $createdBy, 
                    status: $status,
                    owner: $owner
                }) 
                MERGE (u)-[:CREATED]->(car)<-[:IMPORTED_BY]-(c)
                RETURN c
            `,
            {
                id: car.id,
                companyId: car.companyId,
                userId: car.assignedTo,
                description: car.description,
                make: car.make,
                model: car.model,
                modelYear: car.modelYear,
                vin: car.vin,
                mileage: car.mileage,
                color: car.color,
                transmission: car.transmission,
                engine: car.engine,
                drivetrain: car.drivetrain,
                fuelType: car.fuelType,
                title: car.title,
                condition: car.condition,
                price: car.price,
                priceDue: car.priceDue,
                transporationPrice: car.transporationPrice,
                transporationPriceDue: car.transporationPriceDue,
                createdAt: car.createdAt,
                createdBy: car.createdBy,
                status: car.status,
                owner: car.owner
            }
        );

        if (!queryResult.records[0]) {

            console.error(`500: failed to create car ${car.vin} with id ${car.id}`);
            result.result = `failed`;
            result.statusCode = 500;
            result.message = `Error: 500 Failed to create car ${car.vin} with id ${car.id}`;

            return result

        } else {

            const createdCar: Record<string, any> = queryResult.records[0].get('c').properties;
            console.log(`Car ${createdCar.vin} created with id: ${createdCar.id}\n`);

            result.result = `success`;
            result.statusCode = 200;
            result.message = `200: Car ${createdCar.vin} created with id ${createdCar.id}`;
            result.id = createdCar.id;
            result.data = createdCar;

            return result;

        }

    } catch (err) {

        console.error(`500: failed to create car ${car.vin}: ${err}`);
        result.result = `failed`;
        result.statusCode = 500;
        result.message = `Error: 500 Failed to create car ${car.vin}: ${err}`;

        return result;

    } finally {

        await session.close();
        console.log(`neo4j session closed\n`);

    }

}