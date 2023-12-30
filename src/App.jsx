import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./assets/style/main.css";

// import { AppHeader } from "./cmps/AppHeader";
// import { AppFooter } from "./cmps/AppFooter";

import { ToyIndex } from "./pages/toyIndex";
import { store } from "./store/store";
import { ToyDetails } from "./pages/ToyDetails";
import { ToyDashboard } from "./pages/ToyDashboard";
import { UserLogin } from "./pages/UserLogin";
import { AddToy } from "./pages/AddToy";

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          {/* <AppHeader /> */}
          <main>
            <Routes>
              <Route element={<ToyIndex />} path="/" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyDashboard />} path="/toyDashboard" />
              <Route element={<UserLogin />} path="/userLogin" />
              <Route element={<AddToy />} path="/AddToy" />
              <Route element={<AddToy />} path="/AddToy/:toyId" />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  );
}
