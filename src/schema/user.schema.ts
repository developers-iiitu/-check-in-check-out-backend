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
        roomNumber: string().required("Room Number is Required")
        .min(3,"Room No must be at least 3 characters long")
        .max(3,"Room No must be at most 3 characters long"),
    }),
    headers: object({
        "content-type": string().required("Content Type is Required")
        .equals(["application/json"],"Content Type must be application/json"),
    })

})

// const userPasswordChangeSchema = {
//     reqType: "POST",
//     reqPath: "/api/user/change-password",
// }
const userPasswordChangeSchema = object({
    body: object({
        cpassword: string().required("Old Password is Required")
        .min(6,"Password must be at least 8 characters long"),
        newpassword: string().required("New Password is Required")
        .min(6,"Password must be at least 8 characters long"),
        confirmPassword: string().required("Confirm Password is Required")
        .oneOf([ref("newPassword"),null],"Passwords must match")
    }),
    headers: object({
        "x-access-token": string().required("Token is Required"),
        "x-refresh-token": string().required("Refresh Token is Required"),
        "machine-id": string().required("Machine ID is Required"),
        "content-type": string().required("Content Type is Required")
        .equals(["application/json"],"Content Type must be application/json"),
    })
})

// const userGetProfileSchema = {
//     reqType: "Get",
//     reqPath: "/api/user/profile",
// }
const userGetProfileSchema = object({
    headers: object({
        "x-access-token": string().required("Token is Required"),
        "x-refresh-token": string().required("Refresh Token is Required"),
        "machine-id": string().required("Machine ID is Required"),
        "content-type": string().required("Content Type is Required")
        .equals(["application/json"],"Content Type must be application/json"),
    })
})

// const userGateGuardCreateSchema = {
//     reqType: "Post",
//     reqPath: "/api/user/gate-guard/create",
// }
const userGateGuardCreateSchema = object({
    body: object({
        name:string().required("Name is Required"),
        phone: string().required("Phone is Required")
        .min(10,"Phone must be at least 10 characters long")
        .max(10,"Phone must be at most 10 characters long"),
        email: string().required("Email is Required"),
        password: string().required("Password is Required"),
    }),
    headers: object({
        "x-access-token": string().required("Token is Required"),
        "x-refresh-token": string().required("Refresh Token is Required"),
        "machine-id": string().required("Machine ID is Required"),
        "content-type": string().required("Content Type is Required")
        .equals(["application/json"],"Content Type must be application/json"),
    })
})

export {userStudentCreateSchema,userPasswordChangeSchema,userGetProfileSchema,userGateGuardCreateSchema};