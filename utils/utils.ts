export const isURL = (str: string): boolean =>
  (str.length >= 7 && str.substring(0, 7) === 'http://') ||
  (str.length >= 8 && str.substring(0, 8) === 'https://');

// deno-lint-ignore no-explicit-any
export const isAllUndefined = (obj: Record<string, any>): boolean =>
  Object.values(obj).every((val) => val === undefined);

export async function bring<Req, Res>(
  url: string,
  method: 'POST' | 'GET',
  body: Req,
  errorMessage: string,
): Promise<Res | null> {
  let responseJson;
  await fetch(url, {
    method: method,
    mode: 'no-cors',
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      responseJson = await res.json() as Res;
    })
    .catch((e) => {
      alert(errorMessage);
      console.error(errorMessage, e);
    });

  return responseJson ? responseJson : null;
}
