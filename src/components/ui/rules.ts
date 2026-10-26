/**
 * The rules between four butted cells of the sheet: stacked on a phone, two
 * by two from `sm`, four across from `lg`. Each cell draws its own top or
 * left hairline, so a cell can still carry its own ground.
 */
export function quadRules(i: number) {
  return [
    i > 0 ? "border-t border-rule" : "",
    i === 1 ? "sm:border-t-0 sm:border-l" : "",
    i === 3 ? "sm:border-l" : "",
    "lg:border-t-0",
    i > 0 ? "lg:border-l" : "",
  ].join(" ");
}
