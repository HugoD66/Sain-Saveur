import React from 'react';

interface TitleCategoryProps {
  title: string;
}

const TitleCategory: React.FC<TitleCategoryProps> = ({ title }) => {
  return <h1 className="titleCategory">{title}</h1>;
};

export default TitleCategory;
