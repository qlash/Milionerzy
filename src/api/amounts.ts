export type amountsType = {
  price: number,
  guaranteed: boolean
}

export const amounts: amountsType[] = [
  { price: 500, guaranteed: false },
  { price: 1000, guaranteed: true },
  { price: 2000, guaranteed: false },
  { price: 5000, guaranteed: false },
  { price: 10000, guaranteed: false },
  { price: 20000, guaranteed: false },
  { price: 40000, guaranteed: true },
  { price: 75000, guaranteed: false },
  { price: 125000, guaranteed: false },
  { price: 250000, guaranteed: false },
  { price: 500000, guaranteed: false },
  { price: 1000000, guaranteed: true },
]
