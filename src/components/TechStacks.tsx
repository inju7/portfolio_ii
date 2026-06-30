const TechStacks = () => {
    const techStacks = {
        Frontend: [
            'React', 'TypeScript', 'Angular', 'Tailwind CSS', 'Vite', 'shadcn/ui', 'Chart.js'
        ],
        Backend: [
            'Node.js', 'Express', 'Python', 'Flask'
        ],
        Database: [
            'Firebase', 'Convex', 'Supabase', 'PostgreSQL'
        ],
        AI: [
            'ML & NLP', 'GroqCloud', 'Ollama', 'OpenRouter', 'Gemini', 'ollama'
        ],
        Media: [
            'Web Audio API', 'yt-dlp', 'FFmpeg'
        ],
        GameDev: [
            'GameMaker Studio 2'
        ]

    };
    return (
        <section className="w-full h-full flex flex-col justify-center px-12 md:px-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 className="text-6xl font-medium mb-10">TECH STACK</h2>
            <div className="space-y-8">
                {Object.entries(techStacks).map(([category, stacks]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold mb-3 text-[var(--text-color)]">
                            {category}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {stacks.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-5 py-2 text-xs font-bold uppercase tracking-widest border rounded-sm transition-all cursor-default"
                                    style={{
                                        borderColor: 'var(--border-color)',
                                        backgroundColor: 'rgba(255,255,255,0.03)',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStacks;
