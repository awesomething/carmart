import { bcryptPasswordHash } from "@/lib/bcrypt";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


export async function seedAdmin(prisma: PrismaClient) {
const password = await bcryptPasswordHash("abc123#");
const admin = await prisma.user.create({
    data: {
        name: "Admin",
        email: "taiy194@gmail.com",
        hashedPassword: password,
    }
});
console.log("Admin seeded", admin);
return admin;

}