import { ITodo } from "../../utils/types";

export interface IPropsTodoItem {
	todo: ITodo;
}

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

export default TodoItem