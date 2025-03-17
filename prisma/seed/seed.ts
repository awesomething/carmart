import { PrismaClient } from "@prisma/client";
import { seedTaxonomy } from "./taxonomy.seed";
import { seedClassifieds } from "./classifieds.seed";
import { seedImages } from "./images.seed";


const prisma = new PrismaClient();
async function main() {
//    await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`
//    await seedTaxonomy(prisma)
//    await seedClassifieds(prisma)
await seedImages(prisma);
}

main().catch((err) => {
    console.error(err);
   throw err;
}).finally(async () =>{
    await prisma.$disconnect();
});