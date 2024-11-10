import prisma from "@/lib/prisma";

export const getUserByEmail = async  (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        console.log(user)

        return user;
        
    } catch (error) {
        console.log('Error', 'failed to get user', error)
        return null
        
    }
}


