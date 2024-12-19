import axios from 'axios'
import {z} from 'zod'

export type GetExchangeDataFromServer = {
	pairId: number
	inAmount?: number
	outAmount?: number
}

const schemaGetExchangeDataServerRes = z.object({
	counter: z.number(), // 0
	inAmount: z.string(), //"10000"
	isStraight: z.boolean(), // true
	outAmount: z.string(), // "96.36"
	price: z.array(z.string()).length(2) // ['0.009636696540426', '103.77']
})

export type GetExchangeDataServerRes = z.infer<typeof schemaGetExchangeDataServerRes>

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

	try {
		const axiosResponse = await axios.post<undefined | GetExchangeDataServerRes>('/b2api/change/user/pair/calc', body, {
			headers: {
				serial: 'a7307e89-fbeb-4b28-a8ce-55b7fb3c32aa'
			},
		})

		return schemaGetExchangeDataServerRes.parse(axiosResponse.data)
	} catch (error) {
		console.error(error)
		return undefined
	}

}
