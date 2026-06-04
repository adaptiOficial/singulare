import { feedbackType } from "@/types/feedback"
import Image from "next/image"

interface feedbackProps {
    feedback: feedbackType
}

export function Card({ feedback }: feedbackProps){

    return(
        <div className="flex flex-col
                w-[300px] h-[300px] p-3 gap-2
                sm:w-[320px] sm:h-[317px] sm:p-3 sm:gap-2
                md:w-[320px] md:h-[317px] md:p-3 md:gap-2
                lg:w-[clamp(280px,30vw,420px)] lg:h-[417px] lg:p-6 lg:gap-4
                bg-[#4DADB0] rounded-2xl">

            <div className="flex flex-col ml-1 lg:gap-3 gap-1 flex-shrink-0">
                <div className="flex items-center lg:gap-3 gap-1">

                    <div className="flex-shrink-0">
                        <Image src="/avatar.png" alt="Avatar" width={44} height={44} className="
                        w-[30px] h-[30px]
                        sm:w-[35px] sm:h-[35px]
                        md:w-[37px] md:h-[37px]
                        lg:w-[44px] lg:h-[44px]
                        object-contain"/>
                    </div>

                    <div className="min-w-0">
                        <p className="font-bold text-[16px] ml-1 text-white truncate leading-tight
                            sm:text-[16px]
                            md:text-[16px]
                            lg:text-[21px]">
                            {feedback.name}
                        </p>

                        <p className="text-[13px] font-light text-white/80 truncate leading-tight
                            sm:text-[14px]
                            md:text-[14px]
                            lg:text-[16px]">
                            {feedback.role}
                        </p>
                    </div> 
                </div>
            </div>

            <hr className="border-white mt-1 flex-shrink-0"/>

            <div className="flex-1 overflow-y-auto text-[14px] p-1 mt-1 text-white font-normal
                sm:text-[14px]
                md:text-[14px]
                lg:text-[16px] lg:pr-3 lg:pl-3
                card-scroll
                ">
                <p>{feedback.content}</p>
            </div>

            
        </div>
    )
}