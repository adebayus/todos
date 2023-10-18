interface IPropsStepPaginate {
	isDisable: boolean;
	type: TStepPaginateType;
    handleStep: () => void
}


export type TStepPaginateType = "NEXT" | "PREV";

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

export default StepPaginate