const { Client } = require('pg');
const bind  = require('pg-bind');


class Dao {
    private client: any;

    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'postgres',
            port: 5432,
        });
        this.client.connect();
    }

    async createUser(email: string, firstname: string, lastname: string, age: number) {
        console.log(email);
        const tableAvailable = await this.isTableOk();

        if (tableAvailable) {
            console.log(tableAvailable);

            const query =
                `INSERT INTO users ("email", "firstname", "lastname", "age") VALUES (:email, :firstname, :lastname, :age)`;

            const queryPrepared = bind(query, {
                email: email,
                firstname: firstname,
                lastname: lastname,
                age: age
            });

            try {
                const res = await this.client.query(queryPrepared);
                console.log('User successfully created');
            } catch (err) {
                console.log(err);
            }
        } else {
            return {msg: "400"}
        }

    }

    async isTableOk() {

        const query = `
    SELECT EXISTS(SELECT 1 FROM pg_tables WHERE tablename = 'users') AS table_existence
    `;
        let res: any;
        try {
            res = await this.client.query(query);
            console.log('isTableOk validation executed');
        } catch (err) {
            console.log(err);
        }
        const tableExistence = res['rows'][0]['table_existence'];
        return tableExistence;
    }

    async authenticateUser(personId: number, country: string, lenguages: string, academicalDataId: number, technicalDataId: number, workDataId: number, isAvailable: boolean, softSkills: string, interviewId: number, email: string, password: string, token: string) {

        // Generate token

        // Insert the information
        const query = `INSERT INTO "Candidate" ("personId", "country", "lenguages", "academicalDataId", "technicalDataId", 
        "workDataId", "isAvailable", "softSkills", "interviewId", "email", "password", "token")
        VALUES (:personId, :country, :lenguages, :academicalDataId, :technicalDataId,
         :workDataId, :isAvailable, :softSkills, :interviewId, :email, :password, :token)`;

            const queryPrepared = bind(query, {
                personId: personId,
                country: country,
                lenguages: lenguages,
                academicalDataId: academicalDataId,
                technicalDataId: technicalDataId,
                workDataId: workDataId,
                isAvailable: isAvailable,
                softSkills: softSkills,
                interviewId: interviewId,
                email: email,
                password: password,
                token: token
            });

            try {
                const res = await this.client.query(queryPrepared);
                console.log('Token update');
                return {msg: "201"};
            } catch (err) {
                console.log(err);
            }
            return {msg: "400"}
        }

    async getUserInfo(email: string) {

        const query = `SELECT *  FROM  "Candidate" WHERE email = :email`;

        const queryPrepared = bind(query, {
            email: email,
        });

        try {
            const res = await this.client.query(queryPrepared);
            console.log('Email information');
            const info = {
                personId: res.rows[0]['personId'],
                country: res.rows[0]['country'],
                lenguages: res.rows[0]['lenguages'],
                academicalDataId: res.rows[0]['academicalDataId'],
                technicalDataId: res.rows[0]['technicalDataId'],
                workDataId: res.rows[0]['workDataId'],
                isAvailable: res.rows[0]['isAvailable'],
                softSkills: res.rows[0]['softSkills'],
                interviewId: res.rows[0]['interviewId'],
                email: res.rows[0]['email'],
                password: res.rows[0]['password']
            }
            return info;
        } catch (err) {
            console.log(err);
        }
        return {msg: "400"}
    }
};
export default Dao;



