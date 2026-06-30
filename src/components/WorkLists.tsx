import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        tech: string[];
        images: string[];
    };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <div className="group flex flex-col">
            <div className="relative w-full aspect-video bg-zinc-900 border border-zinc-800 mb-8 overflow-hidden group-hover:border-zinc-700 transition-colors">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={project.images[currentIndex]}
                        alt={`${project.title} - ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-black/20 duration-500" />

                {project.images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border"
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-color)',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            ←
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border"
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-color)',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            →
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {project.images.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300`}
                                    style={{ 
                                        backgroundColor: i === currentIndex ? 'var(--text-color)' : 'var(--text-secondary)',
                                        opacity: i === currentIndex ? 1 : 0.3,
                                        width: i === currentIndex ? '1rem' : '0.375rem'
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <h3 className="text-4xl font-medium h-[4.5rem] flex items-center mb-6 transition-colors line-clamp-2 leading-tight tracking-tight">
                {project.title}
            </h3>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                    <span 
                        key={i} 
                        className="text-[12px] uppercase tracking-wider font-bold px-2.5 py-1 border rounded-sm transition-all duration-500"
                        style={{ 
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
};

interface WorkListsProps {
    onClose?: () => void;
}

const WorkLists = ({ onClose }: WorkListsProps) => {
    const projects = [
        {
            title: "Real-Time Speech Rate and Emotion Feedback System",
            description: "Built a web app that uses NLP and machine learning to measure tempo, pronunciation, fluency, and emotion in speech, improving feedback accuracy over time through self-learning models.",
            tech: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "PostCSS", "Chart.js", "RxJS"],
            images: ["/assets/Real-Time Speech Rate and Emotion Feedback/drl.png"]
        },
        {
            title: "Talk.twah",
            description: "Developed a standalone web app to simplify speech data collection for the thesis system, streamlining the data gathering process and improving annotation efficiency.",
            tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase", "Web Audio API"],
            images: [
                "/assets/Talk.Twah/Screenshot 2026-04-29 033337.png",
                "/assets/Talk.Twah/Screenshot 2026-04-29 033343.png",
                "/assets/Talk.Twah/Screenshot 2026-04-29 033349.png",
                "/assets/Talk.Twah/Screenshot 2026-04-29 033355.png",
                "/assets/Talk.Twah/Screenshot 2026-04-29 032021.png"
            ]
        },
        {
            title: "SwingVA Landing Page",
            description: "Led 6-person freelance team delivering a marketing landing page for SwingVA’s virtual assistant services, supporting client branding and lead generation as part of a business solutions group.",
            tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"],
            images: ["/assets/SwingVA/Screenshot (598).png"]
        },
        {
            title: "Cyberwise",
            description: "Managed a small freelance game development team building a commissioned 2D top-down pixel game on Information Assurance & Security for an IT capstone project, contributing to game logic and user experience.",
            tech: ["GameMaker Studio 2"],
            images: [
                "/assets/CyberWise/Screenshot 2026-05-01 034922.png",
                "/assets/CyberWise/Screenshot 2026-05-01 035227.png",
                "/assets/CyberWise/Screenshot 2026-05-01 034956.png",
                "/assets/CyberWise/Screenshot 2026-05-01 035017.png",
                "/assets/CyberWise/Screenshot 2026-05-01 035132.png",
                "/assets/CyberWise/Screenshot 2026-05-01 035249.png"
            ]
        },
        {
            title: "YTMP3Downloader",
            description: "Built a personal full-stack tool to safely convert and download YouTube videos to 192kbps MP3 audio, reducing reliance on ad-heavy third-party sites.",
            tech: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Python", "Flask", "yt-dlp", "FFmpeg"],
            images: [
                "/assets/YTMP3Downloader/Screenshot (597).png"
            ]
        },
        {
            title: "REDAI Humanizer",
            url: "https://redai-humanizer.vercel.app/",
            description: "AI-powered web application that humanizes and enhances AI-generated content with features for AI detection, plagiarism checking, grammar correction, essay generation, and integrated productivity tools.",
            tech: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Radix", "Motion", "Convex", "Node.js", "GroqCloud API"],
            images: ["/assets/YTMP3Downloader/Screenshot (649).png",
                "/assets/YTMP3Downloader/Screenshot (650).png",
                "/assets/YTMP3Downloader/Screenshot (651).png",
                "/assets/YTMP3Downloader/Screenshot (652).png",
                "/assets/YTMP3Downloader/Screenshot (653).png",
                "/assets/YTMP3Downloader/Screenshot (654).png",
                "/assets/YTMP3Downloader/Screenshot (655).png"]
        }
    ];

    return (
        <div className="w-full min-h-screen transition-colors duration-500 flex flex-col px-8 md:px-20 pt-12 pb-40" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            {/* Top Navigation Bar */}
            <div className="w-full flex justify-between items-center mb-16">
                <h2 className="text-5xl font-medium tracking-tight">ALL PROJECTS</h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-lg font-medium transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        ← Back to Portfolio
                    </button>
                )}
            </div>

            {/* Project List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 mb-20">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
            <div className="h-40 w-full shrink-0" />
        </div>
    );
};

export default WorkLists;
