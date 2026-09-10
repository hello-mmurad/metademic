import type { Testimonial } from "@/types/content";

/**
 * Add only verified, permission-cleared quotes. The "What people say"
 * section on the RACoN microsite renders automatically when this array
 * is non-empty and stays hidden otherwise. Never fabricate testimonials.
 */
export const testimonials: Testimonial[] = [];