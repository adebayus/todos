import { useEffect, useState } from "react";
import { IPaginate, ITodo } from "../../utils/types";
import Todos from "../../components/Todos";

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
						TODO APPS
					</span>
					<span
						onClick={() => setToggle((prev) => !prev)}
						className="cursor-pointer text-3xl font-semibold tracking-widest text-white"
					>
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

export default HomePage;
