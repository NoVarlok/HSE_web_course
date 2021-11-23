export type AgeRatingType = "E" | "E10+" | "T" | "M" | "A" | "RP";

export class Game {
    id: number | null;
    title: string;
    description: string;
    images: string[];
    ageRating:  AgeRatingType;
}