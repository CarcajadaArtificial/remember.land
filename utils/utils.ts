import { DateTime } from 'ptera';
import { Document, KvValue } from 'kvdex';

export const isURL = (str: string): boolean =>
  (str.length >= 7 && str.substring(0, 7) === 'http://') ||
  (str.length >= 8 && str.substring(0, 8) === 'https://');

export const isAllUndefined = (obj: Record<string, unknown>): boolean =>
  Object.values(obj).every((val) => val === undefined);

export async function bring<Req, Res>(
  url: string,
  method: 'POST' | 'GET',
  body: Req,
  errorMessage: string,
): Promise<Res | null> {
  let responseJson: Res | null = null;

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
      console.error(errorMessage, responseJson, e);
    });

  return responseJson;
}

export function adjustToLastHour(date: Date, hour: number) {
  if (date.getHours() < hour) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(hour, 0, 0, 0);
  return date;
}

export const isLastDayOfMonth = (date: DateTime) =>
  date.add({ day: 1 }).day === 1;

export function forEachInN(n: number, cb: (i: number) => void) {
  for (let i = 0; i < n; i++) {
    cb(i);
  }
}

export const createDictionaryDocument = (
  documents: Document<KvValue>[],
) =>
  documents.reduce((acc: { [key: string]: unknown }, doc) => {
    acc[doc.id.toString()] = doc.value;
    return acc;
  }, {});
