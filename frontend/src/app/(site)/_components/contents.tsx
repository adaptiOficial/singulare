import { api } from '@/services/api'
import { contentType } from '@/types/content'
import { paginationResponseType } from '@/types/pagination-response'
import { ContentSolo } from './content-solo'
import SliderContent from './sliderContent'


export async function ContentsSection() {

    const { response, error } = await api<paginationResponseType<contentType[]>>('GET', '/contents')

    if (error || !response) {
        return (
            <p className="container text-center py-8">
                Erro ao carregar os conteúdos.
            </p>
        )
    }

    return (
        <div className="container">
            <h2 className="text-[26px] font-bold text-center
                    md:text-3xl md:text-left
                    lg:text-5xl lg:text-left
                    mx-[10%]">
                    Conteúdo programático</h2>
            <div className='relative px-30 lg:px-0'>
                <SliderContent
                    items={response.data.map((content) => (
                        <div key={content.id} className="flex w-full items-center justify-center">
                            <ContentSolo content={content} />
                        </div>
                    ))}
                    qttItemsLg={1}
                    qttItemsMd={1}
                    qttItemsSm={1}
                    qttItemsXs={1}
                    insideArrow={true}
                    sizeArrow={30}
                    navItems={true}
                    withThumbs={false}
                    autoScroll={false}
                    colorArrow="text-tertiary"
                    gutter={30}
                />
            </div>
        </div>
    )
}