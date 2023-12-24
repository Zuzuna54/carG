import { Field, ID, ObjectType } from 'type-graphql';
import { AnyScalar } from '../utils/utils';


@ObjectType()
export class User {

    constructor(
        id: string,
        username: string,
        email: string,
        password: string,
        userType: string,
        createdAt: string,
        accessToken: string,
        refreshToken: string,
        lastLogin: string,
        error: string,
        createdBy: string,
        companyId: string,
        status: string,
        updatedAt: string,
        updatedBy: string,
        actionsArray: Record<any, any>[],
        ipLocations: Record<any, any>[],
        location: Record<string, string>

    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.createdAt = createdAt;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.lastLogin = lastLogin;
        this.error = error;
        this.createdBy = createdBy;
        this.companyId = companyId;
        this.status = status;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
        this.actionsArray = actionsArray;
        this.ipLocations = ipLocations;
        this.location = location;
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
    accessToken: string;

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

    @Field(() => [AnyScalar])
    actionsArray: Record<any, any>[];

    @Field(() => [AnyScalar])
    ipLocations: Record<any, any>[];

    @Field(() => AnyScalar)
    location: Record<string, string>;

}