import React from 'react';
import { Table, Button, Input, Select } from 'antd';
import { Form } from 'antd';
import './hospitalList.scss'
import Api from './../../client/api'

class HospitalListCom extends React.Component<any, any> {
	state = {
		hospitalList: []
	}
	columns: any = [
		{
			title: '医院名称',
			dataIndex: 'name',
			key: 'name',
			align: 'center' as any,
			render: (text: any) => <span>{text}</span>,
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address',
			align: 'center' as any,
		},
		{
			title: '操作',
			key: 'action',
			align: 'center' as any,
			render: (text: any, record: any) => {
				return <a onClick={() => {
					Api.delHospital(record.id).then((res: any) => {
						if (res.data.code === 0) {
							this.getHospital()
						}
					})
				}}>删除</a>
			},
		}
	];
	componentWillMount() {
		this.getHospital()
	}
	getHospital() {
		Api.getHospitalList().then((res: any) => {
			if (res.data.code === 0) {
				res.data.data.hospitals.map((val: any) => {
					val.key = val.id
				})
				this.setState({
					hospitalList: res.data.data.hospitals
				})
			}
		})
	}
	handleSubmit(e: any) {
		e.preventDefault();
		this.props.form.validateFields((err: any, values: any) => {
			if (!err) {
				Api.addHospital(values).then((res: any) => {
					if (res.data.code === 0) {
						this.props.form.resetFields();
						this.getHospital()
					}
				})
			}
		})
	}
	render() {
		let { hospitalList } = this.state
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="table-box">
				<div className="operation">
					<div className="form">
						<div className="form-con" style={{ marginTop: '20px' }}>
							<Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
								<Form.Item>
									{getFieldDecorator('name', {
										rules: [{ required: true, message: '请输入医院名称' }],
									})(
										<Input
											size='default'
											placeholder="医院名称"
										/>,
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('address', {
										rules: [{ required: true, message: '请输入医院地址' }],
									})(
										<Input
											size='default'
											type="text"
											placeholder="医院地址"
										/>,
									)}
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit" className="login-form-button">
										添加
               		</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
				<div className="table">
					<Table columns={this.columns} bordered={true} dataSource={hospitalList} />
				</div>
			</div>
		)
	}
}


const HospitalList = Form.create({ name: 'hospitalList' })(HospitalListCom);
export default HospitalList