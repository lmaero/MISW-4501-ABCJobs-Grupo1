const { Client } = require('pg')
const bind = require('pg-bind')


class Dao {
    private client;

    constructor() {
        // When using the containers use the commented part
        this.client = new Client({
            // user: process.env.POSTGRES_USER,
            // host: process.env.POSTGRES_HOST,
            // database: process.env.POSTGRES_DB_NAME,
            // password: process.env.POSTGRES_PASSWORD,
            // port: process.env.POSTGRES_PORT,
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "postgres",
            port: 5432,
        })
        this.client.connect()
    }

    async storeCompany(email: string, password: string, company_name: string) {
        const query = `INSERT INTO "Company" ("email", "password", "company_name") VALUES (:email, :password, :company_name)`
        const queryPrepared = bind(query, {
            email: email,
            password: password,
            company_name: company_name
        })
        try {
            await this.client.query(queryPrepared)
            return { msg: '201' }
        } catch (err) {
            return { msg: '400' }
        }
    }

    async updateCompanyProfile(email: string, size: string, main_address: string, segments: string[], languages: string[], main_contact: string) {

        const query = `UPDATE "Company" set size = :size, 
            main_address = :main_address, 
            segments = :segments, 
            languages = :languages,
            main_contact = :main_contact
            where email = :email
            `

        const queryPrepared = bind(query, {
            email: email,
            size: size,
            main_address: main_address,
            segments: segments,
            languages: languages,
            main_contact: main_contact
        })
        try {
            await this.client.query(queryPrepared)
            console.log('Company updated!')
            return { msg: '201' }
        } catch (err) {
            return { msg: '400' }
        }
    }
}

export default Dao;
