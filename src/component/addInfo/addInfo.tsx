import React from 'react';
import Api from '../../client/api'
import './todoList.scss'
import { Form, Input, Button, Select, notification } from 'antd';
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};
class AddInfoCom extends React.Component<any, any> {
  state: { [propName: string]: any } = {
    tipArr: [],
    sortStatus: {},
    hospitalList: []
  }
  //@ts-ignore
  role = JSON.parse(sessionStorage.getItem('auth'));
  componentWillMount() {
    this.role.role.identity === 4 && Api.getHospitalList().then((res: any) => {
      if (res.data.code === 0) {
        this.setState({
          hospitalList: res.data.data.hospitals
        })
      }
    })
    this.role.role.identity !== 4 && this.setState({
      hospitalList: [this.role.role.hospital]
    })
  }
  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        Api.setPatient(values).then((res: any) => {
          if (res.data.code == 0) {
            notification.success({
              message: '保存成功',
            });
            this.props.form.resetFields()
            this.props.history.push('/patientList')
          } else {
            notification.error({
              message: res.data.msg,
            });
          }
        })
      }
    })
  }
  render() {
    const { hospitalList } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="addinfo-container">
        <div className="form-content">
          <Form {...formItemLayout}
            onSubmit={this.handleSubmit.bind(this)}
            className="login-form"
          >
            <Form.Item label="医院">
              {getFieldDecorator('hospitalId', {
                rules: [{ required: true, message: '请选择医院' }],
                initialValue: hospitalList.length ? hospitalList[0].id : ''
              })(
                <Select>
                  {hospitalList.map((val: any, i: any) => {
                    return <Option key={val.id} value={val.id}>{val.name}</Option>
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="科室">
              {getFieldDecorator('department', {
                rules: [{ required: true, message: '请输入科室' }],
              })(
                <Input
                  size='default'
                  type="text"
                  placeholder="科室"
                />,
              )}
            </Form.Item>
            <Form.Item label="住院号">
              {getFieldDecorator('hospitalizationNumber', {
                rules: [{ required: true, message: '请输入住院号' }],
              })(
                <Input
                  size='default'
                  placeholder="住院号"
                />,
              )}
            </Form.Item>
            <Form.Item label="姓名">
              {getFieldDecorator('fullName', {
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input
                  size='default'
                  type="text"
                  placeholder="姓名"
                />,
              )}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: '选择性别' }],
                initialValue: '0'
              })(
                <Select>
                  <Option value='0'>男</Option>
                  <Option value='1'>女</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="年龄">
              {getFieldDecorator('age', {
                rules: [{ required: true, message: '请输入年龄' }],
              })(
                <Input
                  size='default'
                  type="text"
                  placeholder="年龄"
                />,
              )}
            </Form.Item>
            <Form.Item label="手机">
              {getFieldDecorator('mobile', {
                rules: [{ required: true, message: '请输入手机' }],
              })(
                <Input
                  size='default'
                  type="text"
                  placeholder="手机"
                />,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
const AddInfo = Form.create({ name: 'AddInfoCom' })(AddInfoCom);
export default AddInfo