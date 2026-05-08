const Contact = () => {
    return (
        <section className="w-full h-full flex flex-col justify-center px-12 md:px-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 className="text-6xl font-medium mb-6">LET'S CONNECT</h2>
            <p className="text-xl mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                I'm always open to discussing product work or partnership opportunities.
                Feel free to reach out to me!
            </p>
            <div className="flex gap-4">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=allorde.arian@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-cyan)] hover:-translate-y-1 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    style={{ color: 'var(--text-secondary)' }}
                    title="Email Me">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/arianmta/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] hover:-translate-y-1 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,119,181,0.5)]" style={{ color: 'var(--text-secondary)' }} title="LinkedIn Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                </a>
                <a
                    href="https://github.com/inju7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:-translate-y-1 transition-all duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                    title="GitHub Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default Contact;
