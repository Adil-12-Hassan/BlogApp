import { useState } from 'react'
import SectionTitle from '../../components/ui/SectionTitle'
import API_BASE_URL from '../../lib/api'

const MAX_CHARS = 500

const contactInfo = [
    { icon: 'fa-solid fa-envelope', label: 'Email', value: 'syedadilhassan06@gmail.com' },
    { icon: 'fa-solid fa-phone', label: 'Phone', value: '+92 328 151 1293' },
    { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Faisalabad, Pakistan' },
]

const socials = [
    { href: 'https://github.com/adil-12-hassan/', icon: 'fa-brands fa-github', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/adil-12-hassan/', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://www.instagram.com/adilhassan107/', icon: 'fa-brands fa-instagram', label: 'Instagram' },
    { href: 'https://twitter.com/adilhassan107', icon: 'fa-brands fa-x-twitter', label: 'Twitter/X' },
]

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: ''
    })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState({ msg: '', type: '' })
    const [loading, setLoading] = useState(false)

    const charCount = formData.message.length

    const validateField = (name, value) => {
        const val = value.trim()
        if (!val) return 'This field is required'
        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Invalid email'
        if (name === 'name' && val.length < 2) return 'Name too short'
        if (name === 'message' && val.length < 10) return 'Message too short'
        return ''
    }

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
        if (name === 'message' && value.length > MAX_CHARS) return
        setFormData(prev => ({ ...prev, [name]: value }))
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
            const response = await fetch(`${API_BASE_URL}/send-email`, {
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

    const fieldClass = (name) =>
        `field-input ${errors[name] ? 'field-error' : formData[name] ? 'field-valid' : ''}`

    return (
        <section id="contact" className="section">
            <div className="container-page">
                <SectionTitle heading="Contact" accent="Me" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                    {/* LEFT */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-ink dark:text-ink-dark mb-4">
                            Let's Work <span className="text-accent dark:text-accent-dark">Together</span>
                        </h3>
                        <p className="text-ink-soft dark:text-ink-dark-soft leading-relaxed mb-8">
                            Have a project in mind or need a MERN Stack developer for your team?
                            I'm available for freelance, remote, and full-time opportunities.
                            Drop me a message and I'll get back to you within 24 hours.
                        </p>

                        <div className="space-y-5 mb-8">
                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-center gap-4">
                                    <div className="h-11 w-11 shrink-0 rounded-xl bg-accent-soft dark:bg-accent-dark-soft text-accent dark:text-accent-dark grid place-items-center">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-ink-muted dark:text-ink-dark-muted">{item.label}</span>
                                        <span className="block font-medium text-ink dark:text-ink-dark">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {socials.map((s) => (
                                <a key={s.label} href={s.href} aria-label={s.label} className="btn-ghost-icon">
                                    <i className={s.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="card p-7 md:p-8">
                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="field-label">Full Name</label>
                                    <input
                                        type="text" id="name" name="name" placeholder="Syed Hassan"
                                        value={formData.name} onChange={handleChange} onBlur={handleBlur}
                                        className={fieldClass('name')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="field-label">Email Address</label>
                                    <input
                                        type="email" id="email" name="email" placeholder="syedadilhassan06@gmail.com"
                                        value={formData.email} onChange={handleChange} onBlur={handleBlur}
                                        className={fieldClass('email')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="field-label">Subject</label>
                                <input
                                    type="text" id="subject" name="subject" placeholder="Project Discussion"
                                    value={formData.subject} onChange={handleChange} onBlur={handleBlur}
                                    className={fieldClass('subject')}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="field-label">Message</label>
                                <textarea
                                    id="message" name="message" rows="6" placeholder="Tell me about your project..."
                                    value={formData.message} onChange={handleChange} onBlur={handleBlur}
                                    className={fieldClass('message')}
                                />
                                <p className={`mt-1.5 text-xs text-right ${charCount > MAX_CHARS * 0.9 ? 'text-red-500' : charCount > MAX_CHARS * 0.75 ? 'text-amber-500' : 'text-ink-muted dark:text-ink-dark-muted'}`}>
                                    {charCount} / {MAX_CHARS}
                                </p>
                            </div>

                            {status.msg && (
                                <p className={`text-sm font-medium rounded-lg px-4 py-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                    {status.msg}
                                </p>
                            )}

                            <button type="submit" className="btn-primary w-full" disabled={loading}>
                                <span>{loading ? 'Sending' : 'Send Message'}</span>
                                {!loading && <i className="fa-solid fa-paper-plane text-xs"></i>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
