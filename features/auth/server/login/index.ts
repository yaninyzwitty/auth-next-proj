"use server";

import { getUserByEmail } from "@/features/user";
import { LoginSchema } from "../../schemas";
import { z } from "zod";

export const loginWithValues = async (values : z.infer<typeof LoginSchema>) => {
    try {

        const validatedFields = LoginSchema.safeParse(values);

        if(!validatedFields.success) {
            return {
                error: "Invalid fields!"
            }
        }

        const { email, password   } = validatedFields.data;


        const existingUser = await getUserByEmail(email);
        if(!existingUser || !existingUser.password) {
            return {
                error: "User not found!"
            }
        }



        return {
            success: {
                email,
                password
            }

        }
        
    } catch (error: unknown) {
        console.log('Something went wrong', error)
        return {
            error: "Something went wrong!"
        }
        
    }


}