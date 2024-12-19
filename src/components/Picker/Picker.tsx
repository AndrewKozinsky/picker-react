import React, {useRef} from 'react'
import {useAnimateProgressLine} from './fn/animateProgressLine.ts'
import {useCreateValueManagerInstance} from './fn/createValueManagerInstance.ts'
import {
	useGetFieldOnBlurHandler,
	useGetFieldOnInputHandler,
	useGetFieldOnKeyDownHandler
} from './fn/fieldOnInputHandler.ts'
import {useGetSetPercentageValue} from './fn/getSetPercentageValue.ts'
import {useSetInitialProgressWidth} from './fn/setInitialProgressWidth.ts'
import {BottomButtonText} from './fn/types.ts'
import {useFixMinMaxAndCurrentValueAfterStart} from './fn/updateMinOrMaxValue.ts'
import './Picker.css'

export type OnValueChange = (newValue: number, isValuePrepared: boolean) => void
export type OnMinMaxValueChange = (newMinValue: number, newMaxValue: number) => void

type PickerProps = {
	currency: string
	min: number
	max: number
	step: number
	value: number
	isValuePrepared: boolean
	prevPreparedValue: number
	onValueChange: OnValueChange
	onMinMaxValueChange: OnMinMaxValueChange
}

function Picker(props: PickerProps) {
	const { currency, min, max, step, value, isValuePrepared, prevPreparedValue, onValueChange, onMinMaxValueChange } = props

	const valueManager = useCreateValueManagerInstance(
		{minValue: min, maxValue: max, valueStep: step, value}
	)

	useFixMinMaxAndCurrentValueAfterStart(valueManager, onMinMaxValueChange)

	const fieldOnKeyDown = useGetFieldOnKeyDownHandler(value, valueManager, onValueChange)
	const fieldOnInput = useGetFieldOnInputHandler(onValueChange)
	const fieldOnBlur = useGetFieldOnBlurHandler(valueManager, onValueChange)

	const percent_25_OnClick= useGetSetPercentageValue(BottomButtonText._25, valueManager, onValueChange)
	const percent_50_OnClick= useGetSetPercentageValue(BottomButtonText._50, valueManager, onValueChange)
	const percent_75_OnClick= useGetSetPercentageValue(BottomButtonText._75, valueManager, onValueChange)
	const percent_100_OnClick= useGetSetPercentageValue(BottomButtonText._100, valueManager, onValueChange)

	const firstSegmentRef = useRef<null | HTMLDivElement>(null)
	const secondSegmentRef = useRef<null | HTMLDivElement>(null)
	const thirdSegmentRef = useRef<null | HTMLDivElement>(null)
	const forthSegmentRef = useRef<null | HTMLDivElement>(null)

	useSetInitialProgressWidth(
		valueManager,
		[firstSegmentRef.current, secondSegmentRef.current, thirdSegmentRef.current, forthSegmentRef.current],
		value,
	)

	/*useAnimateProgressLine(
		valueManager,
		[firstSegmentRef.current, secondSegmentRef.current, thirdSegmentRef.current, forthSegmentRef.current],
		value,
		isValuePrepared,
		prevPreparedValue
	)*/

	return (
		<section className="picker">
			<div className="picker__top-part">
				<input
					id="picker__currency-input"
					type="text"
					className="picker__currency-input"
					placeholder="0.00"
					value={value}
					onInput={fieldOnInput}
					onKeyDown={fieldOnKeyDown}
					onBlur={fieldOnBlur}
				/>
				<span className="picker__currency-name">{currency}</span>
			</div>
			<div className="picker__middle-divider" />
			<div className="picker__bottom-part">
				<button className="picker__bottom-btn" onClick={percent_25_OnClick}>
					<div className="picker__bottom-btn-line" ref={firstSegmentRef} />
					<span className="picker__bottom-btn-text">{BottomButtonText._25}</span>
				</button>
				<button className="picker__bottom-btn" onClick={percent_50_OnClick}>
					<div className="picker__bottom-btn-line" ref={secondSegmentRef} />
					<span className="picker__bottom-btn-text">{BottomButtonText._50}</span>
				</button>
				<button className="picker__bottom-btn" onClick={percent_75_OnClick}>
					<div className="picker__bottom-btn-line" ref={thirdSegmentRef} />
					<span className="picker__bottom-btn-text">{BottomButtonText._75}</span>
				</button>
				<button className="picker__bottom-btn" onClick={percent_100_OnClick}>
					<div className="picker__bottom-btn-line" ref={forthSegmentRef} />
					<span className="picker__bottom-btn-text">{BottomButtonText._100}</span>
				</button>
			</div>
		</section>
	)
}

export default Picker
