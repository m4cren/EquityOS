import {
  Baby,
  Car,
  CreditCard,
  Dumbbell,
  Gamepad,
  Gift,
  GraduationCap,
  Home,
  LucideIcon,
  Palette,
  PartyPopper,
  PawPrint,
  Pill,
  Plane,
  Puzzle,
  Repeat,
  Shield,
  Shirt,
  ShoppingCart,
  Siren,
  Utensils,
  Wifi,
  Zap,
} from "lucide-react";

export type TaskFormTypes = {
  id?: string;
  label: string;
  category: string;
  date_str?: string;
  date?: Date | null;
};

export type PopupStateTypes = {
  menu: boolean;
  recordExpense: boolean;
  recordIncome: boolean;
  recordTransfer: boolean;
  recordHabit: boolean;
  addTask: boolean;
};
export type MenuStateTypes = {
  label: "Home" | "J.A.R.V.I.S" | "Daily Steps" | "Pocket Flow" | "Settings";
  href: "/" | "/jarvis" | "/routines" | "/expenses" | "/settings/profile";
};
export type AccountStateTypes = {
  accounts: AccountTypes[];
  isPending: boolean;
  errMsg: string | null;
};

export type AccountIconTypes = "card" | "bank" | "wallet" | "savings";

export type AccountTypes = {
  id?: string;
  name: string;
  icon: AccountIconTypes;
  balance: number;
  total_income: number;
  total_expense: number;
};
export type NetWorthTypes = {
  id?: string;
  balance: number;
  date_str: string;
};

export type NetWorthStateTypes = {
  netWorth: NetWorthTypes[];
  isPending: boolean;
  errMsg: string | null;
};
export type NetWorthArgs = {
  balance: number;
  date_str: string;
};

export type FiltererTypes = "Month" | "Year" | null;

export type IncomeCategoryTypes =
  | "Active"
  | "Passive"
  | "Portfolio"
  | "Business"
  | "Windfall"
  | "Interest"
  | "Others";

export type IncomeTypes = {
  id?: string;
  income_stream: string;
  amount: number;
  received_in: string;
  acc_icon: AccountIconTypes;
  acc_id: string;
  date_str: string;
  created_at: Date;
  income_type: IncomeCategoryTypes;
};

export type IncomeStateTypes = {
  income: IncomeTypes[];
  isPending: boolean;
  errMsg: string | null;
};

export type ExpenseTypes = {
  id?: string;
  account: string;
  acc_icon: AccountIconTypes;
  acc_id: string;
  label: string;
  amount: number;
  category: string;
  category_icon: ExpenseCategoryIconTypes;
  category_id: string;
  date_str: string;
  created_at: Date;
};
export type ExpenseStateTypes = {
  expense: ExpenseTypes[];
  isPending: boolean;
  errMsg: string | null;
};

export type TransferTypes = {
  created_at: Date;
  id?: string;
  amount: number;
  from_acc: string;
  from_acc_icon: AccountIconTypes;
  to_acc_icon: AccountIconTypes;
  to_acc: string;
  date_str: string;
  from_acc_id: string;
  to_acc_id: string;
};

export type TransferStateTypes = {
  transfer: TransferTypes[];
  isPending: boolean;
  errMsg: string | null;
};
// export const budgetIconMap: Record<BudgetTypes, LucideIcon> = {
//    Food: Utensils,
//    "Gas/Transportation": Fuel,
//    Gym: Dumbbell,
//    "Utilities & Subscription": Podcast,
//    Leisures: PartyPopper,
//    Miscellaneous: VenetianMask,
// };
export type ExpenseCategoryIconTypes =
  | "Rent"
  | "Utilities"
  | "Groceries"
  | "Transportation"
  | "Internet"
  | "Insurance"
  | "Subscription"
  | "Clothing"
  | "Medical"
  | "Food"
  | "Entertainment"
  | "Hobbies"
  | "Travel"
  | "Donations"
  | "Education"
  | "Pets"
  | "Emergency"
  | "Loans"
  | "Miscellaneous"
  | "Gym"
  | "Childcare"
  | "Fun";

export const expenseCategoryIconMap: Record<
  ExpenseCategoryIconTypes,
  LucideIcon
> = {
  Rent: Home,
  Utilities: Zap,
  Groceries: ShoppingCart,
  Transportation: Car,
  Internet: Wifi,
  Insurance: Shield,
  Subscription: Repeat,
  Clothing: Shirt,
  Medical: Pill,
  Food: Utensils,
  Entertainment: Gamepad,
  Hobbies: Palette,
  Travel: Plane,
  Gym: Dumbbell,
  Childcare: Baby,
  Donations: Gift,
  Education: GraduationCap,
  Pets: PawPrint,
  Emergency: Siren,
  Loans: CreditCard,
  Miscellaneous: Puzzle,
  Fun: PartyPopper,
};

export type ExpenseCategoryTypes = {
  id?: string;
  label: string;
  icon: ExpenseCategoryIconTypes;
  alloc_per_month: number;
};
export type ExpenseCategoryStateTypes = {
  expenseCategory: ExpenseCategoryTypes[];
  isPending: boolean;
  errMsg: string | null;
};

type KeybindTypes = [ctrlKey: "ctrl" | "alt", key: string];

export type SettingsConfigType = {
  profile: {
    system_name: string;
    username: string;
    banner_url: string;
  };
  appearance: {
    theme: string;
    time_format: "12-hour" | "24-hour";
  };
  accessibility: {
    font: string;
    animation: "on" | "off";
  };

  keybinds: {
    menu: KeybindTypes;
    toggle_close: KeybindTypes;
    record_expense: KeybindTypes;
    record_income: KeybindTypes;
    record_transfer: KeybindTypes;
    add_task: KeybindTypes;
    record_habit: KeybindTypes;
  };
};
export type SettingsConfigStateTypes = {
  config: SettingsConfigType;
  isPending: boolean;
  errMsg: string | null;
};
