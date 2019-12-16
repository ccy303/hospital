import React from 'react';
import { Form, Input, Select, Button, } from 'antd';
import Api from '../../client/api';
import { Tabs } from 'antd';
import './search.scss'
import NutritionScreening from './../nutritionScreening/nutritionScreening'
import TreatmentSheet from './../treatmentSheet/treatmentSheet'
const { TabPane } = Tabs;

class SearchCom extends React.Component<any, any> {
  state: any = {
    type: [],
    searchResult: {},
    key: '1',
    //@ts-ignore
    role: JSON.parse(sessionStorage.getItem('auth')).role,
    indicators: []
  }
  getIndicators(id: any) {
    Api.getIndicators(id).then((res: any) => {
      if (res.data.code == 0) {
        res.data.data.indicators.map((val: any, i: any) => {
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
          indicators: res.data.data.indicators
        })
      }
    })
  }
  componentWillMount() {
    Api.patientDetail(this.props.match.params.id).then((res: any) => {
      if (res.data.code == 0) {
        this.setState({
          searchResult: res.data.data
        }, () => {
          let { hospitalId } = this.state.searchResult
          this.getIndicators(hospitalId)
        })
      }
    })
    this.state.role.identity === 2 && this.setState({
      key: '3'
    })
  }
  callback(key: any) {
    if (key == 1) {
      return
    }
    if (key == 2) {
      return
    }
  }
  render() {
    const { searchResult, role, key } = this.state
    return (
      <div>
        <div className="operation">
          <div className="search-info">
            <span>姓名：{searchResult.fullName || '请搜索'}</span>
            <span>性别：{searchResult.gender == 0 ? '男' : '女'}</span>
            <span>年龄：{searchResult.age || '请搜索'}</span>
            <span>住院号：{searchResult.hospitalizationNumber || '请搜索'}</span>
            <span>手机：{searchResult.mobile || '请搜索'}</span>
          </div>
        </div>
        <Tabs defaultActiveKey={key} onChange={this.callback.bind(this)}>
          <TabPane tab="营养筛查" key="1" disabled={role.identity === 2}>
            <NutritionScreening id={this.props.match.params.id} info={searchResult} />
          </TabPane>
          <TabPane tab="营养评估" key="2" disabled>
          </TabPane>
          <TabPane tab="营养干预" key="3" disabled={role.identity === 5}>
            <TreatmentSheet indicators={this.state.indicators} id={this.props.match.params.id} info={searchResult} />
          </TabPane>
          <TabPane tab="营养监测" key="4" disabled>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default SearchCom