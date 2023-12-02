import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class GenericReturn {

    constructor(
        id: string,
        statusCode: number,
        message: string,
        result: string,

    ) {
        this.id = id;
        this.statusCode = statusCode;
        this.message = message;
        this.result = result;
    }

    @Field(() => ID)
    id: string;

    @Field(() => Number)
    statusCode: number;

    @Field(() => String)
    message: string;

    @Field(() => String)
    result: string;

}