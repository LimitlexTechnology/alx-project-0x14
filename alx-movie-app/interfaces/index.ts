import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}

export interface MovieProps {
  title: string
  posterImage: string
  releaseYear: number
}

export interface MoviesProps {
  titleText: { text: string }
  primaryImage?: { url: string }
  releaseYear: { year: number }
}
