export const formatMoney = (value: number, isNumber?: boolean) => {
  let formatNumber = value
  if (Number(value) % 1 !== 0) {
    const splitted = String(value)?.split('.')
    formatNumber =
      splitted[1]?.length > 3
        ? Number(`${splitted[0]}.${splitted[1].slice(0, 3)}`)
        : value
  }
  return isNumber ? formatNumber : formatNumber?.toLocaleString('en') || '0'
}

export const normalizeKeyword = (keyword: string) => {
  return (keyword as string)
    .normalize('NFD')
    .toLowerCase()
    .replace(/[\u0300-\u036f\s]/g, '')
    .replace('đ', 'd')
}
