"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import SplitReveal from "@/components/SplitReveal";
import { REVIEWS, type Review } from "@/lib/reviews";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default function Reviews() {
  const [active, setActive] = useState(0);
  const current = REVIEWS[active] ?? REVIEWS[0];
  const ticker = useMemo(
    () => [...REVIEWS, ...REVIEWS].map((review) => review.product),
    [],
  );

  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden py-16 md:scroll-mt-28 md:py-32"
    >
      <div className="pointer-events-none absolute left-[-18%] top-0 h-80 w-80 rounded-full bg-cyan-electric/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-12%] bottom-10 h-72 w-72 rounded-full bg-purple-neon/18 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-electric">
              Client reviews
            </p>
            <SplitReveal className="mt-3 text-[1.85rem] font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              What operators say after go-live.
            </SplitReveal>
          </div>
          <p className="max-w-sm text-sm text-zinc-400">
            Drag the deck. Quotes autoplay from teams running the products we
            shipped.
          </p>
        </div>

        <div className="relative mx-auto mb-8 max-w-3xl text-center md:mb-12">
          <Quote className="mx-auto h-8 w-8 text-cyan-electric/70" />
          <AnimatePresence mode="wait">
            <motion.p
              key={current.name}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-xl font-semibold leading-snug tracking-tight text-zinc-50 sm:text-3xl sm:leading-snug"
            >
              “{current.quote}”
            </motion.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${current.name}-meta`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm text-zinc-400"
            >
              {current.name} · {current.role} · {current.product}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          className="reviews-prev absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/50 text-cyan-electric backdrop-blur md:grid lg:left-8"
          aria-label="Previous review"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="reviews-next absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/50 text-cyan-electric backdrop-blur md:grid lg:right-8"
          aria-label="Next review"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          speed={750}
          autoplay={{
            delay: 4200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 16,
            stretch: 0,
            depth: 220,
            modifier: 1.15,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: ".reviews-prev",
            nextEl: ".reviews-next",
          }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation;
            if (navigation && typeof navigation !== "boolean") {
              navigation.prevEl = ".reviews-prev";
              navigation.nextEl = ".reviews-next";
            }
          }}
          onSlideChange={(swiper: SwiperType) => {
            setActive(swiper.realIndex);
          }}
          className="reviews-swiper !pb-14"
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={`${review.product}-${review.name}`} className="!h-auto !w-[min(86vw,400px)]">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative mt-4 overflow-hidden border-y border-white/8 py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-obsidian to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-obsidian to-transparent" />
        <div className="reviews-ticker flex w-max gap-8 whitespace-nowrap">
          {ticker.map((product, index) => (
            <span
              key={`${product}-${index}`}
              className="text-[11px] uppercase tracking-[0.28em] text-zinc-500"
            >
              {product}
              <span className="ml-8 text-cyan-electric/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="review-card flex h-full min-h-[280px] flex-col rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-black/40 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-cyan-electric" aria-label="5 out of 5 stars">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-cyan-electric motion-safe:animate-pulse"
              style={{ animationDelay: `${index * 80}ms` }}
            />
          ))}
        </div>
        <span className="rounded-full border border-cyan-electric/25 bg-cyan-electric/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-electric">
          {review.product}
        </span>
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-zinc-200">
        “{review.quote}”
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-4">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-electric to-purple-neon text-xs font-bold text-obsidian">
          {initials(review.name)}
        </span>
        <div>
          <p className="text-sm font-semibold text-zinc-50">{review.name}</p>
          <p className="text-[12px] text-zinc-500">{review.role}</p>
        </div>
      </div>
    </article>
  );
}
