export type BaseEntity = {
  id: number
}

export type Partial<T> = {
  [p in keyof T]?: T[p]
}

export type Required<T> = {
  [p in keyof T]-?: T[p]
}

export type ReadOnly<T> = {
  readonly [p in keyof T]: T[p]
}

export type Mutable<T> = {
  -readonly [p in keyof T]: T[p]
}

export type Nullable<T> = T | null

/**
 * Type T에서 key K의 value들로 이루어진 Type 생성하는 유틸
 */
export type ExtractValueByKey<T, K extends string> = T extends { [key in K]: infer V }
  ? V
  : {
      [key in keyof T]: ExtractValueByKey<T[key], K>
    }[keyof T]

