import SectionTitle from '../../components/ui/SectionTitle'
import EntryCard from '../../components/ui/EntryCard'

const profileList = [
    { id: 1, title: 'GitHub', desc: 'Explore my open-source contributions, personal side projects, and repositories showcasing my clean coding practices.', link: 'https://github.com/adil-12-hassan', category: 'Profile' },
    { id: 2, title: 'Fiverr', desc: 'Hire me for quick gigs, custom development solutions, and specialized freelance services with top-tier support.', link: 'https://www.fiverr.com/s/WEaqAVl', category: 'Freelancing' },
    { id: 3, title: 'Upwork', desc: "Let's collaborate on long-term projects. Check out my specialized contract history, client reviews, and professional work history.", link: 'https://www.upwork.com/freelancers/~01147946b9c52ee855', category: 'Freelancing' },
    { id: 4, title: 'LinkedIn', desc: 'Connect with me professionally, view my resume, explore my career timeline, and stay updated with my latest industry insights.', link: 'https://linkedin.com/in/adil-12-hassan', category: 'Profile' },
    { id: 5, title: 'Link Tree', desc: 'A centralized hub featuring all my essential links, social platforms, and active digital touchpoints in one convenient place.', link: 'https://linktr.ee/adil12Hassan', category: 'Links' },
]

const Profiles = () => {
    return (
        <section id="profiles" className="section bg-surface-soft dark:bg-surface-dark-soft">
            <div className="container-page">
                <SectionTitle heading="My" accent="Profiles" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profileList.map((profile) => (
                        <EntryCard key={profile.id} {...profile} />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Profiles;
