import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxProps {
    images: string[];
    startIndex: number;
    title: string;
    onClose: () => void;
}

const Lightbox = ({ images, startIndex, title, onClose }: LightboxProps) => {
    const [index, setIndex] = useState(startIndex);

    const prev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIndex((i) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    const next = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIndex((i) => (i + 1) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, prev, next]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-8 text-3xl font-light transition-opacity hover:opacity-60 z-10"
                style={{ color: 'var(--text-color)' }}
                aria-label="Close lightbox"
            >
                ✕
            </button>

            {/* Caption */}
            <div
                className="absolute top-6 left-8 text-sm font-medium tracking-widest uppercase z-10"
                style={{ color: 'var(--text-secondary)' }}
            >
                {title} &nbsp;·&nbsp; {index + 1} / {images.length}
            </div>

            {/* Image */}
            <div
                className="relative flex items-center justify-center w-full h-full px-20"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={index}
                        src={images[index]}
                        alt={`${title} — ${index + 1}`}
                        className="max-w-full max-h-[85vh] object-contain shadow-2xl select-none"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        draggable={false}
                    />
                </AnimatePresence>

                {/* Prev / Next */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border transition-opacity hover:opacity-80"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.07)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-color)',
                                backdropFilter: 'blur(6px)'
                            }}
                            aria-label="Previous image"
                        >
                            ←
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border transition-opacity hover:opacity-80"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.07)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-color)',
                                backdropFilter: 'blur(6px)'
                            }}
                            aria-label="Next image"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {/* Dot indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === index ? '1.5rem' : '0.5rem',
                                height: '0.5rem',
                                backgroundColor: i === index ? 'var(--text-color)' : 'var(--text-secondary)',
                                opacity: i === index ? 1 : 0.35,
                            }}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// ── ProjectCard ───────────────────────────────────────────────────────────────

interface ProjectCardProps {
    project: {
        title: string;
        url?: string;
        description: string;
        tech: string[];
        images: string[];
    };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <>
            <div className="group flex flex-col">
                <div
                    className="relative w-full aspect-video bg-zinc-900 border border-zinc-800 mb-8 overflow-hidden group-hover:border-zinc-700 transition-colors cursor-zoom-in"
                    onClick={() => setLightboxIndex(currentIndex)}
                    title="Click to enlarge"
                >
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

                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/20 duration-500 group-hover:bg-black/10" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span
                            className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 border"
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.55)',
                                borderColor: 'rgba(255,255,255,0.18)',
                                color: '#fff',
                                backdropFilter: 'blur(6px)'
                            }}
                        >
                            View Full Image
                        </span>
                    </div>

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
                    {project.url ? (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-blue-500 transition-colors"
                        >
                            {project.title}
                        </a>
                    ) : (
                        project.title
                    )}
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

            {/* Lightbox portal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={project.images}
                        startIndex={lightboxIndex}
                        title={project.title}
                        onClose={() => setLightboxIndex(null)}
                    />
                )}
            </AnimatePresence>
        </>
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
            images: ["/assets/REDAI Humanizer/Screenshot (649).png",
                "/assets/REDAI Humanizer/Screenshot (650).png",
                "/assets/REDAI Humanizer/Screenshot (651).png",
                "/assets/REDAI Humanizer/Screenshot (652).png",
                "/assets/REDAI Humanizer/Screenshot (653).png",
                "/assets/REDAI Humanizer/Screenshot (654).png",
                "/assets/REDAI Humanizer/Screenshot (655).png"]
        },
        {
            title: "Apex Home Services",
            description: "A WordPress + Elementor service-business website built with custom PHP shortcodes and responsive UI components.",
            tech: ["WordPress", "Elementor", "PHP", "CSS"],
            images: ["/assets/Apex Home Services/Opera Snapshot_2026-08-26_073659_wordpress-lab.local.png"]
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
