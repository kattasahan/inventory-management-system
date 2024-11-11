import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/layout/Layout";
import { store } from "@/redux/store";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Provider store={store}>
            <Layout />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
