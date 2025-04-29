"use server"
import { createAI, createStreamableUI, createStreamableValue, StreamableValue } from "ai/rsc";
import {UserContent} from "ai"
import { ReactNode } from "react";
import {createOpenAI} from "@ai-sdk/openai"
import { env } from "@/env";
import { StreamableSkeleton, StreamableSkeletonProps } from "@/components/admin/classifieds/streamable-skeletons";


const openai = createOpenAI({
    apiKey: env.OPENAI_API_KEY,
    compatibility: "strict"
})

export async function generateClassifieds(image: string): Promise<ClientMessage | null>{
    const uiStream = createStreamableUI();
    const valueStream = createStreamableValue<any>();
    let classified  = {image};

    uiStream.update(<StreamableSkeleton {...classified}/>)

 return null   
}

type ServerMessage ={
    id?: number;
    name?: string | undefined;
    role: "user" | "assitant" | "system";
    content: UserContent;
}
type ClientMessage ={
    id?: number;
    name?: string | undefined;
    role: "user" | "assitant" ;
    display: ReactNode;
    classified: StreamableValue<StreamableSkeletonProps>
}
export const AI = createAI({
  initialUIState: [] as ClientMessage[],
  initialAIState: [] as ServerMessage[],
  actions: {

    generateClassifieds
  },
});
