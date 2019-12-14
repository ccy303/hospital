import React from 'react'
import { Button, Tabs, Input, Select, Divider, Table } from 'antd'
import { ModalFun } from '../funCom';
import Api from './../../client/api'
const { TabPane } = Tabs;
const { Option } = Select

export default class UserList extends React.Component {
	state = {
		showModel: false,
		tabKey: "1",
		userName: '',
		pwd: '',
		hospitals: [],
		hospitalId: '',
		hospitalManagerList: [],
		editorList: [],
		nurseList: [],
		customerList: [],
		updata: false,
		userId: '',
		//@ts-ignore
		role: JSON.parse(sessionStorage.getItem('auth')).role
	}
	columns = [
		{
			title: '用户名',
			dataIndex: 'account',
			key: 'account',
			align: 'center' as any,
			render: (text: any) => <span>{text}</span>,
		},
		{
			title: '用户身份',
			dataIndex: 'role.identityTitle',
			key: 'role.identityTitle',
			align: 'center' as any,
		},
		{
			title: '所属医院',
			dataIndex: 'role.hospital.name',
			key: 'role.hospital.name',
			align: 'center' as any,
		},
		{
			title: '操作',
			key: 'action',
			align: 'center' as any,
			render: (text: any, row: any) => {
				//@ts-ignore
				let role = JSON.parse(sessionStorage.getItem('auth'));
				if (role.role.identity === 1) {
					return <span>您无权限操作</span>
				}
				return <span>
					<a onClick={this.updata.bind(this, row)}>修改</a>
					<Divider type="vertical" />
					<a>删除</a>
				</span>
			},
		},
	];
	tabArr = ["医院管理员", "营养师", "护士", "客服"]
	updata(row: any) {
		this.setState({
			showModel: true,
			updata: true,
			userName: row.account,
			userId: row.id,
		})
	}
	callback(key: any) {
		let { role } = this.state
		this.setState(
			{ tabKey: key },
			() => {
				key == '1' && this.getHospitalManagerList(this.state.hospitalId)
				key == '2' && this.getEditor(this.state.hospitalId)
				key == '3' && this.getNurseList(this.state.hospitalId)
				key == '4' && role.identity === 4 && this.getCustomer(this.state.hospitalId)
			})
	}
	add() {
		let parmas: any = {
			account: this.state.userName,
			password: this.state.pwd
		}
		let { tabKey, updata, userId } = this.state
		!updata && (parmas.hospitalId = this.state.hospitalId)
		updata && (parmas.id = userId)
		if (tabKey == '1') {
			!updata && Api.setHospitalManager(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getHospitalManagerList(this.state.hospitalId)
				}
			})
			updata && Api.updataHospitalManager(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getHospitalManagerList(this.state.hospitalId)
				}
			})
		}
		if (tabKey == '2') {
			!updata && Api.setEditor(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getEditor(this.state.hospitalId)
				}
			})
			updata && Api.updataEditor(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getEditor(this.state.hospitalId)
				}
			})
		}
		if (tabKey == '3') {
			!updata && Api.setNurse(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getNurseList(this.state.hospitalId)
				}
			})
			updata && Api.updataNurse(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getNurseList(this.state.hospitalId)
				}
			})
		}
		if (tabKey == '4') {
			!updata && Api.setCustomer(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getCustomer(this.state.hospitalId)
				}
			})
			updata && Api.updataCustomer(parmas).then((res: any) => {
				if (res.data.code === 0) {
					this.getCustomer(this.state.hospitalId)
				}
			})
		}
		this.setState({
			showModel: false,
			userName: '',
			pwd: '',
			updata: false,
			userId: ''
		})
	}
	componentWillMount() {
		let { role } = this.state
		role.identity === 3 && this.setState({
			tabKey: '2'
		})
		Api.getHospitalList().then((res: any) => {
			if (res.data.code === 0) {
				this.setState({
					hospitals: res.data.data.hospitals
				})
			}
		})
	}
	getHospitalManagerList(val: any) {
		Api.getHospitalManagerLis(val).then((res: any) => {
			if (res.data.code == 0) {
				res.data.data.list.map((val: any, i: any) => {
					val.key = i
				})
				this.setState({
					hospitalManagerList: res.data.data.list
				})
			}
		})
	}
	getEditor(val: any) {
		Api.getEditorList(val).then((res: any) => {
			if (res.data.code == 0) {
				res.data.data.list.map((val: any, i: any) => {
					val.key = i
				})
				this.setState({
					editorList: res.data.data.list
				})
			}
		})
	}
	getNurseList(val: any) {
		Api.getNurse(val).then((res: any) => {
			if (res.data.code == 0) {
				res.data.data.list.map((val: any, i: any) => {
					val.key = i
				})
				this.setState({
					nurseList: res.data.data.list
				})
			}
		})
	}
	getCustomer(val: any) {
		Api.customerList(val).then((res: any) => {
			if (res.data.code == 0) {
				res.data.data.list.map((val: any, i: any) => {
					val.key = i
				})
				this.setState({
					customerList: res.data.data.list
				})
			}
		})
	}
	hospitalChange(val: any) {
		let { role } = this.state
		this.setState(
			{ hospitalId: val }, () => {
				(role.identity === 4 || role.identity === 1) && this.getHospitalManagerList(val)
				this.getEditor(val)
				role.identity !== 3 && this.getNurseList(val)
				role.identity === 4 && this.getCustomer(val)
			}
		)

	}
	render() {
		let {
			showModel,
			tabKey,
			hospitals,
			hospitalManagerList,
			editorList,
			customerList,
			nurseList,
			role,
			hospitalId,
			updata
		} = this.state

		return <div style={{ background: '#fff', padding: '10px' }}>
			<Select
				defaultValue={'请选择医院'}
				style={{ width: '200px', marginBottom: '10px', marginRight: '10px' }}
				onChange={this.hospitalChange.bind(this)}
			>
				{hospitals.map((val: any, i: any) => {
					return <Option key={val.id} value={val.id} disabled={role.identity === 3 && role.hospital.id !== val.id}>{val.name}</Option>
				})}
			</Select>
			<Button
				type="primary"
				style={{ marginRight: '10px' }}
				disabled={!hospitalId}
				onClick={() => { this.setState({ showModel: true }) }}
			>
				添加{this.tabArr[Number(tabKey) - 1]}
			</Button>
			<Tabs defaultActiveKey={tabKey} onChange={this.callback.bind(this)}>
				<TabPane tab="医院管理员" key="1" disabled={role.identity === 3}>
					<Table columns={this.columns} bordered={true} dataSource={hospitalManagerList} />
				</TabPane>
				<TabPane tab="营养师" key="2">
					<Table columns={this.columns} bordered={true} dataSource={editorList} />
				</TabPane>
				<TabPane tab="护士" key="3" disabled={role.identity === 3}>
					<Table columns={this.columns} bordered={true} dataSource={nurseList} />
				</TabPane>
				<TabPane tab="客服" key="4" disabled={role.identity != 4}>
					<Table columns={this.columns} bordered={true} dataSource={customerList} />
				</TabPane>
			</Tabs>
			<ModalFun
				title='添加参考值'
				visible={showModel}
				handleOk={this.add.bind(this)}
				handleCancel={() => {
					this.setState({
						showModel: false,
						userName: '',
						pwd: '',
						updata: false,
						userId: ''
					})
				}}
			>
				<div>
					<Input
						placeholder="用户名"
						value={this.state.userName}
						disabled={updata}
						onChange={(e: any) => {
							e.persist()
							this.setState({
								userName: e.target.value
							})
						}} />
					<Input
						style={{ marginTop: '10px' }}
						placeholder="密码"
						value={this.state.pwd}
						type="password"
						onChange={(e: any) => {
							e.persist()
							this.setState({
								pwd: e.target.value
							})
						}} />
				</div>
			</ModalFun>
		</div>
	}
}