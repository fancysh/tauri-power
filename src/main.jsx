/*
 * @Author: fangyi fang@zhongan.com
 * @Date: 2023-03-14 15:34:41
 * @LastEditors: fangyi fang@zhongan.com
 * @LastEditTime: 2023-05-23 21:22:57
 * @FilePath: /my-tauri/src/main.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "antd/lib/style/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
