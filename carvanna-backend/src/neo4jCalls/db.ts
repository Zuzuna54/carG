import neo4j, { Driver } from 'neo4j-driver';

const uri: string = 'bolt://localhost:7687'; // Update with your Neo4j URI
const user: string = 'neo4j';
const password: string = 'carvanna';

const driver: Driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export default driver;

