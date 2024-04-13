import { create } from "zustand";

interface BudgetStoreState {
  budgetValue: number;
  budgetId: number | null;
}

interface BudgetStoreActions {
  setBudgetValue: (value: number) => void;
  setBudgetId: (id: number | null) => void;
}

type BudgetStore = BudgetStoreState & BudgetStoreActions;

const useBudgetStore = create<BudgetStore>((set) => ({
  budgetValue: 0,
  budgetId: null,
  setBudgetValue: (value) => set({ budgetValue: value }),
  setBudgetId: (id) => set({ budgetId: id }),
}));

export default useBudgetStore;
