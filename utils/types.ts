export type dbItem<T, idT = number> = {
  _id: idT;
} & T;

export type docItem<T> = {
  [key: string]: unknown;
} & T;
