import { object, string, ref, number } from "yup";

// const sessionCreateSchema = {
//     reqType: "POST",
//     reqPath: "/api/session/create",
// }

const sessionCreateSchema = object({
    body:object({
        email:string().required("Email is required"),
        password:string().required("Password is required")
        .min(6,"Password must be at least 5 characters long")
        .max(10,"Password must be at mos10 5 characters long"),
        machineId:string().required("Machine is Id is Required")
        .min(36,"Machine Id must be at least 5 characters long")
        .max(36,"Machine Id must be at mos10 5 characters long"),
        geoLocation:string().required("Geo Location is required")
    }),
    headers: object({
        "content-type": string().required("Content Type is Required")
        .equals(["application/json"],"Content Type must be application/json"),
    })
})


export {sessionCreateSchema}