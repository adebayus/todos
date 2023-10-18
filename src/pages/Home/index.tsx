import { useEffect, useState } from "react";

interface ITodo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

interface IPaginate<T> {
	size: number;
	page: number;
	totalPage: number;
	list: T[];
	source: T[];
}

interface IPropsTodos {
	listTodos: ITodo[];
	page: number;
	totalPage: number;
    handleStep: (page: number) => void
}

interface IPropsTodoItem {
	todo: ITodo;
}

const HomePage = () => {
	const [todos, setTodos] = useState<IPaginate<ITodo>>({
		size: 10,
		page: 1,
		list: [],
		source: [],
		totalPage: 1,
	});
	const [toggle, setToggle] = useState(false);

	const dataByPaginate = (list: ITodo[], page: number): ITodo[] =>
		list.slice(page * 10 - 10, page * 10);

	const calculateTotalPage = (list: ITodo[]) => Math.round(list.length / 10);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos", { method: "GET" })
			.then((response) => response.json())
			.then((data) => {
				setTodos((prev) => ({
					...prev,
					page: 1,
					list: dataByPaginate(data, prev.page),
					source: data,
					totalPage: calculateTotalPage(data),
				}));
			})
			.catch((error) => {
				console.log(error);
			});
	}, [toggle]);

    const handlePrevNext = (page: number) => { 
        setTodos((prev) => ({ 
            ...prev,
            page: page,
            list: dataByPaginate(prev.source, page)
        }))
    }
	return (
		<div className="flex flex-col w-full min-h-scree">
			<div className="h-[350px] w-full bg-gradient-to-r from-purple-500 to-pink-500 py-[90px]">
				<div className="w-[800px] mx-auto flex justify-between items-center">
					<span className="text-[62px] font-semibold tracking-widest text-white">
						{" "}
						TODO APPS{" "}
					</span>
					<span
						onClick={() => setToggle((prev) => !prev)}
						className="cursor-pointer text-3xl font-semibold tracking-widest text-white"
					>
						{" "}
						Reload<span className="text-4xl align-super">&#10227; </span>
					</span>
				</div>
			</div>
			<Todos
				listTodos={todos.list}
				page={todos.page}
				totalPage={todos.totalPage}
                handleStep={handlePrevNext}
			/>
		</div>
	);
};

const Todos = ({ listTodos, page, totalPage, handleStep}: IPropsTodos) => {
	const checkIsDisabled = (
		page: number,
		totalPage: number,
		type: TStepPaginateType,
	): boolean => {
		if (type == "PREV" && page == 1) {
			return true;
		}

		if (type == "NEXT" && totalPage == page) {
			return true;
		}
		return false;
	};

	return (
		<div className="w-[800px] bg-white rounded-lg shadow-lg mx-auto p-5 min-h-[250px] -translate-y-[90px]">
			<div>
				{listTodos.map((item) => {
					return <TodoItem key={item.id} todo={item} />;
				})}
			</div>
			<div className="flex mt-7 justify-between items-center h-10">
				<StepPaginate
					isDisable={checkIsDisabled(page, totalPage, "PREV")}
					type="PREV"
                    handleStep={() => { 
                        if (page > 1) { 
                            handleStep(page - 1)
                        }
                    }}
				/>
				<span className="text-xl font-bold"> {page} </span>
				<StepPaginate
					isDisable={checkIsDisabled(page, totalPage, "NEXT")}
					type="NEXT"
                    handleStep={() => { 
                        if (page < totalPage) {
                            handleStep(page + 1)
                        }
                    }}
				/>
			</div>
		</div>
	);
};

interface IPropsStepPaginate {
	isDisable: boolean;
	type: TStepPaginateType;
    handleStep: () => void
}

type TStepPaginateType = "NEXT" | "PREV";

const StepPaginate = ({ isDisable, type, handleStep }: IPropsStepPaginate) => {
	return (
		<div className="aspect-square h-full">
			<div
				className={`w-full h-full rounded-full ${
					isDisable ? "bg-slate-300 text-gray-500" : "bg-slate-700 text-white"
				} cursor-pointer flex justify-center items-center`}
                onClick={handleStep}
			>
				{type == "PREV" && <span className="text-2xl"> &#11013; </span>}
				{type == "NEXT" && <span className="text-2xl"> &#11157; </span>}
			</div>
		</div>
	);
};

const TodoItem = ({ todo }: IPropsTodoItem) => {
	return (
		<div className="h-16 p-2 flex items-center gap-6 border-b-2 border-slate-200 cursor-pointer hover:border-cyan-500">
			<div className="w-fit h-full flex items-center">
				<div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
					<div
						className={`w-7 h-7 rounded-full ${
							todo.completed ? "bg-transparent" : "bg-white"
						} flex justify-center items-center`}
					>
						<span className="text-white text-xl font-medium">&#x2713;</span>
					</div>
				</div>
			</div>
			<div
				className={`flex flex-1 justify-start items-center text-xl font-normal capitalize ${
					todo.completed && "line-through text-gray-400"
				}`}
			>
				<span>
					{todo.title}
				</span>
			</div>
		</div>
	);
};

export default HomePage;
