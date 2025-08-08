// Minimal "cn" that won't blow up if given falsy values
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
