/*
 * @Author: fangyi fang@zhongan.com
 * @Date: 2023-03-14 15:34:41
 * @LastEditors: fangyi fang@zhongan.com
 * @LastEditTime: 2023-05-11 19:05:55
 * @FilePath: /my-tauri/src/App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React,{ useState, useCallback } from "react";
import { message ,Button,Form, Image, Input, Spin } from 'antd';
import { invoke } from '@tauri-apps/api/tauri';
// import { listen } from '@tauri-apps/api/event';
import Logo from './assets/renewable-energy.png';
import "./App.less";

const Search = Input.Search;

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  
//  useEffect(() => {
//     // 监听进度信息
//     invoke('listen', {
//       event: 'progress-\\d+',
//       handler: (message) => {
//         // 解析进度信息并更新进度条
//         const progressMatch = message.event.match(/^progress-(\d+)$/);
//         if (progressMatch) {
//           const newProgress = parseInt(progressMatch[1]);
          // messageApi.open({
          //   type: 'loading',
          //   content: newProgress,
          //   duration: 0,
          // });
//         }
//       }
//     });
//   }, []);

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   // setGreetMsg(await invoke("greet", { name }));
  //   await invoke('project_git_clone',{url:'https://git.zhonganinfo.com/za/sky-web.git',path:'/Users/fangyi/ZA/cloneDoc'})
  //  console.log(11)
  // }

  // const handleLoadClick = async () => {
  //   const url='https://git.zhonganinfo.com/za/sky-web.gitt';
  //   const path='/Users/fangyi/ZA/cloneDoc';
  //   try {
  //     await invoke('load', { url, path }, (event) => {
  //       console.log('Progress:', progress.percentage, progress.message);
  //     //   if (event.kind === 'Download') {
  //     //     messageApi.open({
  //     //       type: 'loading',
  //     //       content:` ${event.loaded / event.total}`,
  //     //       duration: 0,
  //     //     });
  //     //     // setProgress(event.loaded / event.total);
  //     //   }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLoadClick = useCallback(async () => {
    const url='https://git.zhonganinfo.com/za/sky-web.git';
    const path='/Users/fangyi/ZA/cloneDoc';
    try {
        await invoke("clone", {
            url,
            path,
        });
        message.success('项目已开始下载')
    } catch (e) {
        console.error(e);
       message.error('下载失败');
    }
}, []);

  
    // 下载代码并展示进度
    const downloadCode = async () => {
      const url='https://git.zhonganinfo.com/za/sky-web.gitt';
      const path='/Users/fangyi/ZA/cloneDoc';
  
      try {
        await promisified({
          cmd: 'load',
          url: url,
          path: path
        });
      } catch (error) {
        console.error(error);
      }
    };
  
  return (
    <div className="container">
      <h1>Develop Powner</h1>

      <div className="logo">
        <a target="_blank">
          <img src={Logo} className="logo" alt="logo" />
        </a>
      </div>

      <p>自动下载应用模版工具</p>

      <div className="row">
        <Form
        form={form}
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <Search addonBefore={<span style={{background:'white'}}>https://</span>} placeholder="请输入git地址" allowClear enterButton="下载" size="large" onSearch={handleLoadClick}/>
        </Form>
      </div>
    </div>
  );
}

export default App;
