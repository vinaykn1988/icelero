import { DynamoDB } from "aws-sdk";

class Dao{

    tableName:string;
    DDB: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();

    constructor(table: any){
        this.tableName = table;
        let offlineOptions : any = {
            region: "localhost",
            endpoint: "http://localhost:8000"
        };
        this.DDB = process.env.IS_OFFLINE ? new DynamoDB.DocumentClient(offlineOptions) : new DynamoDB.DocumentClient();
    }

    async save(item: any): Promise<any>{
        let params:any = {
            TableName: this.tableName,
            Item: item
        }

        await this.DDB.put(params).promise();

        console.log('saved item');

        return item;

    }

    async get(id: any): Promise<any>{

        let params:any = {
            TableName: this.tableName,
            Key: {
                id: id
              },
        }

        let result = await this.DDB.get(params).promise();

        console.log('got item');

        return result.Item;

    }

    async delete(id:any): Promise<any>{

        let params = {
            TableName: this.tableName,
            Key: {
              id: id
            },
          };


        let result = await this.DDB.delete(params).promise();  

        return result;

    }

    async getall(): Promise<any[]> {

            console.log('inside get all');

            let getParms = {
                TableName: this.tableName
            };

            try {
                let res = await this.DDB.scan(getParms).promise();
                let result = res.Items && res.Items.length > 0 ? res.Items as any: [];

                return result;
            } catch (e) {
                console.log(e);
                return [];
            }
    }
}

export { Dao };

