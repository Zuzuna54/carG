import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Price {

    constructor(
        id: string,
        cost: number,
        locationId: string,
        companyId: string,
        description: string,
        createdAt: string,
        createdBy: string,
        status: string
    ) {
        this.id = id;
        this.cost = cost;
        this.locationId = locationId;
        this.companyId = companyId;
        this.description = description;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.status = status;
    }

    @Field(() => ID)
    id: string;

    @Field(() => Number)
    cost: number;

    @Field(() => ID)
    locationId: string;

    @Field(() => ID)
    companyId: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    createdAt: String;

    @Field(() => String)
    createdBy: string;

    @Field(() => String)
    status: string;

}