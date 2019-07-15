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
  fetchError: string | null = null;
  fetching: boolean = false;
  deleteError: string | null = null;
  deleting: boolean = false;
}
