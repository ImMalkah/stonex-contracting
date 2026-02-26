import { motion } from "motion/react";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";

import { Button } from "./Button";

// Utilizing the real photos uploaded by the client
const galleryImages = [
    { url: "/gallery/IMG_1913.jpg", title: "Site Assessment", category: "Our Work" },
    { url: "/gallery/IMG_2144.jpg", title: "Excavation", category: "Our Work" },
    { url: "/gallery/IMG_2147.jpg", title: "Equipment Delivery", category: "Our Work" },
    { url: "/gallery/IMG_2240.jpg", title: "Concrete Finishing", category: "Our Work" },
    { url: "/gallery/IMG_2325.jpg", title: "Driveway Concrete", category: "Our Work" },
    { url: "/gallery/IMG_2399.jpg", title: "Machine Operator", category: "Our Work" },
    { url: "/gallery/IMG_2412.jpg", title: "Patios & Walkways", category: "Our Work" },
    { url: "/gallery/IMG_2413.jpg", title: "Concrete Pouring", category: "Our Work" },
    { url: "/gallery/IMG_2782.jpg", title: "Residential Service", category: "Our Work" },
    { url: "/gallery/IMG_3430.jpg", title: "Exposed Aggregate", category: "Our Work" },
    { url: "/gallery/IMG_3625.jpg", title: "Site Grading", category: "Our Work" },
    { url: "/gallery/IMG_3626.jpg", title: "Heavy Machinery", category: "Our Work" },
    { url: "/gallery/IMG_3744.jpg", title: "Landscaping Details", category: "Our Work" },
    { url: "/gallery/IMG_3746.jpg", title: "Track Loader", category: "Our Work" },
    { url: "/gallery/IMG_3760.jpg", title: "Foundation Prep", category: "Our Work" },
    { url: "/gallery/IMG_3762.jpg", title: "Skid Steer Action", category: "Our Work" },
    { url: "/gallery/IMG_3766.jpg", title: "Mini Excavator", category: "Our Work" },
    { url: "/gallery/IMG_3770.jpg", title: "Demolition Tasks", category: "Our Work" },
];

export const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(6);

    // Lock body scroll when lightbox is open
    if (typeof window !== 'undefined') {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    return (
        <section id="work" className="py-24 px-6 bg-white relative">
            <div className="max-width-container mx-auto">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-block text-gh-teal font-semibold tracking-wider uppercase text-xs mb-4"
                    >
                        Our Work
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl mb-4 text-gh-red"
                    >
                        Recent Projects
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gh-muted"
                    >
                        A glimpse into the quality equipment and concrete work we deliver.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.slice(0, visibleCount).map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square group rounded-[30px] overflow-hidden cursor-pointer bg-gh-bg"
                            onClick={() => setSelectedImage(img.url)}
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gh-text/90 via-gh-text/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <p className="text-gh-teal font-semibold tracking-widest uppercase text-xs mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.category}</p>
                                <h3 className="text-white text-xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.title}</h3>
                                <div className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:bg-white/40">
                                    <Maximize2 className="w-5 h-5" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {visibleCount < galleryImages.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-12 text-center"
                    >
                        <Button
                            variant="secondary"
                            onClick={() => setVisibleCount((prev) => prev + 6)}
                        >
                            Load More
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-gh-text/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 transition-all duration-300 cursor-zoom-out"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50 bg-gh-text/50 rounded-full cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={selectedImage}
                        alt="Enlarged view"
                        className="max-w-full max-h-[90vh] object-contain overflow-hidden rounded-md cursor-default shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
};
