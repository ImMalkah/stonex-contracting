import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, MessageSquareQuote, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

interface GoogleReview {
  name: string;
  publishTime: string;
  rating: number;
  text: string;
  photoUri: string;
}

export const Testimonials = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("get-google-reviews");

        if (error) throw new Error(error.message);
        if (data?.error) throw new Error(data.message || data.error);
        if (!data?.reviews) throw new Error("No reviews found.");

        const formatted = data.reviews
          .filter((r: any) => r.text?.text) // Only show reviews with text
          .map((r: any) => ({
            name: r.authorAttribution?.displayName || "Google User",
            publishTime: r.relativePublishTimeDescription || "",
            rating: r.rating || 5,
            text: r.text?.text || "",
            photoUri: r.authorAttribution?.photoUri || "",
          }));

        setReviews(formatted.slice(0, 6)); // Show top 6
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-24 px-6 bg-gh-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-gh-red/5 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gh-teal/5 to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-width-container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-gh-teal font-semibold tracking-wider uppercase text-xs mb-4"
          >
            Google Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4 text-gh-red font-bold tracking-tight"
          >
            Client Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gh-muted max-w-2xl mx-auto"
          >
            Real feedback from our valued clients in the community.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gh-red">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-gh-muted font-medium animate-pulse">Loading verified reviews...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-gh-card border border-gh-border rounded-2xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-gh-red mx-auto mb-4" />
            <h3 className="text-gh-text font-semibold text-lg mb-2">Attention Required</h3>
            <p className="text-gh-muted mb-6">{error}</p>
            <div className="bg-gh-bg rounded-lg p-4 shadow-sm border border-gh-border text-left">
              <p className="text-sm text-gh-text/80 font-mono break-all font-semibold mb-2">
                1. Go to Supabase Dashboard &gt; Project Settings &gt; Edge Functions
              </p>
              <p className="text-sm text-gh-text/80 font-mono break-all font-semibold">
                2. Add a new secret: <br /><br />
                <span className="bg-gh-card px-2 py-1 rounded border border-gh-border">GOOGLE_PLACE_ID</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gh-card rounded-3xl p-8 border border-gh-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgb(220,38,38,0.06)] dark:hover:shadow-[0_20px_40px_rgb(220,38,38,0.15)] hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                  <MessageSquareQuote className="w-16 h-16 text-gh-red" />
                </div>

                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </div>

                <p className="text-gh-text/80 leading-relaxed mb-8 relative z-10 line-clamp-4">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={review.photoUri || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gh-bg shadow-md bg-gh-card"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`;
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gh-text">{review.name}</h4>
                    <p className="text-sm text-gh-muted">{review.publishTime}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
