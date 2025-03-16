import { routes } from "@/config/routes";
import { Classified } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: {
    images: true;
  };
}>;

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
}

const ClassifiedCard = (props: ClassifiedCardProps) => {
  const { classified } = props;

  return (
    <div className="aspect-3/2 relative">
      <Link href={routes.singleClassified("slug")}>
        <Image placeholder="blur" blurDataURL={classified.images[0]?.blurhash}
         src={classified.images[0]?.src}
         alt={classified.images[0]?.alt}
         className="object-cover"
         fill={true}
         quality={25}
         
        />
      </Link>
    </div>
  );
};
