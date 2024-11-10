"use server";

import { getUserByEmail } from "@/features/user";
import { RegisterSchema } from "../../schemas";
import prisma from "@/lib/prisma";

import bcrypt from "bcryptjs"

export const registerWithValues = async (_prevState: unknown, formData: FormData) => {
   try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
 
    const validatedFields = RegisterSchema.safeParse({ name, email, password });

    if(!validatedFields.success) {
        return {
            error: "Invalid fields!"
        }
    
    };


    const existingUser = await getUserByEmail(email);
    if(existingUser) {
        return {
            error: "User already exists"
        }
    };


    const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword


        }
    });

    
    return { name, email, password, success: "User created succesfully! You can now sign in!"  };
    
   } catch (error: unknown) {
    console.log('Something went wrong', error)
    return {
        error: "Something went wrong!"
    }

    
   }
}