import {Student} from "../model/student.model";

const createStudent = async (query:Object)=>{
    try {
        return await Student.create(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

const findOneStudent = async (query:Object)=>{
    try {
        return await Student.findOne(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export {createStudent,findOneStudent};