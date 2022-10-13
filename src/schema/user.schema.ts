import {object,string,ref, number} from "yup";
export const createUserSchema = object({
    body:object({
        name:string().required("Name is required"),
        roll:string().required("Roll is required")
        .min(5,"Roll must be at least 5 characters long")
        .max(5,"Roll must be at most 5 characters long"),
        phone:string().required("Phone is required")
        .min(10,"Phone must be at least 10 characters long")
        .max(10,"Phone must be at most 10 characters long"),
        hostelName:string().required("Hostel Name is required"),
        roomNo:string().required("Room No is required")
        .min(3,"Room No must be at least 3 characters long")
        .max(3,"Room No must be at most 3 characters long"),
    }),
});  


export const updateUserPasswordSchema = object({
    body:object({
        password:string().required("Password is required").
        min(6,"Password must be at least 6 characters long"),
        newPassword:string().required("New Password is required").
        min(6,"New Password must be at least 6 characters long")
    }),
});

export const createOtpSentSchema = object({
    body:object({
        roll:string().required("Roll is required")
        .min(5,"Roll must be at least 5 characters long")
        .max(5,"Roll must be at most 5 characters long")
    })
});
        