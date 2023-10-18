import { ITodo } from "../../utils/types";
import StepPaginate, { TStepPaginateType } from "../StepPaginate";
import TodoItem from "../TodoItem";

interface IPropsTodos {
	listTodos: ITodo[];
	page: number;
	totalPage: number;
    handleStep: (page: number) => void
}

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


export default Todos