export type ID = string

export type ISODateString = string & { readonly __brand: 'ISODateString' }

export type Nullable<T> = T | null

export type Maybe<T> = T | null | undefined

export type JsonPrimitive = string | number | boolean | null

export type JsonValue = JsonPrimitive | JsonObject | JsonValue[]

export interface JsonObject {
  [key: string]: JsonValue
}

export interface SelectOption<TValue extends string = string> {
  label: string
  value: TValue
}

export interface PaginationInput {
  page: number
  pageSize: number
}

export interface PaginatedResult<TItem> {
  items: TItem[]
  page: number
  pageSize: number
  total: number
}

export interface DateRange {
  from: ISODateString
  to: ISODateString
}
