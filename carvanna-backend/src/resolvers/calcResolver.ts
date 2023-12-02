import { Query, Resolver, Ctx } from "type-graphql";
import { Context } from "../contextInterface/context";
import getCalcDataHandler from "../handlers/getCalcDataHandlers/getCalcDataHandler";
import { GenericReturn } from "../entities/genericReturn";

@Resolver()
export class CalcResolver {

    /**
    * Query resolver to get the calc data.
    * @returns
    */

    @Query(() => GenericReturn)
    getCalcData(
        @Ctx() context: Context
    ): Promise<GenericReturn> {

        const jwtToken = context.req.headers.authorization?.replace('Bearer ', '');
        return getCalcDataHandler(jwtToken);

    }
}