export const getParts = (index: number, input: string) => {
  const firstSpace = input.indexOf(' ', index);
  const trimmed = firstSpace === -1 ? input.slice(index + 1) : input.slice(index + 1, firstSpace);
  const parts = trimmed.split('/').map(x => x.trim()).filter(p => p !== '');
  return parts;
};