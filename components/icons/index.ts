import { JSX } from "react";

export * from "./Arrow";
export * from "./Book";
export * from "./Calendar";
export * from "./Check";
export * from "./Clipboard";
export * from "./DocumentInfo";
export * from "./Heart";
export * from "./HeartPlus";
export * from "./Instagram";
export * from "./Location";
export * from "./Logo";
export * from "./MakersLeague";
export * from "./Profile";
export * from "./Question";
export * from "./Storm";
export * from "./Watch";

export interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export type Icon = ({ className, width, height }: IconProps) => JSX.Element;
