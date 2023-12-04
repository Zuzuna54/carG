import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {

    constructor(
        id: string,
        username: string,
        email: string,
        password: string,
        userType: string,
        createdAt: string,
        acessToken: string,
        refreshToken: string,
        lastLogin: string,
        error: string,
        createdBy: string,
        companyId: string,
        status: string,
        updatedAt: string,
        updatedBy: string

    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.createdAt = createdAt;
        this.acessToken = acessToken;
        this.refreshToken = refreshToken;
        this.lastLogin = lastLogin;
        this.error = error;
        this.createdBy = createdBy;
        this.companyId = companyId;
        this.status = status;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
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
    acessToken: string;

    @Field(() => String)
    refreshToken: string;

    @Field(() => String)
    error: string;

    @Field(() => String)
    createdBy: string;

    @Field(() => String)
    companyId: string;

    @Field(() => String)
    status: string;

    @Field(() => String)
    updatedAt: string;

    @Field(() => String)
    updatedBy: string;

}