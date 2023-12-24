import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import { Context } from "../contextInterface/context";
import createCarHandler from "../handlers/carHandlers/createCarHandler";
import { GenericReturn } from "../entities/genericReturn";

@Resolver()
export class CarResolver {

    /**
     * Mutation resolver to create a new car.
     * @param companyId
     * @param description
     * @param make
     * @param model
     * @param modelYear
     * @param vin
     * @param mileage
     * @param color
     * @param transmission
     * @param engine
     * @param drivetrain
     * @param fuelType
     * @param title
     * @param condition
     * @param price
     * @param priceDue
     * @param transporationPrice
     * @param transporationPriceDue
     * @param context
     * @returns
    */

    @Mutation(() => GenericReturn)
    createCar(
        @Arg("companyId", () => String) companyId: string,
        @Arg("userId", () => String) userId: string,
        @Arg("description", () => String) description: string,
        @Arg("make", () => String) make: string,
        @Arg("model", () => String) model: string,
        @Arg("modelYear", () => Number) modelYear: number,
        @Arg("vin", () => String) vin: string,
        @Arg("mileage", () => Number) mileage: number,
        @Arg("color", () => String) color: string,
        @Arg("transmission", () => String) transmission: string,
        @Arg("engine", () => String) engine: string,
        @Arg("drivetrain", () => String) drivetrain: string,
        @Arg("fuelType", () => String) fuelType: string,
        @Arg("title", () => String) title: string,
        @Arg("condition", () => String) condition: string,
        @Arg("price", () => Number) price: number,
        @Arg("priceDue", () => Number) priceDue: number,
        @Arg("transporationPrice", () => Number) transporationPrice: number,
        @Arg("transporationPriceDue", () => Number) transporationPriceDue: number,
        @Arg("owner", () => String) owner: string,
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return createCarHandler(
            companyId,
            userId,
            owner,
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
            jwtToken
        );

    }
}