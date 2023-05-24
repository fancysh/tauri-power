/*
 * @Author: fangyi fang@zhongan.com
 * @Date: 2023-03-14 15:34:41
 * @LastEditors: fangyi fang@zhongan.com
 * @LastEditTime: 2023-05-23 21:26:32
 * @FilePath: /my-tauri/src/App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useCallback } from 'react';
import {
  message,
  Button,
  Form,
  Image,
  Input,
  Spin,
  Select,
  Row,
  Col,
  Card,
} from 'antd';
import { invoke } from '@tauri-apps/api/tauri';
// import { listen } from '@tauri-apps/api/event';
import Logo from './assets/renewable-energy.png';
import './App.less';

const Search = Input.Search;

function App() {
  const [loading, setLoading] = useState(false);
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
    const url = 'https://git.zhonganinfo.com/za/sky-web.git';
    const path = '/Users/fangyi/ZA/cloneDoc';
    try {
      await invoke('clone', {
        url,
        path,
      });
      message.success('项目已开始下载');
    } catch (e) {
      console.error(e);
      message.error('下载失败');
    }
  }, []);

  // 下载代码并展示进度
  const downloadCode = async () => {
    const url = 'https://git.zhonganinfo.com/za/sky-web.gitt';
    const path = '/Users/fangyi/ZA/cloneDoc';

    try {
      await promisified({
        cmd: 'load',
        url: url,
        path: path,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleSubmit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        // const res=await submit({ ...values, accountingBookName: val.ledgerName });
        // onOk();
        const url = 'https://git.zhonganinfo.com/za/sky-web.gitt';
        const path = '/Users/fangyi/ZA/cloneDoc';

        await promisified({
          cmd: 'load',
          url: url,
          path: path,
        });
      })
      .catch((err) => {
        console.log('err==>', err);
      });
  };

  return (
    <div className='container'>
      <h1>Develop Powner</h1>

      <div className='logo'>
        <a target='_blank'>
          <img src={Logo} className='logo' alt='logo' />
        </a>
      </div>

      <p>应用下载工具Tool</p>

      <div className='row'>
        <Form
          form={form}
          labelCol={{ style: { width: '100px' } }}
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <Card className='form-content'>
            <Row gutter={30}>
              <Col span={24}>
                <Form.Item
                  name='orgs'
                  label='组织架构'
                  rules={[{ required: true, message: '请选择科目类型' }]}
                >
                  <Select placeholder='请选择' allowClear>
                    {[].map((item) => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.ledgerName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='collections'
                  label='项目组'
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <Select placeholder='请选择' allowClear>
                    {[].map((item) => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.ledgerName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='mode'
                  label='项目类型'
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <Select placeholder='请选择' allowClear>
                    {[].map((item) => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.ledgerName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='project'
                  label='项目'
                  rules={[{ required: true, message: '请输入' }]}
                >
                  <Select placeholder='请选择' allowClear>
                    {[].map((item) => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.ledgerName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ marginTop: '10px' }}>
                <Button
                  onClick={onHandleSubmit}
                  className='m-l-10'
                  type='primary'
                  loading={loading}
                >
                  下载代码
                </Button>
                {/* <Search addonBefore={<span style={{background:'white'}}>https://</span>} placeholder="请输入git地址" allowClear enterButton="下载" size="large" onSearch={handleLoadClick}/> */}
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
    </div>
  );
}

export default App;
