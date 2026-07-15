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
      "Portrait editing that fixes distractions, keeps real skin texture, and gives the whole set one believable color story.",
    keywords: [
      "portrait photo editing service",
      "portrait retouching",
      "natural skin tone retouch",
      "cinematic portrait editing",
    ],
    intro:
      "Portrait sessions live or die on the little things. I clean up distractions, control the highlights, and keep the person looking like a person—not polished plastic.",
    points: [
      "Natural skin retouching without plastic texture",
      "Exposure and color temperature brought back into line",
      "One steady look across the whole portrait set",
    ],
    faqs: [
      {
        question: "Do you over-smooth skin in portraits?",
        answer:
          "No. I keep texture and remove distractions. Pores are not a design flaw.",
      },
      {
        question: "Can you match a specific portrait style?",
        answer:
          "Yes. Send references, name a mood, or describe what you dislike. I will translate it into one steady look across the set.",
      },
    ],
  },
  {
    slug: "landscape-photo-editing",
    title: "Landscape Photo Editing Service",
    shortTitle: "Landscape Editing",
    description:
      "Landscape editing with believable skies, controlled contrast, and detail that survives from the shadows to the bright bits.",
    keywords: [
      "landscape photo editing service",
      "landscape photo retouching",
      "travel photo color grading",
      "outdoor photo editing",
    ],
    intro:
      "Landscape work needs restraint. The goal is to preserve the mood, hold onto the detail, and avoid turning the sky into a science experiment.",
    points: [
      "Changing light persuaded to agree with itself",
      "Contrast with the shadow detail still present",
      "One believable finish across the full series",
    ],
    faqs: [
      {
        question: "Can you keep natural colors in outdoor scenes?",
        answer:
          "Yes. Greens stay believable, skies stay clean, and the grade stops well before fantasy land.",
      },
      {
        question: "Is each landscape edited individually?",
        answer:
          "Yes. I work through every image by hand, then check the series together so one frame does not wander off stylistically.",
      },
    ],
  },
  {
    slug: "event-photo-editing",
    title: "Event Photo Editing Service",
    shortTitle: "Event Editing",
    description:
      "Event editing for mixed light, fast moments, and galleries that need to feel like one night—not seven different venues.",
    keywords: [
      "event photo editing service",
      "event photo retouching",
      "conference photo editing",
      "party photo editing",
    ],
    intro:
      "Events rarely hand you perfect light, which is exactly why the edit matters. The full gallery is balanced for clean skin, clear detail, and a finish that still feels alive.",
    points: [
      "Mixed lighting made far less argumentative",
      "Natural skin and highlights kept in their lane",
      "One steady finish from first frame to last",
    ],
    faqs: [
      {
        question: "Can you normalize different lighting conditions in events?",
        answer:
          "Yes. I correct exposure and color scene by scene, then check the gallery as a whole. Events are chaotic; the delivery does not need to be.",
      },
      {
        question: "Can event edits be used for social delivery?",
        answer:
          "Yes. The files arrive ready for client delivery, a portfolio, or social posts—no second rescue mission required.",
      },
    ],
  },
];
