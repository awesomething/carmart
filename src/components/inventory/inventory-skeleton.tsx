import { ClassifiedCardSkeleton } from "./classified-card-skeleton"

export const InventorySkeleton = () =>{
    return (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {Array.from({ length: 8 }, (_, index) => index + 1).map((id) => (
                    <ClassifiedCardSkeleton key={id}/>
                ))}
            </div>
        
    )
}