import { FC } from "react";
import { ListItem } from "../api/getListData";
import { Button } from "./Button";
import { XMarkIcon } from "./icons";
import {
  Collapsible,
  CollapsibleButton,
  CollapsibleContent,
} from "./Collapsible";
import { useStore } from "../store";

const variants = {
  default: "border-black",
  deleted: "border-rose-500",
};

type CardProps = {
  variant?: keyof typeof variants;
  id: ListItem["id"];
  title: ListItem["title"];
  description: ListItem["description"];
};

export const Card: FC<CardProps> = ({
  variant = "default",
  id,
  title,
  description,
}) => {
  const open = useStore((state) => state.expanded.has(id));
  const toggleExpanded = useStore((state) => state.toggleExpanded);
  const deleteItem = useStore((state) => state.deleteItem);
  return (
    <Collapsible open={open} onOpenChange={() => toggleExpanded(id)}>
      <div className={`border px-2 py-1.5 ${variants[variant]}`}>
        <div className="flex justify-between mb-0.5">
          <h1 className="font-medium">{title}</h1>
          {variant === "default" && (
            <div className="flex">
              <CollapsibleButton />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteItem(id)}
              >
                <XMarkIcon />
              </Button>
            </div>
          )}
        </div>
        {variant === "default" && (
          <CollapsibleContent>
            <p className="text-sm">{description}</p>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
};
