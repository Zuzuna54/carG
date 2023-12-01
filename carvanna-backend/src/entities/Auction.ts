import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Auction {

    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.address = '';
        this.phone = '';
        this.email = '';
        this.createdAt = '';
        this.createdBy = '';
        this.status = '';
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    address: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    createdAt: String;

    @Field(() => String)
    createdBy: string;

    @Field(() => String)
    status: string;

}