export interface countryInterface {
  id: number
  name: string
  code: string
}

export interface cityInterface {
  id: number
  name: string
  code: string
  countryId: number
}