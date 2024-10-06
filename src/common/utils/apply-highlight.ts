export const applyHighlight = (text: string, pattern: string, _class: string): string =>
{
  if (!pattern)
  {
    return text;
  }
  const regex = new RegExp(`(${  pattern  })`, 'ig');
  const match = text.match(regex);
  let aux: string;
  match?.forEach((e) =>
  {
    aux = text.replace(new RegExp(e), `<span class='${_class}'>${e}</span>`);
  });
  return aux ?? text;
};
