import {decodeToken, generateAccessToken, tokenExpired} from '../src/utils/utils'
import jwtDecode from "jwt-decode";
import Dao from "../src/database/dao"
import {IUserInfo} from "../src/interfaces/interfaces";
import {authenticateUser, getUserInfo} from "../src/controllers/auth";

jest.mock('../src/utils/utils', () => ({
  generateAccessToken: jest.fn(() => ({token: 1234})),
  decodeToken: jest.fn(() => ({token: 1234, email: "al@hotmail.com"})),
  tokenExpired: jest.fn().mockReturnValueOnce(true),
}));

jest.mock("../src/database/dao")
jest.mock('jwt-decode', () => jest.fn());


describe('token expired', () => {

  test('Token expired', async () => {
    const token = '12345';
    const result = { msg: 'The token expired, you have to authenticate again. ' };
    let expected;

    try {
      expected = await getUserInfo(token);
    } catch (e) {
      const error: any = e;
      console.log(error);
    }
    expect(expected).toStrictEqual(result);
  })
})