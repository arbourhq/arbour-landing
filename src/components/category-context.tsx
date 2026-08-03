"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CATEGORIES, type Category } from "@/content/categories";

type CategoryContextValue = {
  category: Category;
  index: number;
  setIndex: (index: number) => void;
};

const CategoryContext = createContext<CategoryContextValue | null>(null);

export function useCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategory must be used inside <CategoryProvider>");
  }
  return ctx;
}

/**
 * Picking a category in the hero re-skins the hero mock, the product tabs and
 * the pipeline further down the page. One choice, three sections.
 */
export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);

  const value = useMemo(
    () => ({ category: CATEGORIES[index], index, setIndex }),
    [index],
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
