import React from 'react'
import { Button, Tabs, Input, Select, Divider, Table, Form, notification, Popconfirm } from 'antd'
import { Link } from "react-router-dom";
import './patientlist.scss'
import Api from '../../client/api'

class PatientListCom extends React.Component<any> {
  state = {
    patientList: []
  }
  patientListColums = [
    {
      title: '姓名',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center' as any,
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      ortDirections: ['descend', 'ascend'],
      sorter: (a: any, b: any) => a.age - b.age,
      align: 'center' as any,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center' as any,
      render: (text: any) => <span>{text == 0 ? '男' : '女'}</span>
    },
    {
      title: '住院号',
      dataIndex: 'hospitalizationNumber',
      key: 'hospitalizationNumber',
      align: 'center' as any,
    },
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      ortDirections: ['descend', 'ascend'],
      sorter: (a: any, b: any) => a.department.localeCompare(b.department),
      align: 'center' as any,
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center' as any,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center' as any,
      render: (text: any, record: any) => {
        //@ts-ignore
        let auth = JSON.parse(sessionStorage.getItem('auth')).role;
        return (
          <p>
            <Link to={`/search/${record.id}`}>详情</Link>
            <Popconfirm
              title="删除此病人？"
              okText="确定"
              cancelText="取消"
              onConfirm={this.delPatient.bind(this, record.id)}
            >
              {auth.identity === 4 && <a style={{ marginLeft: '10px' }}>删除</a>}
            </Popconfirm>
          </p>
        )
      },
    },
  ];

  delPatient(id: any) {
    Api.delPatient(id).then((res: any) => {
      if (res.data.code === 0) {
        this.getData({});
      } else {
        notification.error({
          message: res.data.msg,
        });
      }
    })
  }

  componentWillMount() {
    this.getData({})
  }

  getData(val: any) {
    Api.userSearch(val).then((res: any) => {
      if (res.data.code == 0) {
        res.data.data.list.map((val: any, i: any) => {
          val.key = i
        })
        this.setState({
          patientList: res.data.data.list.length ? res.data.data.list : []
        })
      }
    })
  }

  search(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.getData(values)
      }
    });
  }

  render() {
    let { patientList } = this.state
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="patientlist">
        <div className="form">
          <Form layout="inline" onSubmit={this.search.bind(this)}>
            <Form.Item>
              {getFieldDecorator('fullName', {
                rules: [{ required: false, }],
              })(
                <Input
                  placeholder="姓名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('hospitalizationNumber', {
                rules: [{ required: false, }],
              })(
                <Input
                  placeholder="住院号"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table className="table" columns={this.patientListColums} bordered={true} dataSource={patientList} />
      </div>
    )
  }
}


const PatientList = Form.create({ name: 'horizontal_login' })(PatientListCom);

export default PatientList

