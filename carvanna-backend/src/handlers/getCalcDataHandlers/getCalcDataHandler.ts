import { getCompany } from "../../neo4jCalls/compnayCalls/getCompany";
import { getAuction } from "../../neo4jCalls/auctionCalls/getAuction";
import { getState } from "../../neo4jCalls/stateCalls/getState";
import { getLocation } from "../../neo4jCalls/locationCalls/getLocation";
import { getPrice } from "../../neo4jCalls/priceCalls/getPrice";
import { GenericReturn } from "../../entities/genericReturn";
import { validateSession, decodeToken } from "../../utils/utils";
import { ACTIVE } from "../../constants/constants";


const handleDataRetrieval = async (getDataFunction: () => Promise<GenericReturn>, errorMessage: string): Promise<GenericReturn | null> => {
    try {
        const data = await getDataFunction();
        if (data.statusCode !== 200) {
            console.error(`Error: 404 ${errorMessage} not found`);
            return null;
        }
        return data;
    } catch (error) {
        console.error(`Error: 500 ${error}`);
        return null;
    }
};

const getCalcDataHandler = async (jwtToken: string | undefined): Promise<GenericReturn> => {
    const result: GenericReturn = new GenericReturn('', 0, '', '', '');

    try {

        //Authorization check with JWT
        if (!jwtToken) {
            console.error('Error: 498 No JWT token provided');
            result.statusCode = 498;
            result.message = 'Error 498: No JWT token provided';
            return result;
        }

        //Decode the JWT token
        const user: Record<string, any> | null = decodeToken(jwtToken);
        const sessionValidated: boolean = validateSession(user?.lastLogIn);

        //Validate session duration
        if (!sessionValidated) {
            console.error('Error: 440 Session has expired');
            result.statusCode = 440;
            result.message = 'Error: 440 Session has expired';
            return result;
        }

        // Get data from neo4j
        const [companies, auctions, states, locations, prices] = await Promise.all([
            handleDataRetrieval(() => getCompany(), 'Companies'),
            handleDataRetrieval(() => getAuction(), 'Auctions'),
            handleDataRetrieval(() => getState(), 'States'),
            handleDataRetrieval(() => getLocation(), 'Locations'),
            handleDataRetrieval(() => getPrice(), 'Prices'),
        ]);

        // Check for individual promise errors
        if (companies?.statusCode !== 200 || auctions?.statusCode !== 200 || states?.statusCode !== 200 ||
            locations?.statusCode !== 200 || prices?.statusCode !== 200) {
            // Handle individual promise errors here
            return companies || auctions || states || locations || prices as GenericReturn;
        }

        //Massage data into desired format
        const transformedCompanies = companies.data
            .filter((company: any) => company.status === ACTIVE)
            .map((company: any) => ({
                ...company,
                auctions: auctions.data
                    .filter((auction: any) => auction.status === ACTIVE)
                    .map((auction: any) => ({
                        ...auction,
                        states: states.data
                            .filter((state: any) => state.status === ACTIVE && state.auctionId === auction.id)
                            .map((state: any) => ({
                                ...state,
                                locations: locations.data
                                    .filter((location: any) => location.status === ACTIVE && location.stateId === state.id)
                                    .map((location: any) => {
                                        const price = prices.data
                                            .filter((price: any) => price.status === ACTIVE && price.locationId === location.id)
                                            .reduce((acc: any, price: any) => {
                                                acc.price = price.cost;
                                                return acc;
                                            }, {});

                                        return {
                                            ...location,
                                            ...price,
                                        };
                                    }),
                            })),
                    })),
            }));

        result.statusCode = 200;
        result.message = '200: Success';
        result.result = 'success';
        result.data = {
            companies: transformedCompanies,
        };

        return result;
    } catch (error) {
        console.error(`Error: 500 ${error}`);
        result.statusCode = 500;
        result.message = `Error: 500 ${error}`;
        return result;
    }
};



export default getCalcDataHandler;