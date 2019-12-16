import React from 'react';
import { Table, Divider, Button, Radio, Input, Select, InputNumber, notification } from 'antd';
import './quota.scss'
import { ModalFun } from '../funCom'
import Api from './../../client/api'
const InputGroup = Input.Group
const { Option } = Select;

export default class Quota extends React.Component {
	state: any = {
		showModel: false,
		allowSex: false,
		indicatorId: '',
		enName: '',
		zhName: '',
		unit: '',
		rangeValue: [
			{ min: undefined, max: undefined },
			{ min: undefined, max: undefined }
		],
		hospitalList: [],
		indicators: [],
		hospitalId: '',
		quotaList: [],
		updata: false
	}
	columns = [
		{
			title: '项目(中文)',
			dataIndex: 'zhName',
			key: 'zhName',
			align: 'center' as any,
			render: (text: any) => <span>{text}</span>,
		},
		{
			title: '英文缩写',
			dataIndex: 'enName',
			key: 'enName',
			align: 'center' as any,
		},
		{
			title: '参考范围',
			dataIndex: 'rangeValue',
			key: 'rangeValue',
			align: 'center' as any,
			render: (text: any) => {
				if (text.length == 1) {
					return <span>{text[0].min}~{text[0].max}</span>
				} else {
					return (
						<div>
							<p style={{ margin: 0 }}>男:{text[0].min}~{text[0].max}</p>
							<p style={{ margin: 0 }}>女:{text[1].min}~{text[1].max}</p>
						</div>
					)
				}
			}
		},
		{
			title: '单位',
			key: 'unit',
			dataIndex: 'unit',
			align: 'center' as any,
		},
		{
			title: '操作',
			key: 'action',
			align: 'center' as any,
			render: (text: any, row: any) => {
				return (
					<span>
						<a onClick={this.updata.bind(this, row)}>修改</a>
						<Divider type="vertical" />
						<a>删除</a>
					</span>
				)
			},
		},
	];
	//@ts-ignore
	role = JSON.parse(sessionStorage.getItem('auth'))
	componentWillMount() {
		Api.getIndicators().then((res: any) => {
			if (res.data.code === 0) {
				this.setState({
					indicators: res.data.data.indicators
				})
			}
		})
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
	add() {
		console.log(this.state)
		return
		let parmas = {
			hospitalId: this.state.hospitalId,
			indicatorId: this.state.indicatorId,
			maleMinValue: this.state.rangeValue[0].min,
			maleMaxValue: this.state.rangeValue[0].max,
			femaleMinValue: this.state.allowSex ? this.state.rangeValue[1].min : this.state.rangeValue[0].min,
			femaleMaxValue: this.state.allowSex ? this.state.rangeValue[1].max : this.state.rangeValue[0].max,
		}
		Api.setIndicator(parmas).then((res: any) => {
			if (res.data.code == 0) {
				notification.success({
					message: '保存成功',
				});
				this.setState({
					updata: false,
					showModel: false,
					indicatorId: '',
					rangeValue: [
						{ min: undefined, max: undefined },
						{ min: undefined, max: undefined }
					],
					enName: '',
					zhName: '',
					unit: '',
				})
				this.getIndicators(this.state.hospitalId)
			}
		})
	}
	hospitalChange(e: any) {
		this.setState({
			hospitalId: e
		})
		this.getIndicators(e)
	}
	getIndicators(id: any) {
		Api.getIndicators(id).then((res: any) => {
			if (res.data.code == 0) {
				res.data.data.indicators.map((val: any, i: any) => {
					val.key = i
					if (val.femaleMaxValue == val.maleMaxValue && val.maleMinValue == val.femaleMinValue) {
						val.rangeValue = [{
							min: val.maleMinValue,
							max: val.maleMaxValue
						}]
					} else {
						val.rangeValue = [{
							max: val.maleMaxValue,
							min: val.maleMinValue,
						}, {
							max: val.femaleMaxValue,
							min: val.femaleMinValue
						}]
					}
				});
				this.setState({
					quotaList: res.data.data.indicators
				})
			}
		})
	}
	updata(row: any) {
		this.setState({
			updata: true,
			showModel: true,
			allowSex: row.rangeValue.length == 2,
			rangeValue: row.rangeValue,
			indicatorId: row.id
		})
	}
	render() {
		let { updata, indicatorId, quotaList, hospitalId, allowSex, showModel, rangeValue, hospitalList, indicators } = this.state
		return (
			<div className="table-box">
				<div className="operation">
					<Select
						defaultValue="请选择医院"
						style={{ width: '150px', marginRight: '10px' }}
						onChange={this.hospitalChange.bind(this)}
					>
						{hospitalList.map((val: any, i: any) => {
							return (
								<Option key={i} value={val.id} style={{ width: '150px' }}>{val.name}</Option>
							)
						})}
					</Select>
					<Button
						type="primary"
						onClick={() => { this.setState({ showModel: true }) }}
						disabled={!hospitalId}
					>
						添加参考值
					</Button>
				</div>
				<div className="table">
					<Table columns={this.columns} bordered={true} dataSource={quotaList} />
				</div>
				<ModalFun
					title='添加参考值'
					visible={showModel}
					handleOk={this.add.bind(this)}
					handleCancel={() => {
						this.setState({
							showModel: false,
							updata: false,
							indicatorId: '',
							enName: '',
							zhName: '',
							unit: '',
							rangeValue: [
								{ min: undefined, max: undefined },
								{ min: undefined, max: undefined }
							]
						})
					}}
				>
					<div className="form">
						<div className="form-con">
							<Select
								value={indicatorId ? indicatorId : '自定义指标'}
								style={{ width: 200, marginRight: '10px' }}
								disabled={Boolean(updata)}
								onChange={(val: any) => {
									this.setState({
										indicatorId: val === '自定义指标' ? '' : val,
									})
								}}
							>
								<Option value="自定义指标">自定义指标</Option>
								{indicators.map((val: any) => {
									return (
										<Option
											key={val.id}
											value={val.id}
										>{val.zhName}</Option>
									)
								})}
							</Select>
							<Radio.Group
								onChange={(e): any => { this.setState({ allowSex: e.target.value }) }}
								value={allowSex}
							>
								<Radio value={false}>不区分性别</Radio>
								<Radio value={true}>区分性别</Radio>
							</Radio.Group>
						</div>
						{!indicatorId && <div className="form-con" style={{ marginTop: '20px' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Input
									placeholder="指标名称"
									style={{ width: '150px' }}
									onChange={(e: any) => {
										e.persist()
										this.setState({
											zhName: e.target.value
										})
									}}
								/>
								<Input
									placeholder="英文缩写"
									style={{ width: '150px', marginLeft: '5px' }}
									onChange={(e: any) => {
										e.persist()
										this.setState({
											enName: e.target.value
										})
									}}
								/>
								<Input
									placeholder="单位"
									style={{ width: '150px', marginLeft: '5px' }}
									onChange={(e: any) => {
										e.persist()
										this.setState({
											unit: e.target.value
										})
									}}
								/>
							</div>
						</div>}
						<div className="form-con" style={{ marginTop: '20px' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								{allowSex ? '男：' : ''}
								<InputGroup compact>
									<InputNumber
										style={{ width: 150, textAlign: 'center' }}
										placeholder="最小值"
										value={rangeValue[0].min}
										onChange={(e: any) => {
											let { rangeValue } = this.state
											rangeValue[0].min = e
											this.setState({
												rangeValue: rangeValue
											})
										}}
									/>
									<Input
										style={{
											width: 30,
											borderLeft: 0,
											marginLeft: 1,
											marginRight: 1,
											pointerEvents: 'none',
											backgroundColor: '#fff',
										}}
										placeholder="~"
										disabled
									/>
									<InputNumber
										style={{ width: 150, textAlign: 'center', borderLeft: 0 }}
										placeholder="最大值"
										value={rangeValue[0].max}
										onChange={(e: any) => {
											let { rangeValue } = this.state
											rangeValue[0].max = e
											this.setState({
												rangeValue: rangeValue
											})
										}}
									/>
								</InputGroup>
							</div>
							{allowSex && <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
								{allowSex ? '女：' : ''}
								<InputGroup compact>
									<InputNumber
										style={{ width: 150, textAlign: 'center' }}
										placeholder="最小值"
										value={rangeValue[1].min}
										onChange={(e: any) => {
											let { rangeValue } = this.state
											rangeValue[1].min = e
											this.setState({
												rangeValue: rangeValue
											})
										}}
									/>
									<Input
										style={{
											width: 30,
											borderLeft: 0,
											marginLeft: 1,
											marginRight: 1,
											pointerEvents: 'none',
											backgroundColor: '#fff',
										}}
										placeholder="~"
										disabled
									/>
									<InputNumber
										style={{ width: 150, textAlign: 'center', borderLeft: 0 }}
										placeholder="最大值"
										value={rangeValue[1].max}
										onChange={(e: any) => {
											let { rangeValue } = this.state
											rangeValue[1].max = e
											this.setState({
												rangeValue: rangeValue
											})
										}}
									/>
								</InputGroup>
							</div>}
						</div>
					</div>
				</ModalFun>
			</div>
		)
	}
}
