import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Location {

    constructor() {
        this.id = '';
        this.name = '';
        this.stateId = '';
        this.createdAt = '';
        this.createdBy = '';
        this.status = '';
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => ID)
    stateId: string

    @Field(() => String)
    createdAt: String;

    @Field(() => String)
    createdBy: string;

    @Field(() => String)
    status: string;

}