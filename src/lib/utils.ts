type ClassValue = string | number | bigint | null | boolean | undefined;

export function classNames(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
