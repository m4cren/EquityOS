import { taskCategoryBg } from "./TodoList";

const CategoryLegend = () => {
  return (
    <div className="flex  flex-wrap gap-x-4 gap-y-2 mt-6 text-[0.75rem]">
      {Object.entries(taskCategoryBg).map(([key, val]) => (
        <div key={key} className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${val.bg} opacity-70`} />
          <span className="text-white/70 text-[0.7rem]">{key}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryLegend;
