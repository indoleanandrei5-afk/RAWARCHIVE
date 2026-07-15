const boundaries = [
  { title: "Plastic skin", note: "Texture stays." },
  { title: "Radioactive greens", note: "Nature has enough colors already." },
  { title: "Crushed shadows", note: "Black is allowed to have detail." },
  { title: "Fake skies", note: "If it was not there, I do not invent it." },
];

export default function EditingBoundaries() {
  return (
    <section className="bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">A few hard no&apos;s</p>
        <div className="mt-5 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-14">
          <h2 className="max-w-3xl text-3xl font-medium tracking-[-0.015em] sm:text-5xl">
            Good editing should not shout from across the room.
          </h2>
          <p className="pro-subtitle max-w-xl text-base sm:text-lg">
            I fix distractions. I do not replace the photograph.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {boundaries.map((boundary) => (
            <article key={boundary.title} className="border-t border-white/16 pt-5">
              <h3 className="text-lg font-medium text-white">{boundary.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{boundary.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
