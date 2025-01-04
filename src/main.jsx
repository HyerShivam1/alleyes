import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { store } from './Store'
import { Provider } from 'react-redux'
import { FirebaseProvider } from "./components/services/firebase.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
    <App />
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>,
)
