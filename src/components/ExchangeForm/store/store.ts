import { create } from 'zustand'

type ExchangeFormStore = {
	// Статус получения данных с сервера
	dataStatus: 'pending' | 'success' | 'error'
	currencyPairId: number
	inPicker: PickerStore
	outPicker: PickerStore
	changeInValue: (value: number, isValuePrepared: boolean) => void
	changeOutValue: (value: number, isValuePrepared: boolean) => void
	changeInMinMaxValue: (minValue: number, maxValue: number) => void
	changeOutMinMaxValue: (minValue: number, maxValue: number) => void
}

// Тип данных Сборщика
export type PickerStore = {
	currency: string
	minValue: number
	maxValue: number
	valueStep: number
	value: number
	// В value могут записываться значения, не подходящие для отправки на сервер.
	// Например пустая строка.
	// Этот флаг сообщает о таких данных.
	// Если isValuePrepared в true, то можно отправить запрос на сервер.
	isValuePrepared: boolean
	// Предыдущее правильное значение. Требуется для расчёта анимации полоски прогресса.
	prevPreparedValue: number
}

export const useExchangeFormStore = create<ExchangeFormStore>((set) => {
	return {
		dataStatus: 'pending',
		currencyPairId: 133,
		inPicker: {
			currency: 'RUR',
			minValue: 10000,
			maxValue: 70000000,
			valueStep: 100,
			value: 10000,
			isValuePrepared: false,
			prevPreparedValue: 10000,
		},
		outPicker: {
			currency: 'USDT',
			minValue: 0,
			maxValue: 0,
			valueStep: 0.000001,
			value: 0,
			isValuePrepared: false,
			prevPreparedValue: 0,
		},
		changeInValue: (newValue: number, isValuePrepared: boolean) => {
			set((state: ExchangeFormStore) => {
				console.log(newValue)
				return getNewPickerData(state, 'in', newValue, isValuePrepared)
			})
		},
		changeOutValue: (newValue: number, isValuePrepared: boolean) => {
			set((state: ExchangeFormStore) => {
				return getNewPickerData(state, 'out', newValue, isValuePrepared)
			})
		},
		changeInMinMaxValue: (minValue: number, maxValue: number) => {
			set((state: ExchangeFormStore) => {
				return changeMinOrMaxPickerValue(state, 'inPicker', minValue, maxValue)
			})
		},
		changeOutMinMaxValue: (minValue: number, maxValue: number) => {
			set((state: ExchangeFormStore) => {
				return changeMinOrMaxPickerValue(state, 'outPicker', minValue, maxValue)
			})
		},
	}
})

function getNewPickerData(
	state: ExchangeFormStore, pickerName: 'in' | 'out', newValue: number, isValuePrepared: boolean
): Partial<ExchangeFormStore> {
	let pickerObjCopy = pickerName === 'in'
		? {...state.inPicker}
		: {...state.outPicker}

	const currentValue = pickerObjCopy.value

	if (isValuePrepared) {
		pickerObjCopy.prevPreparedValue = currentValue
	}

	pickerObjCopy.value = newValue
	pickerObjCopy.isValuePrepared = isValuePrepared

	return pickerName === 'in'
		? { inPicker: pickerObjCopy }
		: { outPicker: pickerObjCopy }
}

function changeMinOrMaxPickerValue(
	state: ExchangeFormStore, pickerName: 'inPicker' | 'outPicker', minValue: number, maxValue: number
): Partial<ExchangeFormStore> {
	let pickerObjCopy = {...state[pickerName]}

	pickerObjCopy.minValue = minValue
	pickerObjCopy.maxValue = maxValue

	return { [pickerName]: pickerObjCopy }
}
