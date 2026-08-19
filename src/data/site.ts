// Centralized site config — profile images, social URLs, section IDs

export const SITE = {
  name: "Ryan Dante",
  title: "Principal Software Engineer & Systems Architect",
  images: {
    heroPortrait: "/images/IMG_0110.png",
    bioHubAvatar: "/images/IMG_0109.jpg",
    ogImage: "/images/IMG_0110.png",
  },
  social: {
    github: "https://github.com/ryandante",
    linkedin: "https://linkedin.com/in/ryandante",
  },
  sections: {
    home: "home",
    projects: "projects",
    systems: "systems",
    logs: "logs",
    faq: "faq",
    terminal: "terminal",
    about: "about",
    feedback: "feedback",
  },
} as const;
