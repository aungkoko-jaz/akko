import { DialogRef, DialogCloseResult, DialogService } from '../../../../node_modules/@progress/kendo-angular-dialog';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

export class Globalfunction {

    constructor(private dialogService: DialogService = null) {
    }
    
    private encryptSecretKey = CryptoJS.enc.Utf8.parse(environment.SecretKey);
    private encryptSecretSalt = CryptoJS.enc.Utf8.parse(environment.SecretSalt);


    encryptData(data) {
        try {
          let EncKey = CryptoJS.PBKDF2(this.encryptSecretKey, this.encryptSecretSalt, {
            keySize: 8,   //8 words = 32 byte = 256 bit
            iterations: 1000,
            hasher: CryptoJS.algo.SHA256
          });
          let EncIV = CryptoJS.lib.WordArray.random(128 / 8);  //16 bytes

          let EncResult = CryptoJS.AES.encrypt(data, EncKey, {iv:EncIV, mode:CryptoJS.mode.CBC});  
          
          
          let CombineResultHex = CryptoJS.enc.Hex.stringify(EncIV) + CryptoJS.enc.Hex.stringify(EncResult.ciphertext);
          let CombineResult = CryptoJS.enc.Hex.parse(CombineResultHex);
          return (CryptoJS.enc.Base64.stringify(CombineResult));
        } catch (e) {
          console.log(e);
        }
    }
    
    decryptData(data) {    
        try {
          let EncKey = CryptoJS.PBKDF2(this.encryptSecretKey, this.encryptSecretSalt, {
            keySize: 8,   //8 words = 32 byte = 256 bit
            iterations: 1000,
            hasher: CryptoJS.algo.SHA256
          });

          let IV_Cipher_Obj = CryptoJS.enc.Base64.parse(data);
          let IV_Cipher = CryptoJS.enc.Hex.stringify(IV_Cipher_Obj);
          let EncIV = CryptoJS.enc.Hex.parse(IV_Cipher.substring(0, 32));  //16 bytes for IV.
          let cipherText = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(IV_Cipher.substring(32, IV_Cipher.length)));
          const bytes = CryptoJS.AES.decrypt(cipherText, EncKey, {iv:EncIV, mode:CryptoJS.mode.CBC});
          if (bytes.toString()) {
            return bytes.toString(CryptoJS.enc.Utf8);
          }
          return "";
        } catch (e) {
          console.log(e);
        }
    }

     // json filter 
   FilterJsonRegExp(jsonobj: any, field: string, value: string  ) {
    return jsonobj.filter(
    function(jsonobj) {
      const fieldregx = new RegExp(jsonobj[field] + '$');
      const matchposition = value.search(fieldregx);
      return matchposition == 0;
    });
  }

}
