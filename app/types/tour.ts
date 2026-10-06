import type { StoreManager } from "./store_manager";

export type TourPlacement = "top" | "bottom" | "left" | "right";

export type TourState = {
    active: boolean;
    index: number;
    stars: number;
    finished: boolean;
    baseline_cart: number;
};

export type TourBeat = {
    id: string;
    step: 1 | 2 | 3 | 4 | 5;
    emoji: string;
    title: string;
    bullets: string[];
    hint?: string;
    target: string;
    placement?: TourPlacement;
    advance: "manual" | "auto";
    cta?: string;
    before_show?: "scroll_top" | "scroll_into_view";
    when?: (store: StoreManager, state: TourState) => boolean;
};
