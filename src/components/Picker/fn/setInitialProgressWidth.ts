import {useEffect} from 'react'
import {ValueManager} from './valueManager.ts'

export function useSetInitialProgressWidth(
	valueManager: ValueManager, $segments: (null | HTMLElement)[], value: number
) {
	useEffect(function () {
		setTimeout(() => {
			const nullable$Segments = $segments.filter($segment => !$segment)
			if (nullable$Segments.length) return

			const percents = +valueManager.getPercentFromValue(value).toString()

			setProgressLinesWidth($segments as HTMLElement[], percents)
		}, 0)
	}, [])
}

export function setProgressLinesWidth($segmentsArr: HTMLElement[], percentsValue: number) {
	// Общее количество полосок для анимации
	const segmentsTotalNum = $segmentsArr.length // 4
	// Сколько процентов приходится на один сегмент
	const percentsInSegment = 100 / segmentsTotalNum // 25

	const segmentNum = Math.ceil(percentsValue / percentsInSegment) // 2
	const startSegmentPercents = percentsValue - (percentsInSegment * (segmentNum - 1))

	for (let i = 1; i <= segmentsTotalNum; i++) {
		const $currentSegment = $segmentsArr[i - 1]

		if (i < segmentNum) {
			$currentSegment.style.width = '100%'
		} else if (i === segmentNum) {
			$currentSegment.style.width = startSegmentPercents + '%'
		} else {
			$currentSegment.style.width = '0'
		}
	}
}
