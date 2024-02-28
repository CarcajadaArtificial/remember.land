import { DateTime } from 'ptera';

/** @todo Write documentation. */
export const isURL = (str: string): boolean =>
  (str.length >= 7 && str.substring(0, 7) === 'http://') ||
  (str.length >= 8 && str.substring(0, 8) === 'https://');

/** @todo Write documentation. */
export const isAllUndefined = (obj: Record<string, unknown>): boolean =>
  Object.values(obj).every((val) => val === undefined);

/** @todo Write documentation. */
export async function bring<Req, Res = unknown>(
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

/** @todo Write documentation. */
export function adjustToLastHour(date: Date, hour: number) {
  if (date.getHours() < hour) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(hour, 0, 0, 0);
  return date;
}

/** @todo Write documentation. */
export const isLastDayOfMonth = (date: DateTime) =>
  date.add({ day: 1 }).day === 1;

/** @todo Write documentation. */
export function forEachInN(n: number, cb: (i: number) => void) {
  for (let i = 0; i < n; i++) {
    cb(i);
  }
}

/**
 * This function handles a keyboard interaction coined "super enter". This is when you press the
 * key combinations Ctrl+Enter on windows and Cmd+Enter on mac. Optionally, one can also add a callback
 * to the pressing of the first key for an incremental interaction, with two states one by pressing
 * ctrl/cmd and another by pressing enter afterwards.
 *
 * Interactions
 *
 * @param {Function} cbOnEnter
 *   This function is to be executed when the key combo ctrl/cmd + Enter is pressed.
 *
 * @param {Function} cbOnEnter
 *  *[Optional]* This function is to be executed when the first key (ctrl/cmd) is pressed.
 *
 * @returns {Function}
 *  Event handler function using the passed callbacks.
 *
 * @todo Detect operating system to choose between ev.metaKey and ev.ctrlKey.
 */
export const onSuperEnter = (
  cbOnEnter: () => void,
  cbOnCtrl?: () => void,
) =>
(ev: KeyboardEvent) => {
  if (ev.metaKey || ev.ctrlKey) {
    if (cbOnCtrl) {
      cbOnCtrl();
    }
    if (ev.key === 'Enter') {
      cbOnEnter();
    }
  }
};

// export const createDictionaryDocument = <T>(
//   documents: Document<KvValue>[],
// ) =>
//   documents.reduce((acc: { [key: string]: T }, doc) => {
//     acc[doc.id.toString()] = doc.value as T;
//     return acc;
//   }, {});

// export const indexEntries = (entries: dbEntry[], tags: dbTag[]) =>
//   entries.map((entry) => {
//     entry.value.tags = entry.value.tags.map((tag) =>
//       createDictionaryDocument<iTag>(tags)[tag].name
//     );
//     return entry;
//   });
