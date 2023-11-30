import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {

    constructor() {
        this.id = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.userType = '';
        this.createdAt = '';
        this.token = '';
        this.lastLogin = '';
        this.error = '';
        this.result = false;
    }

    @Field(() => ID)
    id: string;

    @Field(() => String)
    username: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    userType: string;

    @Field(() => String)
    createdAt: String;

    @Field(() => String)
    lastLogin: String;

    @Field(() => String)
    token: string;

    @Field(() => String)
    error: string;

    @Field(() => Boolean)
    result: boolean;

}