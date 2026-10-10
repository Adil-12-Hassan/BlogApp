import SectionTitle from '../../components/ui/SectionTitle'
import EntryCard from '../../components/ui/EntryCard'

const projectList = [
    { id: 1, title: 'Pizza Shop', desc: 'A full stack resturant app. It containes admin panel to manage website, menu items, bookings, messages and many more features.', link: 'https://pizza-paradise-gamma.vercel.app/', category: 'Full Stack' },
    { id: 2, title: 'Muhammad Ali Website', desc: 'A dedicated website built with a focus on branding and user engagement.', link: 'https://muhammad-ali-website.vercel.app/', category: 'Website' },
    { id: 3, title: 'My Landing Pages', desc: 'I create a website from my all small projects that was like pieces of a main thing.', link: 'https://hassan-pages.vercel.app/', category: 'Website' },
]

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container-page">
                <SectionTitle heading="My" accent="Projects" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectList.map((project) => (
                        <EntryCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Projects;
