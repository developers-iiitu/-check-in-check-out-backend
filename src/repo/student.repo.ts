import {Student} from "../model/student.model";

const createStudent = async (query:Object)=>{
    try {
        return Student.create(query);
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export {createStudent};