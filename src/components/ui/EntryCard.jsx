export default function EntryCard({ category, title, desc, link }) {
    return (
        <div className="card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent dark:hover:border-accent-dark">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent dark:text-accent-dark mb-3">
                {category}
            </span>
            <h3 className="text-lg font-bold text-ink dark:text-ink-dark mb-2">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft mb-5 flex-1">
                {desc}
            </p>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-ink-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors"
            >
                View Live
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
        </div>
    )
}
