import React from 'react'
import Picker from '../Picker/Picker.tsx'
import {useGetOnPickerValChangeHandler} from './fn/getOnValueChange.ts'
import {useGetPickerMinOrMaxValueChangeHandler} from './fn/getPickerMinOrMaxValueChange.ts'
import {usePrepareStore} from './fn/usePrepareStore.ts'
import {useExchangeFormStore} from './store/store.ts'
import './ExchangeForm.css'

function ExchangeForm() {
	usePrepareStore()

	const onInPickerValChange = useGetOnPickerValChangeHandler('inPicker')
	const onOutPickerValChange = useGetOnPickerValChangeHandler('outPicker')

	const onInPickerMinMaxValChange = useGetPickerMinOrMaxValueChangeHandler('inPicker')
	const onOutPickerMinMaxValChange = useGetPickerMinOrMaxValueChangeHandler('outPicker')

	const store = useExchangeFormStore(store => store)

	if (store.dataStatus === 'error') {
		return <p>При запросе на сервер произошла ошибка.</p>
	}

	return (
		<div className='exchange-form'>
			<Picker
				currency={store.inPicker.currency}
				min={store.inPicker.minValue}
				max={store.inPicker.maxValue}
				step={store.inPicker.valueStep}
				value={store.inPicker.value}
				isValuePrepared={store.inPicker.isValuePrepared}
				prevPreparedValue={store.inPicker.prevPreparedValue}
				onValueChange={onInPickerValChange}
				onMinMaxValueChange={onInPickerMinMaxValChange}
			/>
			<Picker
				currency={store.outPicker.currency}
				min={store.outPicker.minValue}
				max={store.outPicker.maxValue}
				step={store.outPicker.valueStep}
				value={store.outPicker.value}
				isValuePrepared={store.inPicker.isValuePrepared}
				prevPreparedValue={store.outPicker.prevPreparedValue}
				onValueChange={onOutPickerValChange}
				onMinMaxValueChange={onOutPickerMinMaxValChange}
			/>
		</div>
	)
}

export default ExchangeForm
