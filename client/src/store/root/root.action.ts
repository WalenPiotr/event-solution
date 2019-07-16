import { FormAction } from "../form/form.types";
import { EntriesAction } from "../entries/entries.types";

export type RootAction = FormAction | EntriesAction;
