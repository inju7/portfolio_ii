const TechStacks = () => {
    const stacks = [
        'React', 'TypeScript', 'Angular', 'Node.js', 'Express', 'Python', 'Flask', 
        'Tailwind CSS', 'Vite', 'Supabase', 'shadcn/ui', 'RxJS', 'Chart.js', 
        'ML & NLP', 'Web Audio API', 'yt-dlp', 'FFmpeg', 'GameMaker Studio 2'
    ];

    return (
        <section className="w-full h-full flex flex-col justify-center px-12 md:px-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 className="text-6xl font-medium mb-10">TECH STACK</h2>
            <div className="flex flex-wrap gap-3">
                {stacks.map((tech) => (
                    <span
                        key={tech}
                        className="px-5 py-2 text-xs font-bold uppercase tracking-widest border rounded-sm transition-all cursor-default"
                        style={{ 
                            borderColor: 'var(--border-color)',
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TechStacks;
