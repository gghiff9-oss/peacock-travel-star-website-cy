import Image from 'next/image'

export function PageBanner({
  eyebrow,
  title,
  description,
  image,
  alt,
}: {
  eyebrow: string
  title: string
  description?: string
  image: string
  alt: string
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-navy/75" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-20 md:px-8 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-semibold text-white md:text-5xl">{title}</h1>
        {description && <p className="max-w-2xl leading-relaxed text-white/80">{description}</p>}
      </div>
    </section>
  )
}
