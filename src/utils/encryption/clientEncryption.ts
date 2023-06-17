// Used for encrypting and decrypting messages sent between the client and server

import crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const ivLength = 16;

export async function encryptTransfer(message: string) {
    const iv = crypto.randomBytes(ivLength);
    const key = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted + ':' + key.toString('hex');
}
  
export async function decryptTransfer(message: string) {
    const components = message.split(':');
    // @ts-ignore: Works fine with it
    const iv = Buffer.from(components.shift(), 'hex');
    // @ts-ignore: Works fine with it
    const encryptedText = Buffer.from(components.shift(), 'hex');
    // @ts-ignore: Works fine with it
    const key = Buffer.from(components.shift(), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // @ts-ignore: Works fine with it
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    // @ts-ignore: Works fine with it
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function encryptAuthPM(text: string, password: string) {
    let iv = crypto.randomBytes(ivLength);
    let cipher = crypto.createCipheriv(
      algorithm,
      crypto.createHash("sha256").update(password).digest(),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }
  
export function decryptAuthPM(text: string, password: string) {
    try {
      let textParts = text.split(":");
      // @ts-ignore
      let iv = Buffer.from(textParts.shift(), "hex");
      let encryptedText = Buffer.from(textParts.join(":"), "hex");
      let decipher = crypto.createDecipheriv(
        algorithm,
        crypto.createHash("sha256").update(password).digest(),
        iv
      );
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (error) {
      console.error(
        "@utils/encryption.ts | Solun Auth Error - Decrypting | " + error
      );
      return "";
    }
  }