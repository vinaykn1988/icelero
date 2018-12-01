"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
class Dao {
    constructor(table) {
        this.DDB = new aws_sdk_1.DynamoDB.DocumentClient();
        this.tableName = table;
        let offlineOptions = {
            region: "localhost",
            endpoint: "http://localhost:8000"
        };
        this.DDB = process.env.IS_OFFLINE ? new aws_sdk_1.DynamoDB.DocumentClient(offlineOptions) : new aws_sdk_1.DynamoDB.DocumentClient();
    }
    async save(item) {
        let params = {
            TableName: this.tableName,
            Item: item
        };
        await this.DDB.put(params).promise();
        console.log('saved item');
        return item;
    }
    async get(id) {
        let params = {
            TableName: this.tableName,
            Key: {
                id: id
            },
        };
        let result = await this.DDB.get(params).promise();
        console.log('got item');
        return result.Item;
    }
    async delete(id) {
        let params = {
            TableName: this.tableName,
            Key: {
                id: id
            },
        };
        let result = await this.DDB.delete(params).promise();
        return result;
    }
    async getall() {
        console.log('inside get all');
        let getParms = {
            TableName: this.tableName
        };
        try {
            let res = await this.DDB.scan(getParms).promise();
            let result = res.Items && res.Items.length > 0 ? res.Items : [];
            return result;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }
}
exports.Dao = Dao;
//# sourceMappingURL=dao.js.map