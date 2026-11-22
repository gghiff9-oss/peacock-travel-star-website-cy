import { Hero } from '@/components/home/hero'
import { FeaturedTours } from '@/components/home/featured-tours'
import { Categories } from '@/components/home/categories'
import { WhyUs } from '@/components/home/why-us'
import { Cta } from '@/components/home/cta'
import { getActiveTours } from '@/lib/tours'

export default async function HomePage() {
  const { tours } = await getActiveTours()
  const featured = tours.filter((t) => t.is_featured)
  const list = (featured.length >= 3 ? featured : tours).slice(0, 6)

  return (
    <>
      <Hero />
      <FeaturedTours tours={list} />
      <Categories />
      <WhyUs />
      <Cta />
    </>
  )
}
