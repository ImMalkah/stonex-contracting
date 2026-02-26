import { motion } from "motion/react";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";

// Using high-quality placeholder images of construction/concrete to demonstrate the gallery layout
// The client will replace these with their own images in the public/gallery/ folder later.
const galleryImages = [
    {
        url: "https://images.unsplash.com/photo-1541888081665-2244498308dc?auto=format&fit=crop&q=80&w=800",
        title: "Excavation Works",
        category: "Excavation"
    },
    {
        url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
        title: "Concrete Pouring",
        category: "Concrete Services"
    },
    {
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
        title: "Foundation Setup",
        category: "Concrete Services"
    },
    {
        url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
        title: "Equipment Delivery",
        category: "Equipment Rentals"
    },
    {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
        title: "Site Preparation",
        category: "Full Project"
    },
    {
        url: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&q=80&w=800",
        title: "Heavy Machinery",
        category: "Excavation"
    }
];

export const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                    {galleryImages.map((img, i) => (
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
