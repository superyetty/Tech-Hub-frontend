import React from "react";

const CategoryCard = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y- h-35 border border-gray-400 rounded-sm cursor-pointer">
      <div className="p-2">{icon}</div>
      <p>{title}</p>
    </div>
  );
};

export default CategoryCard;
