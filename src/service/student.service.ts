import otpGenerator from 'otp-generator';
import log from '../lib/logger';
import config from '../lib/config/default';
import bcrypt from 'bcrypt'
import { createUser } from '../repo/user.repo';
import { createStudent } from '../repo/student.repo';


const createStudentUser = async (data:{
    name: string;
    rollNo:string;
    phone:string;
    hostelName:string;
    roomNumber:number;
}) => {
    const {name, rollNo, phone, hostelName, roomNumber} = data;
    const password = otpGenerator.generate(10, { specialChars: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, digits: true });
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor") as number);
    const hash = bcrypt.hashSync(password, salt);
    const user = await createUser({email:`${rollNo}@iiitu.ac.in`,password:hash});
    const student = await createStudent({name:name,phone:phone,hostelName:hostelName,roomNumber:roomNumber,userId:user.id});
    return {user,student,password};
}

export { createStudentUser };