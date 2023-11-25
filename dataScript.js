const fs = require('fs');

const generateDummyData = () => {
    const companies = [
        {
            "name": "Estimated Prices",
            "id": 1,
            "title": "Estimated Prices",
            "description": "Estimated Prices description",
            "auctions": [

            ]
        }
    ];
    const auctions = ["IAAI", "Copart"];

    // Generate dummy data for companies
    for (let companyId = 0; companyId <= 10; companyId++) {

        if (companyId === 0) {
            let company = companies[0]
            // Generate dummy data for auctions
            for (let i = 0; i < auctions.length; i++) {
                const auction = {
                    "name": `${auctions[i]}`,
                    "id": i + 1,
                    "title": `Auction ${i + 1} title`,
                    "description": `Auction ${i + 1} description`,
                    "states": []
                };

                // Generate dummy data for states
                for (let stateId = 1; stateId <= 10; stateId++) {
                    const state = {
                        "name": `State ${stateId}`,
                        "id": stateId,
                        "title": `State ${stateId} title`,
                        "description": `State ${stateId} description`,
                        "locations": []
                    };

                    // Generate dummy data for locations
                    for (let locationId = 1; locationId <= 10; locationId++) {
                        const location = {
                            "name": `Location ${locationId}`,
                            "id": locationId,
                            "title": `Location ${locationId} title`,
                            "description": `Location ${locationId} description`,
                            "address": `Location ${locationId} address`,
                            "city": `Location ${locationId} city`,
                            "price": 800 + locationId * 100
                        };
                        state.locations.push(location);
                    }

                    auction.states.push(state);
                }

                company.auctions.push(auction);
            }
        } else {

            const company = {
                "name": `Company ${companyId}`,
                "id": companyId,
                "title": `Company ${companyId}`,
                "description": `Company ${companyId} description`,
                "rating": Math.floor(Math.random() * 5) + 1,
                "auctions": []

            };

            // Generate dummy data for auctions
            for (let i = 0; i < auctions.length; i++) {
                const auction = {
                    "name": `${auctions[i]}`,
                    "id": i + 1,
                    "title": `Auction ${i + 1} title`,
                    "description": `Auction ${i + 1} description`,
                    "states": []
                };

                // Generate dummy data for states
                for (let stateId = 1; stateId <= 10; stateId++) {
                    const state = {
                        "name": `State ${stateId}`,
                        "id": stateId,
                        "title": `State ${stateId} title`,
                        "description": `State ${stateId} description`,
                        "locations": []
                    };

                    // Generate dummy data for locations
                    for (let locationId = 1; locationId <= 10; locationId++) {
                        const location = {
                            "name": `Location ${locationId}`,
                            "id": locationId,
                            "title": `Location ${locationId} title`,
                            "description": `Location ${locationId} description`,
                            "address": `Location ${locationId} address`,
                            "city": `Location ${locationId} city`,
                            "price": 800 + locationId * 100
                        };
                        state.locations.push(location);
                    }

                    auction.states.push(state);
                }

                company.auctions.push(auction);
            }


            companies.push(company);
        }
    }

    return {
        "response": "success",
        "data": {
            "companies": companies
        }
    };
};

// Write dummy data to a JSON file
const dummyData = generateDummyData();
const jsonString = JSON.stringify(dummyData);
fs.writeFileSync('dummy_data.json', jsonString);

console.log('Dummy data generated and saved to dummy_data.json');
