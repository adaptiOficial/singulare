import { feedbackType } from "@/types/feedback"
import Image from "next/image"

interface feedbackProps {
    feedback: feedbackType
}

export function Card({ feedback }: feedbackProps){

    return(

        <div className="flex flex-col
                w-[110px] h-[180px] p-2 gap-1
                sm:w-[200px] sm:h-[250px] sm:p-3 sm:gap-2
                md:w-[240px] md:h-[300px] md:p-4 md:gap-3
                lg:w-[clamp(280px,30vw,420px)] lg:h-auto lg:min-h-[417px] lg:p-6 lg:gap-4
                bg-verdeAgua rounded-2xl">

            <div className="flex flex-col lg:gap-3 gap-1">

                <div className="flex items-center lg:gap-3 gap-1">

                    <div className="flex-shrink-0">
                        <Image src="/avatar.png" alt="Avatar" width={44} height={44} className="
                        w-[20px] h-[20px]
                        sm:w-[25px] sm:h-[25px]
                        md:w-[30px] md:h-[30px]
                        lg:w-[44px] lg:h-[44px]
                        object-contain"/>
                    </div>

                    <div>
                        <p className="font-bold text-[8px] text-white
                            sm:text-[10px]
                            md:text-[13px]
                            lg:text-[21px]">
                            {feedback.name}
                        </p>

                        <p className="text-[7px] font-light text-white/80 line-clamp-1
                            sm:text-[8px]
                            md:text-[12px]
                            lg:text-[15px]">
                            {feedback.role}
                        </p>
                    </div> 
                </div>
            </div>

            <hr className="border-white mt-1"/>

            <div className="text-[7px] p-1 mt-1  text-white font-normal
                sm:text-[8px]
                md:text-[12px]
                lg:text-[16px] lg:pr-3 lg:pl-3">
                <p>{feedback.content}</p>
            </div>
        </div>
    )
}