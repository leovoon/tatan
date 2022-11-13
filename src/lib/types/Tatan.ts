export interface TatanSearchResponse {
	tatan: Tatan;
}

export interface Tatan {
	kind: string;
	url: Url;
	queries: Queries;
	context: Context;
	searchInformation: SearchInformation;
	items: Item[];
	error?: ErrorResponseBody;
}

export interface Url {
	type: string;
	template: string;
}

export interface Queries {
	request: Request[];
	nextPage: NextPage[];
}

export interface Request {
	title: string;
	totalResults: string;
	searchTerms: string;
	count: number;
	startIndex: number;
	inputEncoding: string;
	outputEncoding: string;
	safe: string;
	cx: string;
	fileType: string;
	searchType: string;
	imgType: string;
}

export interface NextPage {
	title: string;
	totalResults: string;
	searchTerms: string;
	count: number;
	startIndex: number;
	inputEncoding: string;
	outputEncoding: string;
	safe: string;
	cx: string;
	fileType: string;
	searchType: string;
	imgType: string;
}

export interface Context {
	title: string;
}

export interface SearchInformation {
	searchTime: number;
	formattedSearchTime: string;
	totalResults: string;
	formattedTotalResults: string;
}

export interface Item {
	kind: string;
	title: string;
	htmlTitle: string;
	link: string;
	displayLink: string;
	snippet: string;
	htmlSnippet: string;
	mime: string;
	fileFormat: string;
	image: Image;
}

export interface Image {
	contextLink: string;
	height: number;
	width: number;
	byteSize: number;
	thumbnailLink: string;
	thumbnailHeight: number;
	thumbnailWidth: number;
}

export interface ErrorResponseBody {
	code: number;
	message: string;
	errors: Error[];
	status: string;
	details: Detail[];
}

export interface Error {
	message: string;
	domain: string;
	reason: string;
}

export interface Detail {
	'@type': string;
	reason?: string;
	domain?: string;
	metadata?: Metadata;
	links?: Link[];
}

export interface Metadata {
	service: string;
	quota_limit: string;
	quota_location: string;
	consumer: string;
	quota_limit_value: string;
	quota_metric: string;
}

export interface Link {
	description: string;
	url: string;
}
