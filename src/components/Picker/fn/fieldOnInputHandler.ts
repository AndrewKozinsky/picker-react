import React from 'react'
import Decimal from 'decimal.js-light'
import {createLogger} from 'vite'
import {unknownToPositiveNumber} from '../../../utils/numbers.ts'
import {OnValueChange} from '../Picker.tsx'
import {ValueManager} from './valueManager.ts'

type ArrowKeyNames = 'ArrowUp' | 'ArrowDown'
const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ',', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Backspace', 'Delete']

/**
 * Обработчик события KeyDown у поля ввода значения
 * @param value
 * @param valueManager
 * @param onValueChange
 */
export function useGetFieldOnKeyDownHandler(
	value: number,
	valueManager: ValueManager,
	onValueChange: OnValueChange
) {
	return function (e: React.KeyboardEvent<HTMLInputElement>) {
		const target = e.currentTarget

		// Не допускать нажатие не разрешённых клавиш
		if (!allowedKeys.includes(e.key)) {
			e.preventDefault()
			return
		}

		// Если нажали на клавиши-стрелки, то изменить значение на шаг
		if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
			e.preventDefault()

			const newDecValues: Record<ArrowKeyNames, any> = {
				'ArrowUp': valueManager.increaseValueStep(new Decimal(value)),
				'ArrowDown': valueManager.decreaseValueStep(new Decimal(value)),
			}

			const newDecValue = newDecValues[e.key as ArrowKeyNames]
			target.value = newDecValue.toString()

			onValueChange(+newDecValue.toString(), false)
			return
		}
	}
}

/**
 * Обработчик события input у поля ввода значения.
 * Заменяет запятую на точку и точки кроме первой
 */
export function useGetFieldOnInputHandler(onValueChange: (newValue: number, isValuePrepared: boolean) => void) {
	return function (e: React.FormEvent<HTMLInputElement>) {
		let $target = e.currentTarget
		let inputValue = $target.value

		inputValue = inputValue.replace(/,/g, '.')
		inputValue = inputValue.replace(/(?<=\..*?)\./g, '')

		onValueChange(+inputValue, false)
	}
}

/**
 * Обработчик события blur у поля ввода значения.
 * Получает текущее значение поля и исправляет если требуется.
 * @param valueManager
 * @param onValueChange
 */
export function useGetFieldOnBlurHandler(valueManager: ValueManager, onValueChange: OnValueChange) {
	return function (e: React.FormEvent<HTMLInputElement>) {
		let $target = e.currentTarget
		let inputValue = $target.value

		let numericValue = unknownToPositiveNumber(inputValue)
		let decimalValue = new Decimal(numericValue)
		const normalizedValue = valueManager.normalizeValue(decimalValue)

		$target.value = normalizedValue.toString()
		onValueChange(+normalizedValue.toString(), true)
	}
}
