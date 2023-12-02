import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Location {

    constructor(
        id: string,
        name: string,
        stateId: string,
        createdAt: string,
        createdBy: string,
        status: string
    ) {
        this.id = id;
        this.name = name;
        this.stateId = stateId;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.status = status;
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