export interface ResultInterface<TValue, KError> {
	value: TValue;
	error: KError;
}

export function sanitizeUrl(url: string) {
	return url.replace(/(?<!:)\/+/g, '/')
}

export function baseUrl(endpoint: string) {
	return sanitizeUrl(`${process.env.BASE_URL}/${endpoint}`)
}
