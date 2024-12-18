export function unknownToString(value: unknown, defaultValue: unknown = ''): string {
	if (typeof value === 'string') {
		return value
	} else if (typeof defaultValue === 'string') {
		return defaultValue
	}

	return ''
}