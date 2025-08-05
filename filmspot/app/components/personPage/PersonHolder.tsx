import { useQuery } from "@tanstack/react-query";
import { fetchActorDetails } from "~/APICalls";

function PersonHolder({props}: {props: {id: string}}){
    const { status: castStatus, error: castError, data: personInfo } = useQuery({queryKey: [`person${props.id}`], queryFn: () => fetchActorDetails({id: props.id})})
    
    console.log(personInfo);

    return <>
        <main className="w-full max-w-[1400px] mx-auto">
            <h2>Daa</h2>
        </main>
    </>
}

export default PersonHolder;