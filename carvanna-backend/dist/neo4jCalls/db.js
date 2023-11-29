"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
require('dotenv').config();
const uri = (_a = process.env.DB_URI) !== null && _a !== void 0 ? _a : '';
const user = (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : '';
const password = (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : '';
const driver = neo4j_driver_1.default.driver(uri, neo4j_driver_1.default.auth.basic(user, password));
exports.default = driver;
//# sourceMappingURL=db.js.map