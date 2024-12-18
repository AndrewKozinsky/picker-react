import Decimal from 'decimal.js-light'

export function convertDecimalToNumber(decimalNum: undefined | null | Decimal): null | number {
	if (!decimalNum) {
		return null
	}

	return +decimalNum.toString()
}

export function unknownToPositiveNumber(value: unknown, defaultValue: unknown = 0): number {
	const number = unknownToNumber(value, defaultValue)
	return number < 0 ? 0 : number
}

export function unknownToNumber(value: unknown, defaultValue: unknown = 0): number {
	if (typeof value === 'number') {
		if (!isNaN(value)) return value
	}

	if (typeof value === 'string') {
		if (!isNaN(+value)) return +value
	}

	if (typeof defaultValue === 'number') {
		return isNaN(defaultValue) ? 0 : defaultValue
	}

	return 0
}