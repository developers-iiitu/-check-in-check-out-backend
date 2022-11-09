import QRCode from 'qrcode'
import log from "../lib/logger";

const generateQR = async (text:string )=> {
    try {
      let base64 = await QRCode.toDataURL(text);
      log.info(base64);
      return base64;
    } catch (err) {
      console.error(err)
    }
  }

export {generateQR}