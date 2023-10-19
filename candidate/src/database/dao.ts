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

    async storeCandidate(email: string, password: string, first_name: string, last_name: string) {
        const query = `INSERT INTO "Candidate" ("email", "password", "first_name", "last_name") VALUES (:email, :password, :first_name, :last_name)`
        const queryPrepared = bind(query, {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        })
        try {
            await this.client.query(queryPrepared)
            console.log('Candidate reigstered!')
            return { msg: '201' }
        } catch (err) {
            console.log(err)
        }
        return { msg: '400' }
    }

    async updateCandidateProfile(email: string, role: string, languages: string[], soft_skills: string[], location: string, technical_data: string[], academical_data: string[], experience: string[], work_data: string[], is_available: string, interview_id: string, address: string) {

        const query = `UPDATE "Candidate" set role = :role, 
            languages = :languages, 
            soft_skills = :soft_skills, 
            location = :location,
            technical_data = :technical_data,
            academical_data = :academical_data,
            experience = :experience,
            work_data = :work_data,
            is_available = :is_available,
            interview_id = :interview_id,
            address = :address
            where email = :email`

        const queryPrepared = bind(query, {
            role: role,
            languages: languages,
            email: email,
            soft_skills: soft_skills,
            location: location,
            technical_data: technical_data,
            academical_data: academical_data,
            experience: experience,
            work_data: work_data,
            is_available: is_available,
            interview_id: interview_id,
            address: address
        })
        try {
            await this.client.query(queryPrepared)
            console.log('Candidate updated!')
            return { msg: '201' }
        } catch (err) {
            console.log(err)
        }
        return { msg: '400' }
    }

    async getCandidateInfo(email: string) {
        const query = `SELECT *  FROM  "Candidate" WHERE email = :email`

        const queryPrepared = bind(query, {
            email: email,
        })

        try {
            const res = await this.client.query(queryPrepared)
            console.log('Email information')
            return {
                personId: res.rows[0].personId,
                country: res.rows[0].country,
                languages: res.rows[0].languages,
                academicalDataId: res.rows[0].academicalDataId,
                technicalDataId: res.rows[0].technicalDataId,
                workDataId: res.rows[0].workDataId,
                isAvailable: res.rows[0].isAvailable,
                softSkills: res.rows[0].softSkills,
                interviewId: res.rows[0].interviewId,
                email: res.rows[0].email,
                password: res.rows[0].password,
            }
        } catch (err) {
            console.log(err)
        }
        return { msg: '400' }
    }
}

export default Dao;
