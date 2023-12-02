import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class State {

    constructor(
        id: string,
        name: string,
        abbrevation: string,
        auctionId: string,
        createdAt: string,
        createdBy: string,
        status: string
    ) {
        this.id = id;
        this.name = name;
        this.abbrevation = abbrevation;
        this.auctionId = auctionId;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.status = status;
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