export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  intro: string;
  points: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "portrait-photo-editing",
    title: "Portrait Photo Editing Service",
    shortTitle: "Portrait Editing",
    description:
      "Hand-edited portrait photo retouching with natural skin tones, clean color balance, and cinematic finishing for photographers and creators.",
    keywords: [
      "portrait photo editing service",
      "portrait retouching",
      "natural skin tone retouch",
      "cinematic portrait editing",
    ],
    intro:
      "Portrait sessions live or die on the little things. Every frame is refined by hand for natural skin, controlled highlights, and a finish that still looks like a person, not polished plastic.",
    points: [
      "Natural skin retouching without plastic texture",
      "Balanced exposure and controlled color temperature",
      "Consistent style across full portrait sets",
    ],
    faqs: [
      {
        question: "Do you over-smooth skin in portraits?",
        answer:
          "No. Skin work is done manually to preserve texture while removing distractions and keeping the subject natural.",
      },
      {
        question: "Can you match a specific portrait style?",
        answer:
          "Yes. Share references in your notes and I will match the direction while keeping the whole set visually steady.",
      },
    ],
  },
  {
    slug: "landscape-photo-editing",
    title: "Landscape Photo Editing Service",
    shortTitle: "Landscape Editing",
    description:
      "Professional landscape photo editing with natural dynamic range, refined color grading, and cinematic contrast for travel and outdoor creators.",
    keywords: [
      "landscape photo editing service",
      "landscape photo retouching",
      "travel photo color grading",
      "outdoor photo editing",
    ],
    intro:
      "Landscape work needs restraint. The goal is to preserve the mood, hold onto the detail, and avoid turning the sky into a science experiment.",
    points: [
      "Natural color balance across changing light",
      "Controlled contrast without crushed details",
      "Cohesive finishing for full landscape series",
    ],
    faqs: [
      {
        question: "Can you keep natural colors in outdoor scenes?",
        answer:
          "Yes. Greens stay believable, skies stay clean, and the overall grade stays cinematic without drifting into fantasy land.",
      },
      {
        question: "Do you edit by hand or use AI tools?",
        answer:
          "Every landscape image is refined by hand. No AI retouching workflows are used.",
      },
    ],
  },
  {
    slug: "event-photo-editing",
    title: "Event Photo Editing Service",
    shortTitle: "Event Editing",
    description:
      "Professional event photo editing for parties, conferences, and live experiences with consistent color, clean contrast, and polished delivery.",
    keywords: [
      "event photo editing service",
      "event photo retouching",
      "conference photo editing",
      "party photo editing",
    ],
    intro:
      "Events rarely hand you perfect light, which is exactly why the edit matters. The full gallery is balanced for clean skin, clear detail, and a finish that still feels alive.",
    points: [
      "Reliable tone matching across mixed lighting",
      "Natural skin and controlled highlights",
      "Cohesive event gallery finishing",
    ],
    faqs: [
      {
        question: "Can you normalize different lighting conditions in events?",
        answer:
          "Yes. Exposure and color are corrected scene-by-scene so the final event gallery stays coherent.",
      },
      {
        question: "Can event edits be used for social delivery?",
        answer:
          "Yes. The final set works for delivery, portfolio use, and social posts without needing a second round of rescue edits.",
      },
    ],
  },
];