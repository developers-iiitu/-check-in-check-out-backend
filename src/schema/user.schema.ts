import { object, string, ref, number } from "yup";

// const userStudentCreateSchema = {
//     reqType: "POST",
//     reqPath: "/api/user/student/create",
// }

const userStudentCreateSchema = object({
    body: object({
        name:string().required("Name is Required"),
        rollNo: string().required("Roll No is Required")
        .min(5,"Roll must be at least 5 characters long")
        .max(5,"Roll must be at most 5 characters long"),
        phone: string().required("Phone is Required")
        .min(10,"Phone must be at least 10 characters long")
        .max(10,"Phone must be at most 10 characters long"),
        hostelName: string().required("Hostel Name is Required"),
        roomNumber: number().required("Room Number is Required")
        .min(0,"Room No must be at least 3 characters long")
        .max(999,"Room No must be at most 3 characters long"),
    })
})

export {userStudentCreateSchema};