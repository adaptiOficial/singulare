'use client'

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Grid, Pagination } from 'swiper/modules'
import { IconType } from 'react-icons'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/grid'

interface SliderProps {
  items: JSX.Element[]
  withThumbs?: boolean
  insideArrow?: boolean
  navItems?: boolean
  colorArrow?: string
  grayScaleArrow?: boolean
  sizeArrow?: number
  fullScreen?: boolean
  qttItemsLg?: number
  qttItemsMd?: number
  qttItemsSm?: number
  qttItemsXs?: number
  qttRows?: number
  gutter?: number
  grid?: boolean
  loopInfinite?: boolean
  autoScroll?: boolean
  timerScroll?: number
  fullScroll?: boolean
  qttScroll?: number
  arrowPrev?: IconType
  arrowNext?: IconType
  loop?: boolean
  centeredSlides?: boolean
}

export default function SliderContent({
  items = [],
  withThumbs = true,
  navItems = true,
  colorArrow = 'text-dark-blue',
  grayScaleArrow = false,
  sizeArrow = 60,
  fullScreen = false,
  qttRows = 1,
  qttItemsLg = 4,
  qttItemsMd = 3,
  qttItemsSm = 3,
  qttItemsXs = 2,
  gutter = 50,
  loopInfinite = true,
  insideArrow = false,
  autoScroll = true,
  timerScroll = 3000,
  fullScroll = false,
  qttScroll = 1,
  arrowPrev = IoIosArrowBack,
  arrowNext = IoIosArrowForward,
  centeredSlides = false,
}: SliderProps) {
  const ArrowPrev: IconType = arrowPrev
  const ArrowNext: IconType = arrowNext
  const [itemsPerSlide, setItemsPerSlide] = useState(qttItemsLg)
  const [pagination, setPagination] = useState(true)
  const swiperRef = useRef<SwiperRef | null>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  // Repete os itens caso o total seja menor do que os slides por view
  if (items.length < itemsPerSlide) {
    const originalItemsLength = items.length
    const itemsToAdd = itemsPerSlide - (originalItemsLength % itemsPerSlide)
    for (let i = 0; i < itemsToAdd; i++) {
      items.push(items[i % originalItemsLength])
    }
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = elementRef.current?.offsetWidth ?? 1024
      if (width >= 1024) setItemsPerSlide(qttItemsLg)
      else if (width >= 768) setItemsPerSlide(qttItemsMd)
      else if (width >= 640) {
        setItemsPerSlide(qttItemsSm)
        setPagination(true)
      } else {
        setItemsPerSlide(qttItemsXs)
        setPagination(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [qttItemsLg, qttItemsMd, qttItemsSm, qttItemsXs])

  const nextItem = useCallback(() => {
    swiperRef.current?.swiper.slideNext()
  }, [])

  const prevItem = useCallback(() => {
    swiperRef.current?.swiper.slidePrev()
  }, [])

  useEffect(() => {
    if (autoScroll) {
      const timer = setInterval(() => {
        if (fullScroll) nextItem()
        else for (let i = 0; i < qttScroll; i++) nextItem()
      }, timerScroll)

      return () => window.clearInterval(timer)
    }
  }, [nextItem, autoScroll, qttScroll, fullScroll, timerScroll])

  const arrowClasses = `${colorArrow} ${grayScaleArrow ? 'text-gray-500 hover:text-gray-700' : ''}`

  return (
    <div className="flex gap-5 max-sm:gap-0 w-full relative" ref={elementRef}>
      <div
        className="w-full"
        style={{
          overflow: 'hidden',
        }}
      >
        <Swiper
          ref={swiperRef}
          grabCursor={true}
          grid={qttRows > 1 ? { rows: qttRows, fill: 'row' } : undefined}
          modules={[Pagination, Grid]}
          slidesPerView={itemsPerSlide}
          slidesPerGroup={qttScroll}
          loop={loopInfinite}
          spaceBetween={gutter}
          pagination={{
            type: 'bullets',
            el: '.swiper-pagination',
            enabled: withThumbs && pagination,
            clickable: true,
          }}
          className="!overflow-visible swiper-container"
          centeredSlides={centeredSlides}
        >
          {items.map((item, i) => (
            <SwiperSlide
              key={i}
              className={`${withThumbs && pagination && navItems && !insideArrow ? 'pb-14' : ''} ${fullScreen ? 'w-full h-screen' : ''}`}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item}
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
      {itemsPerSlide < items.length && navItems && (
        <>
          <div
            className={
              insideArrow
                ? 'absolute left-0 z-30 h-full flex items-center'
                : 'flex'
            }
          >
            <button onClick={prevItem}>
              <ArrowPrev size={sizeArrow} className={arrowClasses} />
            </button>
          </div>
          <div
            className={
              insideArrow
                ? 'absolute right-0 z-30 h-full flex items-center'
                : 'flex'
            }
          >
            <button onClick={nextItem}>
              <ArrowNext size={sizeArrow} className={arrowClasses} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}