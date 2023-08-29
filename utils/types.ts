export type dbItem<T, idT = number> = {
  id: idT;
} & T;
