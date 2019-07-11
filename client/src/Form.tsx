import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "./store/form/form.actions";
import { RootState } from "./store/root/root.reducer";

const Form = () => {
  const values = useSelector<RootState, {}>(state => state.form.values);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(changeValue("email", "haha@email.com"));
  });
  return (
    <div>
      <div>form</div>
      <pre>{JSON.stringify(values)}</pre>
    </div>
  );
};

export default React.memo(Form);
