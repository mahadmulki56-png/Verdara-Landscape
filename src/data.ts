import heroImg from './assets/images/verdant_hero_1784397355364.jpg';
import service1Img from './assets/images/verdant_service_1_1784397369360.jpg';
import service2Img from './assets/images/verdant_service_2_1784397383140.jpg';
import service3Img from './assets/images/verdant_service_3_1784397395624.jpg';
import featuredImg from './assets/images/verdant_featured_1784397409630.jpg';
import mowerHeroImg from './assets/images/verdant_mower_hero_1784398135401.jpg';
import blog1Img from './assets/images/verdant_blog_1_1784398150874.jpg';
import blog2Img from './assets/images/verdant_blog_2_1784398164979.jpg';

import { Service, Project, Testimonial } from './types';

export { heroImg, service1Img, service2Img, service3Img, featuredImg, mowerHeroImg, blog1Img, blog2Img };

export const SERVICES: Service[] = [
  {
    id: 'garden-design',
    number: '01',
    title: 'Garden Design',
    description: "Full-service design from concept to completion. We create gardens that work with your home's architecture and the natural landscape.",
    image: service1Img
  },
  {
    id: 'landscape-architecture',
    number: '02',
    title: 'Landscape Architecture',
    description: 'Large-scale outdoor environments — terraces, water features, lighting, and structural planting for residential and commercial clients.',
    image: service2Img
  },
  {
    id: 'seasonal-maintenance',
    number: '03',
    title: 'Seasonal Maintenance',
    description: 'Year-round care that keeps your garden performing at its peak. Pruning, replanting, soil health, and everything in between.',
    image: service3Img
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'whitmore-garden',
    title: 'The Whitmore Estate',
    location: 'Cherry Creek, CO',
    area: '1.2 Acres',
    duration: '18 Month Project',
    scope: 'Full Design & Build',
    description: 'A complete rear garden transformation across 1.2 acres. Working with the existing mature ponderosa pines, we introduced a formal lawn, mixed alpine perennial borders, a sunken fire pit seating area, and a kitchen garden enclosed by custom espaliered heritage apple trees.',
    image: featuredImg,
    year: '2024',
    badge: 'Project of the Year',
    category: 'formal'
  },
  {
    id: 'chelsea-townhouse',
    title: 'The Cherry Creek Sanctuary',
    location: 'Denver, CO',
    area: '150 sqm',
    duration: '6 Month Project',
    scope: 'Garden Design & Lighting',
    description: 'An intimate, low-maintenance contemporary oasis. Features include clean white limestone tiling, custom horizontal red-cedar trellises, pristine white-stemmed aspen trees, and architectural planting with custom warm-bronze up-lighting.',
    image: service2Img,
    year: '2023',
    category: 'contemporary'
  },
  {
    id: 'wildflower-meadow',
    title: 'The Boulder Alpine Meadow',
    location: 'Boulder, CO',
    area: '3.5 Acres',
    duration: '12 Month Project',
    scope: 'Wildlife Garden & Planting',
    description: 'Restoration of an ancient orchard into a vibrant, bio-diverse alpine wildflower meadow. Completed with natural Colorado flagstone walling, a custom honeybee apiary, and soft winding mown-grass pathways.',
    image: service1Img,
    year: '2024',
    category: 'wildlife'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-james',
    quote: 'Working with Verdara Landscapes was the single best decision we made during our estate renovation. Our gardens now feel like an elegant, living extension of our living room — somewhere we truly seek comfort and sanctuary.',
    author: 'Sarah & James H.',
    location: 'Cherry Creek',
    stars: 5
  },
  {
    id: 'arthur-g',
    quote: 'Verdara transformed our Boulder plot into a sophisticated geometric sanctuary. The team’s attention to detail, from the exact joint alignment of the hand-carved flagstone to the specific botanical specimens, is absolutely exquisite.',
    author: 'Arthur G.',
    location: 'Boulder',
    stars: 5
  }
];

export const BLOG_POSTS = [
  {
    id: 'irrigation-guide',
    title: 'The Hydrological Sanctuary: Ultimate Guide to Smart Sub-Surface Irrigation',
    excerpt: 'How to optimize watering frequencies, choose the best root-directed drip zones, and maintain perfect mineral balance without wasting Colorado water.',
    image: blog1Img,
    category: 'Irrigation',
    date: 'July 14, 2026',
    author: 'Liam Sterling'
  },
  {
    id: 'autumn-planting',
    title: 'Autumn Planting: Soil Preparation for Winter Dormancy',
    excerpt: 'Selecting bulbs, organic soil conditioning, and structural planning techniques to guarantee a stunning spring awakening in your garden.',
    image: blog2Img,
    category: 'Planting',
    date: 'June 28, 2026',
    author: 'Olivia Vance'
  },
  {
    id: 'landscape-lighting',
    title: 'Atmospheric Garden Lighting: Principles of Accent and Silhouette',
    excerpt: 'Enhance your outdoor terrace with modern bronze uplighting, pathways guide rails, and subtle structural tree focal illumination.',
    image: service2Img,
    category: 'Architecture',
    date: 'May 12, 2026',
    author: 'Marcus Aurel'
  }
];
