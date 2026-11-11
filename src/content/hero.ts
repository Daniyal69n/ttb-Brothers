export type HeroCarouselPage =
  | "home"
  | "about"
  | "values"
  | "team"
  | "clients"
  | "services"
  | "projects"
  | "careers"
  | "contact"
  | "privacy";

export const defaultPageHeroImages: Record<HeroCarouselPage, string[]> = {
  home: [
    "/images/values/1.jpeg",
    "/images/values/2.jpeg",
    "/images/values/11.jpeg",
    "/images/values/12.jpeg",
    "/images/values/13.jpeg",
    "/images/values/14.jpeg",
    "/images/values/15.jpeg",
    "/images/values/16.jpeg",
    "/images/values/17.jpeg",
    "/images/values/18.jpeg",
    "/images/values/19.jpeg",
    "/images/values/20.jpeg",
    "/images/values/21.jpeg",
    "/images/values/22.jpeg",
    "/images/values/23.jpeg",
    "/images/values/24.jpeg",
    "/images/values/25.jpeg",
    "/images/values/26.jpeg",
    "/images/values/28.jpeg",
    "/images/values/30.jpeg",
    "/images/values/32.jpeg",
    "/images/values/33 (1).jpeg",
    "/images/values/33 (3).jpeg",
    "/images/values/33 (7).jpeg",
    "/images/values/33 (10).jpeg",
    "/images/values/33 (15).jpeg",
    "/images/values/33 (20).jpeg",
    "/images/values/33 (25).jpeg",
    "/images/values/33 (30).jpeg",
  ],
  about: [],
  values: [],
  team: [],
  clients: [],
  services: [
    "/images/values/15.jpeg",
    "/images/values/21.jpeg",
    "/images/values/22.jpeg",
    "/images/projects/6.jpeg",
    "/images/values/16.jpeg",
    "/images/values/17.jpeg",
    "/images/values/18.jpeg",
    "/images/values/19.jpeg",
    "/images/values/20.jpeg",
    "/images/values/23.jpeg",
    "/images/projects/2.jpeg",
    "/images/projects/3.jpeg",
    "/images/projects/4.jpeg",
    "/images/projects/8.jpeg",
    "/images/projects/1.jpeg",
    "/images/values/13.jpeg",
    "/images/values/24.jpeg",
    "/images/values/25.jpeg",
    "/images/values/26.jpeg",
    "/images/values/28.jpeg",
    "/images/values/30.jpeg",
    "/images/values/32.jpeg",
  ],
  projects: [
    "/images/values/15.jpeg",
    "/images/values/21.jpeg",
    "/images/values/22.jpeg",
    "/images/projects/6.jpeg",
  ],
  careers: [],
  contact: [],
  privacy: [],
};
