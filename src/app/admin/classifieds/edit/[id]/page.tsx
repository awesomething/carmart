<<<<<<< HEAD
import { validateIdSchema } from "@/app/schemas/id.schema";
import { routes } from "@/config/routes";
import type { PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ClassifiedForm } from "../../../../../components/classified/classified-form";

export default async function EditClassified(props: PageProps) {
	const params = await props.params;

	const { data, success } = validateIdSchema.safeParse({
		id: Number(params?.id),
	});

	if (!success) redirect(routes.admin.classifieds);

	const classified = await prisma.classified.findUnique({
		where: { id: data.id },
		include: { images: true },
	});

	if (!classified) redirect(routes.admin.classifieds);

	return <ClassifiedForm classified={classified} />;
=======
import { PageProps } from "@/config/types";

export default async function EditClassified(porps: PageProps){
    return(
    <div className="text-white">
    Edit Classifieds
    </div>)
>>>>>>> ad458fba23e4c4c6a3d8d368fb17bcc26c2a1bc7
}