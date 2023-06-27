import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ObfuscateLayout } from "../components/obfuscate.jsx";

import "../style/index.css";
import "../navigationBackup.jsx";
import "../proxy.jsx";

var Home = React.lazy(() => import("./home.jsx"));
var InternalHome = React.lazy(() => import("./internal/home.jsx"));
var Error = React.lazy(() => import("./error.jsx"));

function App() {
    const InternalPage = (props) => {
      if (window !== window.top) {
        return (
          props.children
        )
      } else {
        return (
          <Error />
        )
      }
    }

    return (
        <>
            <ObfuscateLayout />
            <Routes>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<></>}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/internal/home"
                  element={
                    <Suspense fallback={<></>}>
                      <InternalPage>
                        <InternalHome />
                      </InternalPage>
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<></>}>
                      <Error />
                    </Suspense>
                  }
                />
            </Routes>
        </>
    )
}

export default App;