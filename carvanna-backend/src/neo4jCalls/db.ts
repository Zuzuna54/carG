import neo4j, { Driver } from 'neo4j-driver';
require('dotenv').config();

const uri: string = process.env.DB_URI ?? '';
const user: string = process.env.DB_USER ?? '';
const password: string = process.env.DB_PASSWORD ?? '';
const driver: Driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export default driver;

