import { Field, ID, ObjectType } from 'type-graphql';
import { AnyScalar } from '../utils/utils';


@ObjectType()
export class Car {

    constructor(
        id: string,
        companyId: string,
        assignedTo: string,
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
        createdAt: string,
        createdBy: string,
        updatedBy: string,
        actionsArray: Record<any, any>[],
        status: string
    ) {
        this.id = id;
        this.description = description;
        this.companyId = companyId;
        this.assignedTo = assignedTo;
        this.make = make;
        this.model = model;
        this.modelYear = modelYear;
        this.vin = vin;
        this.mileage = mileage;
        this.color = color;
        this.transmission = transmission;
        this.engine = engine;
        this.drivetrain = drivetrain;
        this.fuelType = fuelType;
        this.title = title;
        this.condition = condition;
        this.price = price;
        this.priceDue = priceDue;
        this.transporationPrice = transporationPrice;
        this.transporationPriceDue = transporationPriceDue;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.actionsArray = actionsArray;
        this.status = status;
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    companyId: string;

    @Field(() => String)
    assignedTo: string;

    @Field(() => String)
    make: string;

    @Field(() => String)
    model: string;

    @Field(() => Number)
    modelYear: number;

    @Field(() => String)
    vin: string;

    @Field(() => Number)
    mileage: number;

    @Field(() => String)
    color: string;

    @Field(() => String)
    transmission: string;

    @Field(() => String)
    engine: string;

    @Field(() => String)
    drivetrain: string;

    @Field(() => String)
    fuelType: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    condition: string;

    @Field(() => Number)
    price: number;

    @Field(() => Number)
    priceDue: number;

    @Field(() => Number)
    transporationPrice: number;

    @Field(() => Number)
    transporationPriceDue: number;

    @Field(() => String)
    createdAt: String;

    @Field(() => String)
    createdBy: string;

    @Field(() => String)
    updatedBy: string;

    @Field(() => AnyScalar)
    actionsArray: Record<any, any>[];

    @Field(() => String)
    status: string;

}

