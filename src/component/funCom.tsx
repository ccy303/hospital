import React from 'react'
import { Modal } from 'antd'
import ReactEcharts from 'echarts-for-react'
export const ModalFun: any = (props: any) => {
	return <div>
		<Modal
			title={props.title}
			visible={props.visible}
			onOk={props.handleOk}
			onCancel={props.handleCancel}
		>
			{props.children}
		</Modal>
	</div >
}

