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
        if (companies?.statusCode !== 200) {
            return companies as GenericReturn;
        }

        if (auctions?.statusCode !== 200) {
            return auctions as GenericReturn;
        }

        if (states?.statusCode !== 200) {
            return states as GenericReturn;
        }

        if (locations?.statusCode !== 200) {
            return locations as GenericReturn;
        }

        if (prices?.statusCode !== 200) {
            return prices as GenericReturn;
        }

        if (locations?.data && prices?.data) {
            console.log('locations.data and prices.data exist');
            console.log(`locations.data: ${locations.data}`);
            console.log(`prices.data: ${prices.data}`);
        }

        //Massage data into desired format
        for (let i = 0; i < companies.data.length; i++) {
            const company = companies.data[i];

            if (company.status === ACTIVE) {

                // Add auctions to company
                company.auctions = [];
                for (let j = 0; j < auctions.data.length; j++) {
                    const auction = auctions.data[j];

                    if (auction.status === ACTIVE) {

                        // Add states to auction
                        auction.states = [];
                        for (let k = 0; k < states.data.length; k++) {
                            const state = states.data[k];

                            if (state.status === ACTIVE) {

                                // Add locations to state
                                state.locations = [];
                                for (let l = 0; l < locations.data.length; l++) {
                                    const location = locations.data[l];

                                    if (location.status === ACTIVE) {

                                        // Add prices to location
                                        for (let m = 0; m < prices.data.length; m++) {
                                            const price = prices.data[m];

                                            if (price.status === ACTIVE) {

                                                if (price.locationId === location.id) {
                                                    location.price = price.cost;
                                                }
                                            }
                                        }

                                        if (location.stateId === state.id) {
                                            state.locations.push(location);
                                        }
                                    }
                                }
                                if (auction.id === state.auctionId) {
                                    auction.states.push(state);
                                }
                            }
                        }
                        company.auctions.push(auction);
                    }
                }
            }
        }

        result.statusCode = 200;
        result.message = '200: Success';
        result.result = 'success';
        result.data = {
            companies: companies?.data,
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