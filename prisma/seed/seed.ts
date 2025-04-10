import { PrismaClient } from "@prisma/client";
import { seedClassifieds } from "./classifieds.seed";
import { seedImages } from "./images.seed";
import { seedTaxonomy } from "./taxonomy.seed";

const prisma = new PrismaClient();

async function main() {
	// await prisma.$executeRaw`TRUNCATE TABLE "makes", RESTART IDENTITY CASCADE`;
	// await prisma.$executeRaw`TRUNCATE TABLE "classified" RESTART IDENTITY CASCADE`;
	await seedTaxonomy(prisma);
	await seedClassifieds(prisma);
	await seedImages(prisma);
	
	// await seedCustomers(prisma);
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});