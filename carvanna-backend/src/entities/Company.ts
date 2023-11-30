import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Company {
    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.createdAt = '';
        this.createdBy = '';
        this.address = '';
        this.phone = '';
        this.email = '';
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

}