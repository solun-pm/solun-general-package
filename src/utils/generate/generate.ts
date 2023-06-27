import crypto = require("crypto");
import { randomBytes } from "crypto";
import speakeasy = require("speakeasy");
import toast from "react-hot-toast";
import { encryptAuthPM } from "../encryption/clientEncryption";

export async function generateAES() {
  try {
    const key = crypto.randomBytes(32).toString("hex");
    return key;
  } catch (err) {
    return {
      message:
        "An error occurred while generating the AES key, please try again",
    };
  }
}

export async function generateID(bruteforceSafe: boolean) {
  try {
    // if bruteforcesafe is false default length is 5, if true default length is 90
    let length = bruteforceSafe ? 90 : 5;
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } catch (err) {
    return {
      message: "An error occurred while generating the ID, please try again",
    };
  }
}

export async function generateIV() {
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
  try {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?";
    const charsetLength = charset.length;
    const maxValidByte = 256 - (256 % charsetLength);

    let password = "";
    while (password.length < length) {
      const randomBytesArray = randomBytes(length);
      for (
        let i = 0;
        i < randomBytesArray.length && password.length < length;
        i++
      ) {
        const randomByte = randomBytesArray[i];
        if (randomByte < maxValidByte) {
          const randomIndex = randomByte % charsetLength;
          password += charset[randomIndex];
        }
      }
    }

    return password;
  } catch (err) {
    return {
      message:
        "An error occurred while generating the password, please try again",
    };
  }
}

export function generateToken() {
  try {
    return crypto
      .randomBytes(96)
      .toString("base64")
      .replace(/\+/g, "0")
      .replace(/\//g, "1")
      .slice(0, 64);
  } catch (err) {
    return {
      message: "An error occurred while generating the token, please try again",
    };
  }
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
    const resCheck = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/user/jwt_details`,
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
    const encryptedPwd = fast_login
      ? encryptAuthPM(password, e2eeSecretKey as string)
      : "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/save_temp_token`, // @TODO -> work on this needed
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
      ? process.env.NEXT_PUBLIC_WEBMAIL_AUTH_DOMAIN as string +
        tempToken +
        "/" +
        e2eeSecretKey
      : process.env.NEXT_PUBLIC_WEBMAIL_AUTH_DOMAIN as string + tempToken;

    return redirectUrl;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    return 0;
  }
}

export function generate2FASecretKey() {
  try {
    return speakeasy.generateSecret({ length: 20 }).base32;
  } catch (err) {
    return {
      message:
        "An error occurred while generating the 2FA secret key, please try again",
    };
  }
}


export function generateAliasName(): string {
  const adjectives = [
    'blue', 'green', 'happy', 'sunny', 'smart', 'brave', 'mellow', 'silent', 'fierce',
    'bold', 'calm', 'kind', 'vivid', 'gentle', 'wild', 'daring', 'vibrant', 'playful',
    'steady', 'graceful', 'radiant', 'blissful', 'tranquil', 'sparkling', 'serene', 'sleek',
    'crimson', 'golden', 'silver', 'purple', 'teal', 'ebony', 'velvet', 'cobalt', 'azure',
    'lush', 'amber', 'rustic', 'scarlet', 'marble', 'turquoise', 'jade', 'coral', 'copper',
    'mystic', 'whispering', 'enchanting', 'soothing', 'melodic', 'celestial', 'harmonious',
    'dreamy', 'glowing', 'ethereal', 'luminous', 'serendipitous', 'captivating', 'radiating',
    'spellbinding', 'tranquility', 'enchanted', 'dazzling', 'blissful', 'harmonic', 'starlit'
  ];

  const nouns = [
    'river', 'mountain', 'meadow', 'ocean', 'valley', 'forest', 'desert', 'garden', 'field',
    'sunset', 'horizon', 'island', 'temple', 'castle', 'canyon', 'waterfall', 'cottage',
    'moon', 'star', 'sun', 'breeze', 'wave', 'bird', 'flower', 'rainbow', 'rock', 'beach',
    'dawn', 'glimmer', 'leaf', 'crystal', 'meadow', 'creek', 'pond', 'cave', 'wilderness',
    'whisper', 'echo', 'dream', 'silence', 'wonder', 'serenity', 'happiness', 'paradise',
    'magic', 'harmony', 'tranquility', 'reflection', 'journey', 'serenade', 'chime', 'bliss',
    'horizon', 'symphony', 'cascade', 'melody', 'sapphire', 'twilight', 'zenith', 'embrace'
  ];

  const getRandomElement = (array: string[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10000);
  };

  let aliasName = '';
  while (aliasName.length < 36 || aliasName.length > 40) {
    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);
    const randomNumber = getRandomNumber();
    aliasName = `${adjective}_${noun}_${randomNumber}`;
    aliasName = aliasName.replace(/ /g, '_').replace(/-/g, '_').toLowerCase();
    aliasName = capitalizeFirstLetter(aliasName);
  }

  return aliasName;
}