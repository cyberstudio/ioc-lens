export type EmptyObject = Record<PropertyKey, unknown>;

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
