export interface ITodo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

export interface IPaginate<T> {
	size: number;
	page: number;
	totalPage: number;
	list: T[];
	source: T[];
}
