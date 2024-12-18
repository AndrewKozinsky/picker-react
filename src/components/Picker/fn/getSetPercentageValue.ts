import Decimal from 'decimal.js-light'
import {OnValueChange} from '../Picker.tsx'
import {BottomButtonText} from './types.ts'
import {ValueManager} from './valueManager.ts'

export function useGetSetPercentageValue(
	percentage: BottomButtonText,
	valueManager: ValueManager,
	onValueChange: OnValueChange
) {
	return function () {
		const newValues: Record<BottomButtonText, Decimal> = {
			[BottomButtonText._25]: valueManager.get25Percent(),
			[BottomButtonText._50]: valueManager.get50Percent(),
			[BottomButtonText._75]: valueManager.get75Percent(),
			[BottomButtonText._100]: valueManager.get100Percent(),
		}

		const newValue = +newValues[percentage].toString()
		onValueChange(newValue, true)
	}
}
