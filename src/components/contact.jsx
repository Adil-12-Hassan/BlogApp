import { useState } from 'react'

const MAX_CHARS = 500

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: ''
    })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState({ msg: '', type: '' })
    const [loading, setLoading] = useState(false)

    // Character counter
    const charCount = formData.message.length

    // Validate single field
    const validateField = (name, value) => {
        const val = value.trim()
        if (!val) return 'This field is required'
        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email'
        if (name === 'name' && val.length < 2) return 'Name too short'
        if (name === 'message' && val.length < 10) return 'Message too short'
        return ''
    }

    // Validate all fields
    const validateAll = () => {
        const newErrors = {}
        Object.keys(formData).forEach(key => {
            const err = validateField(key, formData[key])
            if (err) newErrors[key] = err
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        // Block typing beyond MAX_CHARS for message
        if (name === 'message' && value.length > MAX_CHARS) return
        setFormData(prev => ({ ...prev, [name]: value }))

        // Clear error on typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleBlur = (e) => {
        const { name, value } = e.target
        const err = validateField(name, value)
        setErrors(prev => ({ ...prev, [name]: err }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateAll()) {
            setStatus({ msg: 'Please fix the errors above before submitting.', type: 'error' })
            return
        }

        setLoading(true)
        try {
            // ✅ Environment variable use karo
            const contactApiUrl = `${import.meta.env.VITE_API_URL}/send-email`
            const response = await fetch(contactApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const result = await response.json()

            if (response.ok) {
                setStatus({ msg: '✓ Message sent! I will reply within 24 hours.', type: 'success' })
                setFormData({ name: '', email: '', subject: '', message: '' })
                setErrors({})
            } else {
                setStatus({ msg: result.error || 'Something went wrong.', type: 'error' })
            }
        } catch {
            setStatus({ msg: '✗ Could not reach the server. Check your connection.', type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="contact" id="contact">
            <div className="section-title">
                <h2>Contact <span>Me</span></h2>
                <div className="title-line"></div>
            </div>

            <div className="contact-wrapper">

                {/* LEFT side stays same as your HTML */}
                <div className="contact-left">
                    <h3 className="contact-heading">Let's Work <span>Together</span></h3>
                    <p className="contact-bio">
                        Have a project in mind or need a MERN Stack developer for your team?
                        I'm available for freelance, remote, and full-time opportunities.
                        Drop me a message and I'll get back to you within 24 hours.
                    </p>

                    <div className="contact-info-list">
                        <div className="contact-info-item">
                            <div className="contact-info-icon"><i className="fa-solid fa-envelope"></i></div>
                            <div>
                                <span className="contact-info-label">Email</span>
                                <span className="contact-info-value">syedadilhassan06@gmail.com</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-info-icon"><i className="fa-solid fa-phone"></i></div>
                            <div>
                                <span className="contact-info-label">Phone</span>
                                <span className="contact-info-value">+92 328 151 1293</span>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-info-icon"><i className="fa-solid fa-location-dot"></i></div>
                            <div>
                                <span className="contact-info-label">Location</span>
                                <span className="contact-info-value">Faisalabad, Pakistan</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-socials">
                        <a href="https://github.com/adil-12-hassan/" className="contact-social-btn" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/adil-12-hassan/" className="contact-social-btn" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://www.instagram.com/adilhassan107/" className="contact-social-btn" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://twitter.com/adilhassan107" className="contact-social-btn" aria-label="Twitter/X"><i className="fa-brands fa-x-twitter"></i></a>
                    </div>
                </div>

                {/* RIGHT: Form */}
                <div className="contact-right">
                    <form className="contact-form" onSubmit={handleSubmit} noValidate>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Syed Hassan"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name ? 'error' : formData.name ? 'valid' : ''}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="syedadilhassan06@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.email ? 'error' : formData.email ? 'valid' : ''}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Project Discussion"
                                value={formData.subject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.subject ? 'error' : formData.subject ? 'valid' : ''}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.message ? 'error' : formData.message ? 'valid' : ''}
                            />
                            {/* Character Counter */}
                            <p className={`char-counter ${charCount > MAX_CHARS * 0.9 ? 'danger' : charCount > MAX_CHARS * 0.75 ? 'warning' : ''}`}>
                                {charCount} / {MAX_CHARS}
                            </p>
                        </div>

                        {/* Status Message */}
                        {status.msg && (
                            <p className={`form-status show ${status.type}`}>
                                {status.msg}
                            </p>
                        )}

                        <button type="submit" className={`btn-hire btn-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                            <span>{loading ? 'Sending' : 'Send Message'}</span>
                            {!loading && <i className="fa-solid fa-paper-plane send-icon"></i>}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
