export function geNextLetter(char: string) {

  const code = char.charCodeAt(0);

  if (char === 'z') return 'a';
  if (char === 'Z') return 'A';

  return String.fromCharCode(code + 1);
}
