

interface WorksProps {
    onOpen: () => void;
}

const Works = ({ onOpen }: WorksProps) => {
    return (
        <section className="w-full h-full flex flex-col justify-center px-12 md:px-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 className="text-6xl font-medium mb-6">PROJECTS</h2>
            <p className="text-xl mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                Here are some of the projects I've built recently. Click below to view the full list of my work.
            </p>
            <button 
                onClick={onOpen}
                className="w-fit px-8 py-3 font-medium text-lg transition-colors duration-300"
                style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
            >
                View All Projects
            </button>
        </section>
    );
};

export default Works;
