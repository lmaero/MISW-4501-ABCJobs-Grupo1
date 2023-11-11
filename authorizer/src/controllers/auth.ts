import Dao from '../database/dao'
import { Login } from '../schemas/Login'
import { decodeToken, generateAccessToken, tokenExpired } from '../utils/utils'

let dao: Dao

try {
  dao = new Dao()
} catch (e) {
  console.log('Database connection not established!')
}

export async function authenticateUser(info: Login) {
  const email = info.email
  const password = info.password
  const type = info.type
  const { found, isCandidate, id } = await dao.isUserRegistered(email, password, type)

  if (found) {
    const id_type = isCandidate ? "candidateid": "company_id"
    const token = await generateAccessToken(email, type, id_type, id)
    await dao.authenticateUser(email, password, token, isCandidate)

    return {
      email: email,
      token: token,
    }
  } else {
    return {
      email: null,
      token: null,
    }
  }
}

export async function getInfo(token: string) {
  let isTokenExpired;
  let info;

  try {
    info = await decodeToken(token)
    isTokenExpired = await tokenExpired(info.exp)
  } catch (e) {
    return { msg: 'The token is not valid, provide a valid token. ' }
  }

  if (isTokenExpired) {
    return { msg: 'The token expired, you have to authenticate again. ' }
  }

  const email: string = info.email
  const type: string = info.type
  const result = await dao.getInfo(email, type)

  if (result.msg === '200') {
    if (type === "Candidate") {
      return {
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        candidateid: result.candidateid,
        type: result.type,
      }
    } else {
      return {
        email: result.email,
        company_name: result.company_name,
        company_id: result.company_id,
      }
    }
  } else {
    return { msg: 'Invalid token provided' }
  }
}
