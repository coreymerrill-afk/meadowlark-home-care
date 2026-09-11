type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,color-mix(in_oklch,var(--teal)_10%,#f7f4ef),transparent)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-[0.12em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
