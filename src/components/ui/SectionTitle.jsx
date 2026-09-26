export default function SectionTitle({ eyebrow, heading, accent }) {
    return (
        <div className="section-title">
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
            <h2>
                {heading} <span>{accent}</span>
            </h2>
        </div>
    )
}
