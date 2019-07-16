import { FetchErrorMsg } from "../../errors";

export interface Entry {
  _id: string;
  lastName: string;
  firstName: string;
  email: string;
  date: Date;
  __v: number;
}

export class EntriesState {
  items: Entry[] = [];
  fetchError: FetchErrorMsg | null = null;
  fetching: boolean = false;
  deleteError: FetchErrorMsg | null = null;
  deleting: boolean = false;
}
