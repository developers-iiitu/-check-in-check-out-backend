import { object, string, ref, number } from "yup";

// const qrStudentCreateSchema = {
//     reqType: "POST",
//     reqPath: "/api/qr/student/genrate",
// }

const qrStudentCreateSchema = object({
    body: object({
        purpose: string().required("Purpose is Required"),
        type: number().required("Type is Required")
            .min(0, "Type must be at least 0 characters long")
            .max(1, "Type must be at most 1 characters long"),
    }),
    headers: object({
        "x-access-token": string().required("Token is Required"),
        "x-refresh-token": string().required("Refresh Token is Required"),
        "machine-id": string().required("Machine ID is Required"),
        "content-type": string().required("Content Type is Required")
        .equals(["application/json"],"Content Type must be application/json"),
    })

})

export {qrStudentCreateSchema}
