import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from "react-redux";       // 顶层组件，用于包裹原有的组件
import { createLogger } from "redux-logger";  // 中间件，日志打印
import thunk from "redux-thunk";              // 中间件, action creators
import reducer from "./reducers";             // 应用的 Reducer
import { getAllProducts } from "./actions";   // 应用的 Action
import App from "./containers/App.jsx";       // 应用的 UI组件
import "./index.css";                         // 样式

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {  // 如果是开发环境，就添加中间件
  middleware.push(createLogger());
}

// 创建 Store，整个应用中有且仅有一个 Store，用于存放整个应用中所有的 state
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

// 请求接口获取数据
store.dispatch(getAllProducts());

render(
  <Provider store={store}>  {/* 使原来整个应用成为Provider的子组件 */}
    <App />
  </Provider>,
  document.getElementById("root")
);
