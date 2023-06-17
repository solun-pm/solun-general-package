import crypto = require('crypto');
import { randomBytes } from 'crypto';

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