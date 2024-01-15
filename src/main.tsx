import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen.tsx";
import SignUpScreen from "./pages/SignUpScreen.tsx";
import ReadScreen from "./pages/ReadScreen.tsx";
import Protected from "./components/Protected.tsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "/login",
        element:(
          <Protected authentication={false}>
            <LoginScreen/>
          </Protected>
        ),
      },
      {
        path: "/signup",
        element:(
          <Protected authentication={false}>
            <SignUpScreen/>
          </Protected>
        ),
      },
      {
        path:"/reads",
        element:(
          <Protected authentication={true}>
            <ReadScreen/>
          </Protected>),
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
