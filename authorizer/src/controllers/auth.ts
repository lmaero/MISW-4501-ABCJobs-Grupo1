import Dao from "../database/dao";
import {decodeToken, generateAccessToken} from "../utils/utils";


const dao = new Dao();

export async function authenticateUser(info: IUserInfo) {

    const personId = info.personId;
    const country = info.country;
    const lenguages = info.lenguages;
    const academicalDataId = info.academicalDataId;
    const technicalDataId = info.technicalDataId;
    const workDataId = info.workDataId;
    const isAvailable =  info.isAvailable;
    const softSkills = info.softSkills
    const interviewId = info.interviewId
    const email = info.email
    const password = info.password;
    const token = await generateAccessToken(email);

    const result= await dao.authenticateUser(personId, country, lenguages, academicalDataId, technicalDataId, workDataId, isAvailable, softSkills, interviewId, email, password, token);

    if (result['msg'] === "201"){
        return {
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
                token: token,
        }
    } else {
        return {msg: "The transaction was not succesful with the data provided", code: 400}
    }
}

export async function getUserInfo(token: any) {

    const info: any = await decodeToken(token);
    const email: string  = info['email'];

    const result = await dao.getUserInfo(email);

    // @ts-ignore
    if (result['email'] !== "") {
        return result;
    } else {
        return {msg: "Invalid token provided"};
    }

}
