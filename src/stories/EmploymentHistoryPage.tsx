import React from "react";

import "../App.scss";

import { Provider } from "react-redux";
import { store } from "../_store/store";
import Dashboard from "../modules/employment-history/components/dashboard/Dashboard";

type User = {
  name: string;
};

export const EmploymentHistoryPage: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <article>
      <Provider store={store}>
        <Dashboard></Dashboard>
      </Provider>
    </article>
  );
};
