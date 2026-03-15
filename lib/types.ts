import type { Timestamp } from "firebase/firestore";

export type ReefReview = {
  uid: string;
  text: string;
  timestamp?: Timestamp;
};

export type Reef = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  facts?: string[];
  issues?: string[];
  stats?: {
    coralCover: number;
    fishDiversity: number;
    waterClarity: number;
    heatStress: number;
  };
  likes?: number;
  bookmarks?: number;
  reviews?: ReefReview[];
};

export type UserReview = {
  reefSlug: string;
  text: string;
  timestamp?: Timestamp;
};

export type UserProfile = {
  uid: string;
  displayName: string;
  email: string;
  bookmarks: string[];
  likes: string[];
  reviews: UserReview[];
};
