import { FC } from "react";
import { ListItem } from "../api/getListData";
import { Button } from "./Button";
import { ChevronUpIcon, XMarkIcon } from "./icons";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
};

export const Card: FC<CardProps> = ({ title, description }) => {
  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <Button variant="ghost" size="icon">
            <ChevronUpIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <XMarkIcon />
          </Button>
        </div>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};
