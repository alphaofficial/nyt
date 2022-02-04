import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "@/store";
import { ROUTES } from "./routes";

const RoutesContainer = () => {
  return (
    <Provider store={store}>
      <Routes>
        {ROUTES.map(({ Page, ...rest }) => (
          <Route key={rest.path} {...rest} element={<Page />} />
        ))}
      </Routes>
    </Provider>
  );
};

const Navigation = () => (
  <Router>
    <RoutesContainer />
  </Router>
);

export default Navigation;
