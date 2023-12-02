import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Price {

    constructor(

    ) {
        this.id = '';
        this.name = '';
        this.cost = 0;
        this.locationId = '';
        this.companyId = '';
        this.description = '';
        this.createdAt = '';
        this.createdBy = '';
        this.status = '';
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

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