import { api } from '@/services/api'
import { feedbackType } from '@/types/feedback'
import { paginationResponseType } from '@/types/pagination-response'
import { Card } from './feedback-card'

export async function FeedbacksSection() {
  const { response } = await api<paginationResponseType<feedbackType[]>>('GET', '/feedbacks')

  if (!response) return null

  return (
    <div className="flex justify-center py-16">
        <div className="flex flex-row gap-2 
        md:gap-[10px]
        lg:gap-[2vw] ">
            {response.data.map((feedback: feedbackType) => (
                <Card key={feedback.id} feedback={feedback} />
            ))}
        </div>
    </div>
  )
}