import React from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import Api from './../../client/api'
import './login.scss'
class LoginCom extends React.Component<any> {
	constructor(props: any) {
		super(props)
	}
	state = {
	};
	handleSubmit(e: any) {
		e.preventDefault();
		this.props.form.validateFields((err: any, values: any) => {
			if (!err) {
				Api.login(values).then((res: any) => {
					if (res.data.code === 0) {
						res.data.data = Object.assign({}, res.data.data, { account: values.account })
						sessionStorage.setItem('auth', JSON.stringify(res.data.data))
						this.props.history.replace('/')
					} else {
						notification.error({
							message: res.data.msg,
						});
					}
				})
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-container">
				<div className="form-content">
					<p className="title">医院营养诊疗系统</p>
					<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
						<Form.Item>
							{getFieldDecorator('account', {
								rules: [{ required: true, message: '请输入用户名' }],
							})(
								<Input
									size='large'
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="账号"
								/>,
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '密码错误' }],
							})(
								<Input
									size='large'
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="密码"
								/>,
							)}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
              			 </Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}

const Login = Form.create({ name: 'login' })(LoginCom);
export default Login