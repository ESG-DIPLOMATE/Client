import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import "@/styles/fonts.scss";
import $ from "./App.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const elem = useRoutes(routes);

  return (
    <>
      <div className={$.Wrapper}>
        <div className={$.ContentWrapper}>{elem}</div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        toastStyle={{
          width: "90%",
          minWidth: "clamp(320px, 50vw, 400px)",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      />
    </>
  );
}

export default App;
