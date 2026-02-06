import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const goToProducts = () => {
        const element = document.getElementById('pro');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <section
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-fixed bg-center bg-cover"
            style={{ backgroundImage: "url('/image/car1.png ')" }}
        >

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>

            <div className="relative z-10 text-center px-6 max-w-5xl">

                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-white mb-4 leading-none">
                    Drive Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Dream Car</span>
                </h2>

                <div className="h-1 w-24 bg-white mx-auto mb-6 rounded-full"></div> {/* Line separator */}

                <p className="text-lg md:text-xl text-gray-300 font-light tracking-widest uppercase max-w-2xl mx-auto mb-10">
                    Premium Cars <span className="mx-2 text-white/30">|</span> Trusted Quality <span className="mx-2 text-white/30">|</span> Unmatched Performance
                </p>

                <button onClick={goToProducts} className="group relative px-5 py-3 bg-white text-black font-black uppercase tracking-widest rounded-lg transition-all duration-500 hover:bg-black hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    Explore Inventory
                </button>

                <div className="flex gap-6 justify-center mt-16">
                    {[
                        { icon: <FaFacebookF />, link: "#" },
                        { icon: <FaInstagram />, link: "#" },
                        { icon: <FaLinkedinIn />, link: "#" }
                    ].map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className="text-white/60 hover:text-white hover:scale-125 transition-all duration-300 transform"
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
};

export default HeroSection;