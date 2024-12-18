import {useCallback} from 'react'
import {PickerStore, useExchangeFormStore} from '../store/store.ts'
import {getExchangeData, GetExchangeDataFromServer} from './getData.ts'

/**
 * Возвращает функцию, которая передаётся в Сборщик.
 * Сборщик передаёт в неё своё новое значение.
 * @param inputName — для какого сборщика создаётся обработчик
 */
export function useGetOnPickerValChangeHandler(inputName: 'inPicker' | 'outPicker') {
	const pairId = useExchangeFormStore(store => store.currencyPairId)

	const changeInValue = useExchangeFormStore(store => store.changeInValue)
	const changeOutValue = useExchangeFormStore(store => store.changeOutValue)

	return useCallback(function (newValue: number, isValuePrepared: boolean) {
		// console.log(inputName)
		// console.log(newValue)
		// console.log(isValuePrepared)
		if (inputName === 'inPicker') {
			changeInValue(newValue, isValuePrepared)

			if (isValuePrepared) {
				updateOnePickerDataDependsOnOtherOne({
					pairId,
					inAmount: newValue
				})
			}

		} else if (inputName === 'outPicker') {
			changeOutValue(newValue, isValuePrepared)

			if (isValuePrepared) {
				updateOnePickerDataDependsOnOtherOne({
					pairId,
					outAmount: newValue
				})
			}
		}
	}, [])
}

/**
 * Функция, вызываемая при изменении одного Сбощика для обновления данных другого.
 * @param reqBody — данные для запроса
 */
async function updateOnePickerDataDependsOnOtherOne(reqBody: GetExchangeDataFromServer) {
	const servRespData = await getExchangeData(reqBody)
	const store = useExchangeFormStore.getState()

	// Если в запросе передали значение левого поля ввода (inPicker) для получения курса правого (outPicker).
	if (servRespData.isStraight) {
		const pickerStore = store.outPicker

		const newOutPickerData: PickerStore = {
			...pickerStore,
			value: +servRespData.outAmount,
		}

		useExchangeFormStore.setState({outPicker: newOutPickerData})
	}
	// Если в запросе передали значение правого поля ввода (outPicker) для получения курса левого (inPicker).
	else {
		const pickerStore = store.inPicker

		const newInPickerData: PickerStore = {
			...pickerStore,
			value: +servRespData.inAmount,
		}

		useExchangeFormStore.setState({inPicker: newInPickerData})
	}
}
