export function toBengaliNumerals(str: string | number): string {
  if (str === null || str === undefined) return '';
  const text = String(str);
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return text.replace(/[0-9]/g, (match) => bengaliDigits[parseInt(match, 10)]);
}

export function toEnglishNumerals(str: string | number): string {
  if (str === null || str === undefined) return '';
  const text = String(str);
  const bengaliDigitsMap: Record<string, string> = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
  };
  return text.replace(/[০-৯]/g, (match) => bengaliDigitsMap[match] || match);
}

export function formatNumberByLanguage(
  val: string | number,
  language: 'bn' | 'en',
  forceBengaliNumerals = false
): string {
  if (language === 'bn' || forceBengaliNumerals) {
    return toBengaliNumerals(val);
  }
  return toEnglishNumerals(val);
}
