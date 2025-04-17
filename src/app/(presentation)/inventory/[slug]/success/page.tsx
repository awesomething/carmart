import { CircleCheck } from "lucide-react"
import { EndButtons } from "../../../../../components/shared/end-button"

 export default function SuccessfulReservationPage(){
    return (
        <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-gray-800 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <CircleCheck className="mx-auto max-w-md text-center"/>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Reservation Confirmed!</h1>
                <p className="mt-4 text-muted-foreground">Thank you for your reservation. We'll see you soon</p>
                <EndButtons/>
            </div>
        </div>
    )
 }