import { useEffect } from 'react'
import { convertDecimalToNumber } from '../../../utils/numbers.ts'
import { OnMinMaxValueChange } from '../Picker.tsx'
import { ValueManager } from './valueManager.ts'

export function useFixMinMaxAndCurrentValueAfterStart(
	valueManager: ValueManager,
	onMinMaxValueChange: OnMinMaxValueChange,
) {
	useEffect(function () {
		onMinMaxValueChange(
			convertDecimalToNumber(valueManager.minValue),
			convertDecimalToNumber(valueManager.maxValue)
		)
	}, [])
}