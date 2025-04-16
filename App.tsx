import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import Root from "./src/navigation/Root";
import store from "./src/redux/store";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
