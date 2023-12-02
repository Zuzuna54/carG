import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class GenericReturn {

    constructor(
        id: string,
        statusCode: number,
        message: string,
        result: string,
        data: any

    ) {
        this.id = id;
        this.statusCode = statusCode;
        this.message = message;
        this.result = result;
        this.data = data;
    }

    @Field(() => ID)
    id: string;

    @Field(() => Number)
    statusCode: number;

    @Field(() => String)
    message: string;

    @Field(() => String)
    result: string;

    @Field(() => String)
    data: any;
}