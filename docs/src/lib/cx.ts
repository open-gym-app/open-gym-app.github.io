/** Joins class names, skipping falsy ones: `cx('a', isOn && 'b', undefined)` → `'a b'`. */
export default function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
