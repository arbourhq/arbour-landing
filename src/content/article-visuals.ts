import { COMPARISON_VISUALS } from "./article-visuals/comparisons";
import { GUIDE_VISUALS } from "./article-visuals/guides";
import { RESEARCH_VISUALS } from "./article-visuals/research";
import type { ArticleVisuals } from "./article-visuals/types";

export type {
  ArticleFigure,
  ArticleImage,
  ArticleVisuals,
} from "./article-visuals/types";

/** Editorial figures sit beside the section they explain, independently of prose. */
export const ARTICLE_VISUALS: Record<string, ArticleVisuals> = {
  ...RESEARCH_VISUALS,
  ...GUIDE_VISUALS,
  ...COMPARISON_VISUALS,
};
