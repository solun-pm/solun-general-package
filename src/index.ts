// src: src/utils/encryption/clientEncryption.ts
import { encrypt, decrypt, encryptTransfer, decryptTransfer, encryptAuthPM, decryptAuthPM } from './utils/encryption/clientEncryption';
export { encrypt, decrypt, encryptTransfer, decryptTransfer, encryptAuthPM, decryptAuthPM };

// src: src/utils/database/dbConn.ts
//import dbConnect from './utils/database/dbConn';
//export { dbConnect };
// ***** NOW UNDER THE | solun-database-package | PACKAGE *****

// src: src/utils/database/dbUtils.ts
//import { findOneDocument, deleteOneDocument } from './utils/database/dbUtils';
//export { findOneDocument, deleteOneDocument };
// ***** NOW UNDER THE | solun-database-package | PACKAGE *****

// src: src/utils/encryption/encryption.ts
//import { encrypt, decrypt, encryptFile, decryptFile, decryptFileData } from './utils/encryption/encryption';
//export { encrypt, decrypt, encryptFile, decryptFile, decryptFileData };
// ***** NOW UNDER THE | solun-server-encryption-package | PACKAGE *****

// src: src/utils/generate/generate.ts
import { generateAES, generateID, generateIV, generatePassword, generateToken, generateTempToken, generate2FASecretKey, generateAliasName, generateRecoveryCode } from './utils/generate/generate';
export { generateAES, generateID, generateIV, generatePassword, generateToken, generateTempToken, generate2FASecretKey, generateAliasName, generateRecoveryCode };


// src: src/utils/hash/hash.ts
import { hashPassword, comparePassword } from './utils/hash/hash';
export { hashPassword, comparePassword };

// src: src/utils/mail/SenderName.ts
import { extractContentOutsideTags } from './utils/mail/SenderName';
export { extractContentOutsideTags };

// src: src/utils/date/format.ts
import { getFormattedDateWithTime, getFormattedDate } from './utils/date/format';
export { getFormattedDateWithTime, getFormattedDate };

import { formatBytes } from './utils/storage/format';
export { formatBytes };

// src: src/models
//import AppPassword from './models/appPasswords';
//import File from './models/file';
//import Message from './models/message';
//import TempToken from './models/tempToken';
//import User from './models/user';
//import FunctionErrLog from './models/functionErrLog';
//export { AppPassword, File, Message, TempToken, User, FunctionErrLog };
// ***** NOW UNDER THE | solun-database-package | PACKAGE *****

// src: src/bird/handler
//import { saveError } from './bird/handler';
//export { saveError };
// ***** NOW UNDER THE | solun-database-package | PACKAGE *****

import { checkUsername, checkPassword } from './utils/validation/user_login';
export { checkUsername, checkPassword };

import { isValidEmail } from './utils/validation/email';
export { isValidEmail };