import crypto = require('crypto');
import { randomBytes } from 'crypto';
import speakeasy = require("speakeasy");
import toast from "react-hot-toast";
import { encryptAuthPM } from '../encryption/clientEncryption';

export async function generateAES(){
    try {
        const key = crypto.randomBytes(32).toString('hex');
        return key;
    } catch (err) {
        return {
            message: "An error occurred while generating the AES key, please try again",
        };
    }
}

export async function generateID(bruteforceSafe: boolean) {
    try {
        // if bruteforcesafe is false default length is 5, if true default length is 90
        let length = bruteforceSafe ? 90 : 5;
        let result = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
        
    } catch (err) {
        return {
            message: "An error occurred while generating the ID, please try again",
        };
    }
}

export async function generateIV(){
    try {
        const iv = crypto.randomBytes(16);
        return iv;
    } catch (err) {
        return {
            message: "An error occurred while generating the IV, please try again",
        };
    }
}

export async function generatePassword(length: number) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?';
    const charsetLength = charset.length;
    const maxValidByte = 256 - (256 % charsetLength);
  
    let password = '';
    while (password.length < length) {
      const randomBytesArray = randomBytes(length);
      for (let i = 0; i < randomBytesArray.length && password.length < length; i++) {
        const randomByte = randomBytesArray[i];
        if (randomByte < maxValidByte) {
          const randomIndex = randomByte % charsetLength;
          password += charset[randomIndex];
        }
      }
    }
  
    return password;
  };


  export function generateToken() {
    return crypto
      .randomBytes(96)
      .toString("base64")
      .replace(/\+/g, "0")
      .replace(/\//g, "1")
      .slice(0, 64);
  }


  export async function generateTempToken(
    user_id: number,
    fqe: string,
    service: string,
    token: any,
    password: string,
    fast_login: boolean
  ) {
    try {
      // @todo -> add fast login call from userDetails and check if enabled or not / then pwd passthrough or not
  
      const resCheck = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/jwt`, // @TODO -> work on this needed
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );
      const dataCheck = await resCheck.json();
  
      if (!resCheck.ok) {
        toast.error(dataCheck.message);
        return;
      }
  
      if (dataCheck.fqe !== fqe) {
        console.error("Invalid token, please Login again");
        toast.error("Invalid token, please Login again");
        return;
      }
  
      const tempToken = generateToken();
      const e2eeSecretKey = fast_login ? generateToken() : "";
      const encryptedPwd = fast_login ? encryptAuthPM(password, e2eeSecretKey) : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/db/saveTempToken`, // @TODO -> work on this needed
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            fqe: fqe,
            token: tempToken,
            service: service,
            password: encryptedPwd,
            fast_login: fast_login,
          }),
        }
      );
  
      const data = await res.json();
  
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
  
      const redirectUrl = fast_login
        ? process.env.NEXT_PUBLIC_WEBMAIL_AUTH_DOMAIN +
          tempToken +
          "/" +
          e2eeSecretKey
        : process.env.NEXT_PUBLIC_WEBMAIL_AUTH_DOMAIN + tempToken;
  
      return redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return 0;
    }
  }
  
  export function generate2FASecretKey() {
    return speakeasy.generateSecret({ length: 20 }).base32;
  }
  