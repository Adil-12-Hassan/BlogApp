import { useEffect, useRef } from 'react'
import personImg from '../../assets/my.jpg'
import SectionTitle from '../../components/ui/SectionTitle'

const infoItems = [
    { label: 'Name', value: 'Adil Hassan' },
    { label: 'Experience', value: '2+ Years' },
    { label: 'Location', value: 'Pakistan' },
    { label: 'Availability', value: 'Available', highlight: true },
]

const skills = [
    { name: 'React.jsx', percent: 90 },
    { name: 'Node.js / Express', percent: 85 },
    { name: 'MongoDB', percent: 80 },
]

export default function About() {
    const skillsRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fills = skillsRef.current.querySelectorAll('[data-skill-fill]')
                        fills.forEach(fill => {
                            fill.style.width = fill.getAttribute('data-width')
                        })
                        observer.disconnect() // animate only once
                    }
                })
            },
            { threshold: 0.3 }
        )

        if (skillsRef.current) {
            observer.observe(skillsRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section id="about" className="section bg-surface-soft dark:bg-surface-dark-soft">
            <div className="container-page">
                <SectionTitle heading="About" accent="Me" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
                    <div className="flex justify-center md:justify-start">
                        <div className="relative">
                            <div className="absolute -inset-3 rounded-2xl border-2 border-accent/30 dark:border-accent-dark/30" />
                            <img
                                src={personImg}
                                alt="Adil Hassan (adil12hassan) - MERN Stack Web Developer in Pakistan"
                                loading="lazy"
                                className="relative rounded-2xl w-full max-w-sm h-auto object-cover shadow-card dark:shadow-card-dark"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-accent dark:text-accent-dark font-semibold text-sm mb-2">Who Am I?</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-ink dark:text-ink-dark mb-4">
                            A Passionate <span className="text-accent dark:text-accent-dark">MERN Stack</span> Developer
                        </h3>
                        <p className="text-ink-soft dark:text-ink-dark-soft leading-relaxed mb-8">
                            I build modern, responsive web applications using React, Node.js, and MongoDB.
                            With a strong focus on clean design, performance, and user experience, I bring ideas to life on the web.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {infoItems.map((item) => (
                                <div key={item.label}>
                                    <span className="block text-xs uppercase tracking-wider text-ink-muted dark:text-ink-dark-muted">{item.label}</span>
                                    <span className={`block font-semibold mt-0.5 ${item.highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-ink dark:text-ink-dark'}`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div ref={skillsRef} className="space-y-5">
                            {skills.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="font-medium text-ink dark:text-ink-dark">{skill.name}</span>
                                        <span className="text-ink-muted dark:text-ink-dark-muted">{skill.percent}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-border dark:bg-border-dark overflow-hidden">
                                        <div
                                            data-skill-fill
                                            data-width={`${skill.percent}%`}
                                            style={{ width: '0%' }}
                                            className="h-full rounded-full bg-accent dark:bg-accent-dark transition-[width] duration-1000 ease-out"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
