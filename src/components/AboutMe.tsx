const AboutMe = () => {
    return (
        <section className="w-full h-full flex flex-col justify-center px-12 md:px-20 transition-colors duration-500" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 className="text-6xl font-medium mb-6">ABOUT ME</h2>
            <p className="text-xl leading-relaxed max-w-xl mb-6" style={{ color: 'var(--text-secondary)' }}>
                Hello! I'm Arian, a software developer from bicol. I am passionate about building ideas into reality. I started my journey as a scrum master and front-end developer during my college internship and then I
                slowly learned back-end development & database. I also aim to become proficient in those areas along with UI/UX design
                and mobile development.
            </p>
            <i className="text-xl italic leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                p.s. i am open to business and work opportunities, so scroll down at the end to connect with me.
            </i>
        </section>
    );
};

export default AboutMe;
