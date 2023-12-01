import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class State {

    constructor() {
        this.id = '';
        this.name = '';
        this.abbrevation = '';
        this.auctionId = '';
        this.createdAt = '';
        this.createdBy = '';
        this.status = '';
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    abbrevation: string;

    @Field(() => ID)
    auctionId: string;

    @Field(() => String)
    createdAt: String;

    @Field(() => String)
    createdBy: string;

    @Field(() => String)
    status: string;

}