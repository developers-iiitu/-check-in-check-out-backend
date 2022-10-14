import nodemailer from "nodemailer";
import {google} from "googleapis";
import config from "../lib/config/default"
import myOAuth2Client from "./google.utils";
import log from "../lib/logger";
const OAuth2=google.auth.OAuth2;
export async function sendMail(to:string,subject:string,htmlContent:string){
    myOAuth2Client.setCredentials({refresh_token:config.get("refreshToken") as string});
    const accessToken=await myOAuth2Client.getAccessToken();
    const smtpTransport= nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAUTH2",
            user: config.get("email"),
            clientId: config.get("googleId"),
            clientSecret: config.get("googleSecret"),
            refreshToken: config.get("refreshToken"),
            accessToken: accessToken.token as string
        }
    });

    const mailOptions={
        from:config.get("email") as string,
        to:to,
        subject:subject,
        html:htmlContent
    };
    smtpTransport.sendMail(mailOptions,(err,info)=>{
        if(err){
            log.error(err);
            return false;
        }
        else{
            log.info(info);
            return true;
        }
    }
    );
}

