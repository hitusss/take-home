import { useEffect, useState } from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { Button } from "./Button";
import { useStore } from "../store";

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [deletedCards, setDeletedCards] = useState<ListItem[]>([]);
  const deleted = useStore((state) => state.deleted);
  const listQuery = useGetListData();

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(
      listQuery.data?.filter(
        (item) => item.isVisible && !deleted.has(item.id),
      ) ?? [],
    );
    setDeletedCards(
      listQuery.data?.filter(
        (item) => item.isVisible && deleted.has(item.id),
      ) ?? [],
    );
  }, [deleted, listQuery.data, listQuery.isLoading]);

  /*
   * If we want to show a spinner while refreshing, we can add
   * listQuery.isRefetching to the if condition.
   */
  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
          <Button
            onClick={() => listQuery.refetch()}
            disabled={listQuery.isRefetching}
          >
            Refresh
          </Button>
        </div>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <Button disabled>Reveal</Button>
        </div>
        <div className="flex flex-col gap-y-3">
          {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
        </div>
      </div>
    </div>
  );
};
