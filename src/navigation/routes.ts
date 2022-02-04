import { RouteProps } from "react-router-dom";
import { Home, Details } from "@/pages";

export interface RouteObject extends RouteProps {
  title: string;
  Page: () => JSX.Element;
}

const ROUTES: RouteObject[] = [
  {
    path: "/",
    title: "Home",
    Page: Home,
  },
  {
    path: "/details",
    title: "Details",
    Page: Details,
  },
];

export { ROUTES };
