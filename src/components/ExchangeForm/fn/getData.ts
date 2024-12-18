import axios from 'axios'

export type GetExchangeDataFromServer = {
	pairId: number
	inAmount?: number
	outAmount?: number
}

export type GetExchangeDataServerRes = {
	counter: number // 0
	inAmount: string //"10000"
	isStraight: boolean // true
	outAmount: string // "96.36"
	price: [number, number] // ['0.009636696540426', '103.77']
}

export async function getExchangeData(
	config: GetExchangeDataFromServer
) {
	const pairId = config.pairId
	const inAmount = config.inAmount
	const outAmount = config.outAmount

	const body = {
		pairId,
		inAmount,
		outAmount
	}

	const data = await axios.post<GetExchangeDataServerRes>('/b2api/change/user/pair/calc', body, {
		headers: {
			serial: 'a7307e89-fbeb-4b28-a8ce-55b7fb3c32aa'
		},
	})

	return data.data
}
