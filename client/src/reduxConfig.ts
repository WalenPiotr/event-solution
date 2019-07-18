import { Action, applyMiddleware, createStore, Store } from "redux";
import logger from "redux-logger";
import { createEpicMiddleware, Epic } from "redux-observable";
import thunkMiddleware from "redux-thunk";
import { createApiClient } from "./clientConfig";
import { DefaultApi } from "./generated";
import { EntriesActionType } from "./store/entries/entries.types";
import { rootEpic } from "./store/root/root.epics";
import { rootReducer, RootState } from "./store/root/root.reducer";

export interface Dependencies {
  apiClient: DefaultApi;
}

export type EpicWithDependecies<
  Input extends Action<any> = any,
  Output extends Input = any
> = Epic<Input, Output, RootState, Dependencies>;

const initializeStore = (store: Store) => {
  store.dispatch({
    type: EntriesActionType.FETCH_DATA,
  });
};

export const configureStore = () => {
  const dependencies: Dependencies = {
    apiClient: createApiClient(),
  };
  const observableMiddleware = createEpicMiddleware({
    dependencies,
  });
  const store = createStore(
    rootReducer,
    applyMiddleware(observableMiddleware, thunkMiddleware, logger),
  );
  observableMiddleware.run(rootEpic);
  initializeStore(store);
  return store;
};
