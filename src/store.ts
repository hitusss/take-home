import { create } from "zustand";
import { type ListItem } from "./api/getListData";

type State = {
  expanded: Set<ListItem["id"]>;
};

type Actions = {
  toggleExpanded: (id: ListItem["id"]) => void;
};

export const useStore = create<State & Actions>((set) => ({
  expanded: new Set(),
  toggleExpanded(id) {
    set((state) => {
      const expanded = new Set(state.expanded);
      if (expanded.has(id)) {
        expanded.delete(id);
      } else {
        expanded.add(id);
      }
      return { expanded };
    });
  },
}));
