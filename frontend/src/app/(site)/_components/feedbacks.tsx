import { api } from '@/services/api'
import { feedbackType } from '@/types/feedback'
import { paginationResponseType } from '@/types/pagination-response'
import { Card } from './feedback-card'
import Slider from './slider'

export async function FeedbacksSection() {
  const { response, error } = await api<paginationResponseType<feedbackType[]>>('GET', '/feedbacks')

  if (error || !response) {
    return (
      <p className="container text-center py-8">
        Erro ao carregar os feedbacks.
      </p>
    )
  }

  return (
    <div className="flex justify-center py-16">
      <Slider
        items={response.data.map((feedback: feedbackType) => (
          <Card key={feedback.id} feedback={feedback} />
        ))}
        qttItemsLg={3}
        qttItemsMd={2}
        qttItemsSm={2}
        qttItemsXs={1}
        qttRows={1}
        insideArrow={false}
        navItems={false}
        withThumbs={false}
        loopInfinite={true}
        autoScroll={true}
        gutter={20}
      />
    </div>
  )
}