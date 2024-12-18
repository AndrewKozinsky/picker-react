import {useRef} from 'react'
import Decimal from 'decimal.js-light'
import {unknownToPositiveNumber} from '../../../utils/numbers.ts'
import {ValueManager} from './valueManager.ts'

type CreateValueManagerInstanceArgs = {
	minValue: number
	maxValue: number
	valueStep: number
	value: number
}

export function useCreateValueManagerInstance(args: CreateValueManagerInstanceArgs) {
	const valueManagerRef = useRef<ValueManager>()

	const step = unknownToPositiveNumber(args.valueStep, 1)
	const decStep = new Decimal(step)

	let minValue = unknownToPositiveNumber(args.minValue)
	let decMinValue = new Decimal(minValue)
	decMinValue = ValueManager.roundNumberToStep(decMinValue, decStep, 'ceil')

	let maxValue = unknownToPositiveNumber(args.maxValue)
	let decMaxValue = new Decimal(maxValue)
	decMaxValue = ValueManager.roundNumberToStep(decMaxValue, decStep, 'floor')

	valueManagerRef.current  = new ValueManager(decMinValue, decMaxValue, decStep)

	return valueManagerRef.current
}
