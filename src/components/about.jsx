import { useEffect, useRef } from 'react'
import personImg from '../assets/my.jpg'

export default function About() {
    const skillsRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fills = skillsRef.current.querySelectorAll('.skill-fill')
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
        <section className="about" id="about">
            <div className="section-title">
                <h2>About <span>Me</span></h2>
                <div className="title-line"></div>
            </div>

            <div className="about-content">
                <div className="about-left">
                    <div className="about-img-wrapper">
                        <div className="about-img-border"></div>
                        <img src={personImg} alt="Adil Hassan (adil12hassan) — MERN Stack Web Developer in Pakistan" className="about-img" loading="lazy" />
                    </div>
                </div>
                <div className="about-right">
                    <p className="about-subtitle">Who Am I?</p>
                    <h3 className="about-heading">A Passionate <span>MERN Stack</span> Developer</h3>
                    <p className="about-bio">
                        I build modern, responsive web applications using React, Node.js, and MongoDB.
                        With a strong focus on clean design, performance, and user experience, I bring ideas to life on the web.
                    </p>

                    <div className="about-info">
                        <div className="info-item">
                            <span className="info-label">Name</span>
                            <span className="info-value">Adil Hassan</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Experience</span>
                            <span className="info-value">2+ Years</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Location</span>
                            <span className="info-value">Pakistan</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Availability</span>
                            <span className="info-value available">Available</span>
                        </div>
                    </div>

                    <div className="skills" ref={skillsRef}>
                        <div className="skill-item">
                            <div className="skill-top">
                                <span className="skill-name">React.jsx</span>
                                <span className="skill-percent">90%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-fill" style={{ width: '0%' }} data-width="90%"></div>
                            </div>
                        </div>

                        <div className="skill-item">
                            <div className="skill-top">
                                <span className="skill-name">Node.js / Express</span>
                                <span className="skill-percent">85%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-fill" style={{ width: '0%' }} data-width="85%"></div>
                            </div>
                        </div>

                        <div className="skill-item">
                            <div className="skill-top">
                                <span className="skill-name">MongoDB</span>
                                <span className="skill-percent">80%</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-fill" style={{ width: '0%' }} data-width="80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}