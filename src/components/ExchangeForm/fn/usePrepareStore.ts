import {useEffect} from 'react'
import Decimal from 'decimal.js-light'
import {PickerStore, useExchangeFormStore} from '../store/store.ts'
import {getExchangeData, GetExchangeDataFromServer} from './getData.ts'

/**
 * Функция при первоначальной отрисовки формы делает запрос на данные для второго Сборщика основываясь на данных первого
 * и помещает в Хранилище. Данные для первого заданы изначально в Хранилище.
 */
export function usePrepareStore() {
	const pairId = useExchangeFormStore(store => store.currencyPairId)
	const inPickerData = useExchangeFormStore(store => store.inPicker)
	const outPickerData = useExchangeFormStore(store => store.outPicker)

	useEffect(function () {
		const reqBody: GetExchangeDataFromServer = {pairId, inAmount: inPickerData.value}

		getExchangeData(reqBody).then((servRespData) => {
			// Высчитывание минимального и максимального значения для второго сборщика
			const decOutPickerMinValue = new Decimal(inPickerData.minValue).mul(servRespData.price[0])
			const decOutPickerMaxValue = new Decimal(inPickerData.maxValue).mul(servRespData.price[0])

			const updatedOutPickerData: PickerStore = {
				...outPickerData,
				minValue: +decOutPickerMinValue.toString(),
				maxValue: +decOutPickerMaxValue.toString(),
				value: +servRespData.outAmount,
				isValuePrepared: true
			}

			useExchangeFormStore.setState({outPicker: updatedOutPickerData})
		})
	}, [])
}

