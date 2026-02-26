import { motion } from "motion/react";
import { Play, Star } from "lucide-react";

const testimonials = [
  {
    name: "MJ",
    business: "gentscustomwear.com",
    duration: "0:23",
    image: "https://picsum.photos/seed/stonex-mj/600/800",
    stars: 5,
  },
  {
    name: "Amir",
    business: "NikoMovingJr.ca",
    duration: "0:15",
    image: "https://picsum.photos/seed/stonex-amir/600/800",
    stars: 5,
  },
  {
    name: "Zahid",
    business: "troyfarms.ca",
    duration: "0:45",
    image: "https://picsum.photos/seed/stonex-zahid/600/800",
    stars: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-width-container mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-gh-teal font-semibold tracking-wider uppercase text-xs mb-4"
          >
            Real Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4 text-gh-red"
          >
            Testimonials straight from the source
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gh-muted max-w-2xl mx-auto"
          >
            Recent clients sharing their thoughts. These testimonials were not
            compensated and truly came from the client.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden gh-shadow-red cursor-pointer"
            >
              <img
                src={t.image}
                alt={`${t.name} testimonial`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gh-red shadow-xl transform group-hover:scale-110 transition-transform duration-300"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-gh-red text-gh-red"
                    />
                  ))}
                </div>
                <p className="font-medium text-lg">
                  {t.name}, owner of {t.business}
                </p>
                <p className="text-sm opacity-70">({t.duration})</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
