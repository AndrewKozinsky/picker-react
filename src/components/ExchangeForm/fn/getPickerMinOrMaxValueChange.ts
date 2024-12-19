import {useCallback} from 'react'
import { PickerStore, useExchangeFormStore } from '../store/store.ts'
import { getExchangeData, GetExchangeDataFromServer } from './getData.ts'

/**
 * Возвращает функцию, которая передаётся в Сборщик.
 * Сборщик передаёт в неё своё новое значение.
 * @param pickerName — для какого сборщика создаётся обработчик
 */
export function useGetPickerMinOrMaxValueChangeHandler(pickerName: 'inPicker' | 'outPicker') {
	const {changeInMinMaxValue, changeOutMinMaxValue} = useExchangeFormStore(store => store)

	return useCallback(function (newMinValue: number, newMaxValue: number) {
		if (pickerName === 'inPicker') {
			changeInMinMaxValue(newMinValue, newMaxValue)
		} else if (pickerName === 'outPicker') {
			changeOutMinMaxValue(newMinValue, newMaxValue)
		}
	}, [])
}
