function PageHero({ eyebrow, title, description, badge }) {
  return (
    <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-bloom backdrop-blur-xl">
      <div className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-semibold text-leaf">
        {eyebrow}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h1 className="serif-display text-4xl font-semibold text-slate-800 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
        </div>
        {badge ? (
          <div className="inline-flex h-fit rounded-[1.5rem] bg-gradient-to-br from-sky-100 to-emerald-100 px-5 py-4 text-sm font-semibold text-slate-700 shadow-soft">
            {badge}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PageHero;
