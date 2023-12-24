import { Field, ID, ObjectType } from "type-graphql";
import { AnyScalar } from "../utils/utils";

@ObjectType()
export class Company {
    constructor(
        id: string,
        name: string,
        description: string,
        address: string,
        phone: string,
        email: string,
        createdAt: string,
        createdBy: string,
        status: string,
        ratingsArray: Record<any, any>[],
        avgRating: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.ratingsArray = ratingsArray;
        this.avgRating = avgRating;
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    createdAt: string;

    @Field(() => String)
    createdBy: string;

    @Field(() => String)
    address: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    status: string;

    @Field(() => [AnyScalar])
    ratingsArray: Record<any, any>[];

    @Field(() => Number)
    avgRating: number;

}