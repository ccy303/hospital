import React from 'react'
import './treatmentSheet.scss'
import { Select, Checkbox, notification, Popconfirm } from 'antd';
import Data from './data'
import { DatePicker, Button, message } from 'antd';
import moment from 'moment';
import api from '../../client/api';
import { getProEn } from './getProEn'
import { Modal } from 'antd';
import ReactEcharts from 'echarts-for-react';
const { Option } = Select;

export const RenderReactEcharts: any = (props: any) => {
  return <ReactEcharts
    option={props.opt.option}
    style={{ height: '350px', width: '100%' }}
    className='react_for_echarts'
    notMerge={true}
    lazyUpdate={true}
  />
}
export default class TreatmentSheet extends React.Component<any> {
  state: any = {
    data: null,
    dataCopy: null,
    tableData: {},
    //@ts-ignore
    identity: JSON.parse(sessionStorage.getItem('auth')).role.identity,
    lang: 'cn',
    showChart: false,
    chartOption: {},
    title: ''
  }
  componentDidMount() {
    let p = document.querySelectorAll('.world [data-contenteditable=true]');
    p.forEach((val: any) => {
      val.setAttribute('contenteditable', 'true')
    })
  }
  componentWillMount() {
    api.treatmentSheetGet(this.props.id).then((res: any) => {
      if (res.data.code === 2) {
        this.setState({
          data: new Data(this.props.info, false),
          dataCopy: new Data(this.props.info, false),
        }, () => {
          this.setState({
            tableData: this.state.data.fontMateTableData()
          })
        })
      } else if (res.data.code === 0) {
        this.setState({
          data: new Data(res.data.data, true),
          dataCopy: new Data(res.data.data, true),
        }, () => {
          this.setState({
            tableData: this.state.data.fontMateTableData()
          })
        })
      }
    })
  }
  componentWillReceiveProps(props: any) {
    console.log(props)
  }
  print() {
    window.print()
  }
  addNewSheet() {
    let { data } = this.state
    data.updataData()
    let timer = this.state.tableData.timerArr;
    let lastPageTimer = timer[timer.length - 1]
    if (!lastPageTimer[lastPageTimer.length - 1]) {
      message.info('当前表格未填满');
      return
    }
    data.newTable();
    let sheetData = JSON.parse(JSON.stringify(data));
    this.setState({
      data: new Data(sheetData, true),
      dataCopy: new Data(sheetData, true),
    }, () => {
      this.setState({
        tableData: this.state.data.fontMateTableData()
      })
    })
  }
  onInputFun_1(e: any) {
    e.persist()
    let { data } = this.state;
    if (new RegExp(/[\r\n]/g).test(e.target.innerText)) {
      e.target.innerText = ''
    }
    let inputData = e.target.innerText.replace(/(^\s*)|(\s*$)/g, "");
    data[e.target.dataset.id] = inputData
    if (e.target.dataset.id == 'height' || e.target.dataset.id == 'weight') {
      let dom = document.querySelectorAll(`[data-id=BMI]`)
      let i = 0;
      while (i <= dom.length - 1) {
        let bmi = Number(this.state.data.weight) / Math.pow(Number(this.state.data.height) / 100, 2)
        this.state.data.BMI = String(Math.round(bmi * 10) / 10)
        this.state.dataCopy.BMI = String(Math.round(bmi * 10) / 10)
        if (bmi != 0) {
          // @ts-ignore
          dom[i].innerText = Math.round(bmi * 10) / 10
        }
        // @ts-ignore
        dom[i].style.background = data['BMI'] ? "#FAFAD2" : '#fff'
        i++
      }
    }
    let dom = document.querySelectorAll(`[data-id=${e.target.dataset.id}]`);
    let i = 0;
    while (i <= dom.length - 1) {
      // @ts-ignore
      dom[i] != e.target && (dom[i].innerText = data[e.target.dataset.id])
      // @ts-ignore
      dom[i].style.background = data[e.target.dataset.id] ? "#FAFAD2" : '#fff'
      i++
    }
  }
  onInputFun_2(e: any) {
    e.persist()
    let { data } = this.state
    if (new RegExp(/[\r\n]/g).test(e.target.innerText)) {
      e.target.innerText = ''
    }
    data[e.target.dataset.id][e.target.dataset.target] = e.target.innerText.replace(/(^\s*)|(\s*$)/g, "");;
    let dom = document.querySelectorAll(`[data-id=${e.target.dataset.id}][data-target=${e.target.dataset.target}]`);
    let i = 0;
    if (e.target.dataset.id === 'parenteralNutritionEnergy') {
      let sum = data.parenteralNutritionEnergy.PRO * 4 +
        data.parenteralNutritionEnergy.FAT * 9 +
        data.parenteralNutritionEnergy.CHO * 4;
      data['parenteralNutritionEnergy']['energy'] = String(sum);
      this.state.dataCopy['parenteralNutritionEnergy']['energy'] = String(sum);
      let dom = document.querySelectorAll(`[data-id=parenteralNutritionEnergy][data-target=energy]`);
      let i = 0;
      while (i <= dom.length - 1) {
        // @ts-ignore
        dom[i].innerText = sum
        // @ts-ignore
        dom[i].style.background = data['parenteralNutritionEnergy']['energy'] ? "#FAFAD2" : '#fff'
        i++
      }
    }
    while (i <= dom.length - 1) {
      // @ts-ignore
      dom[i] != e.target && (dom[i].innerText = data[e.target.dataset.id][e.target.dataset.target])
      // @ts-ignore
      dom[i].style.background = data[e.target.dataset.id][e.target.dataset.target] ? "#FAFAD2" : '#fff'
      i++
    }
  }
  componentDidUpdate() {
    let p = document.querySelectorAll('.world [data-contenteditable=true]');
    p.forEach((val: any) => {
      val.setAttribute('contenteditable', 'true')
    })
  }
  languageChange(e: any) {
    this.setState({
      lang: e
    })
    this.state.data.table.language = e
    this.state.dataCopy.table.language = e
    this.setState({
      data: new Data(this.state.data, true, e),
      dataCopy: new Data(this.state.dataCopy, true, e),
    }, () => {
      this.setState({
        tableData: this.state.data.fontMateTableData()
      })
    })
  }
  save() {
    let json = JSON.parse(this.state.data.getPostJson());
    api.treatmentSheetSave(json, this.props.id).then((res: any) => {
      if (res.data.code == 0) {
        notification.success({
          message: '保存成功',
        });
      } else {
        notification.error({
          message: res.data.msg
        })
      }
    })
  }
  //填写时检查值，赋值颜色
  checkTdVal(dom: any) {
    let index = this.state.data.sex === '男' ? 0 : 1
    let { indicators } = this.props
    let inputVal = Number(dom.innerText)
    let pro = dom.parentElement.firstChild.innerText;
    let indicatorsVal = indicators.find((val: any) => { return val.enName === pro || val.zhName === pro })
    if (!indicatorsVal || isNaN(inputVal)) return
    if (inputVal > indicatorsVal.rangeValue[index].min) {
      dom.style.color = '#f00'
      return
    }
    if (inputVal < indicatorsVal.rangeValue[index].max) {
      dom.style.color = '#32CD32'
      return
    }
  }
  //渲染时时检查值，赋值颜色
  renderChechVal(val: any, pro: any) {
    let index = this.state.data.sex === '男' ? 0 : 1
    let { indicators } = this.props
    let inputVal = val
    let indicatorsVal = indicators.find((val: any) => { return val.enName === pro || val.zhName === pro })
    if (!indicatorsVal || isNaN(inputVal)) return '#000'
    if (indicatorsVal.rangeValue.length === 1) { index = 0 }
    if (inputVal > indicatorsVal.rangeValue[index].min) {
      return '#f00'
    }
    if (inputVal < indicatorsVal.rangeValue[index].max) {
      return '#32CD32'
    }
  }
  setProEn(arg: any, page: any, colum: any, time: any) {
    let proEn = getProEn(arg)
    let pro = this.state.tableData.data[page].find((val: any) => {
      return val.key == '蛋白质/能量' || val.key == 'PRO/EN'
    })
    pro.data[colum] = `${time},${proEn.proSum}/${proEn.energySum}`
    //@ts-ignore
    let dom = document.querySelector(`[data-proid='${pro.id}']`).childNodes[colum + 1]
    //@ts-ignore
    dom.innerText = `${proEn.proSum}/${proEn.energySum}`
  }
  openChart(data: any) {
    let index = this.state.data.sex === '男' ? 0 : 1
    let chartData = [].concat(...data.data)
    let { indicators } = this.props
    let chartOption: any = {
      option: {
        title: {
          text: `${data.key}`
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt: any) {
            return [pt[0], '10%'];
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'line',
          itemStyle: {
            color: '#32CD32'
          },
          areaStyle: {
            color: '#00FF7F'
          },
          markLine: {
            silent: true,
            data: [],
          }
        }]
      }
    }
    let indicatorsTargrt = indicators.filter((val: any) => {
      return val.enName === data.key || val.zhName === data.key
    })[0]
    if (indicatorsTargrt) {
      chartOption.option.series[0].markLine.data = [
        {
          yAxis: indicatorsTargrt.rangeValue[index].min,
          lineStyle: {
            color: '#32CD32',
          },
          label: {
            show: true,
            formatter: '最小值{c}'
          },
        },
        {
          yAxis: indicatorsTargrt.rangeValue[index].max,
          lineStyle: {
            color: '#f00',
          },
          label: {
            show: true,
            formatter: '最大值{c}'
          }
        }
      ]
    }

    chartData.map((val: any) => {
      chartOption.option.xAxis.data.push(val.split(',')[0])
      chartOption.option.series[0].data.push(Number(val.split(',')[1]))
    })
    this.setState({
      showChart: true,
      chartOption: chartOption,
    })
  }
  render() {
    let { data, dataCopy, tableData, identity, lang } = this.state;
    if (!tableData || !Object.keys(tableData).length) return <></>
    return (
      <div className="treatment-sheet">
        <div className="operation">
          {identity !== 1 && identity !== 3 &&
            <Button type="primary" style={{ marginRight: '10px' }} onClick={this.addNewSheet.bind(this)}>添加表格</Button>
          }
          {identity !== 1 && identity !== 3 &&
            <Button type="primary" style={{ marginRight: '10px' }} onClick={this.save.bind(this)}>保存</Button>
          }
          <Button type="primary" onClick={this.print.bind(this)}>打印</Button>
          <Select
            defaultValue={lang}
            style={{ marginLeft: '10px' }}
            onChange={this.languageChange.bind(this)}>
            <Option value="cn">中文</Option>
            <Option value="en">英文</Option>
          </Select>
        </div>
        {tableData.data.map((pageData: any, page_i: any) => {
          return (
            <div key={page_i} className="world">
              <div className="title" data-contenteditable="true" data-id="title" onInput={this.onInputFun_1.bind(this)}>
                {dataCopy.title}
              </div>
              <div className="header">
                <div className="row-1">
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: '20%' }} id="name">
                          <p style={{ background: dataCopy.name ? '#FAFAD2' : '', textAlign: 'left', paddingLeft: '5px' }}>
                            {dataCopy.name}
                          </p>
                        </td>
                        <td style={{ width: '90px' }} id="sex">
                          <p style={{ background: dataCopy.sex ? '#FAFAD2' : '', textAlign: 'left', paddingLeft: '5px' }}>
                            {dataCopy.sex}
                          </p>
                        </td>
                        <td style={{ width: '90px' }} id="age">
                          <p style={{ background: dataCopy.age ? '#FAFAD2' : '', textAlign: 'left', paddingLeft: '5px' }}>
                            {dataCopy.age}
                          </p>
                        </td>
                        <td id="department">
                          <p
                            data-contenteditable="true"
                            data-id="department"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.department ? '#FAFAD2' : '', textAlign: 'left', paddingLeft: '5px' }}
                          >
                            {dataCopy.department}
                          </p>
                        </td>
                        <td id="bedNum">
                          <p
                            data-contenteditable="true"
                            data-id="bedNum"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.bedNum ? '#FAFAD2' : '', textAlign: 'left', paddingLeft: '5px' }}
                          >
                            {dataCopy.bedNum}
                          </p>
                        </td>
                        <td id="hospitalizationNum">
                          <p
                            style={{ marginLeft: '4em', background: dataCopy.hospitalizationNum ? '#FAFAD2' : '', textAlign: 'left', paddingLeft: '5px' }}
                          >
                            {dataCopy.hospitalizationNum}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row-2">
                  <table>
                    <tbody>
                      <tr>
                        <td id="mainDiagnosis">
                          <p
                            data-contenteditable="true"
                            style={{ marginLeft: '5em', textAlign: 'left', background: dataCopy.mainDiagnosis ? '#FAFAD2' : '', minHeight: '20px' }}
                            data-id="mainDiagnosis"
                            onInput={this.onInputFun_1.bind(this)}
                          >
                            {dataCopy.mainDiagnosis}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row-3">
                  <table>
                    <tbody>
                      <tr>
                        <td id="pleuralEffusion">
                          <span style={{ paddingLeft: '0.3em', fontWeight: 'bold' }}>胸腔积液:</span>
                          <Select
                            defaultValue={String(data.pleuralEffusion)}
                            onChange={(e: any) => {
                              let _data = data;
                              _data.pleuralEffusion = e == 'true' ? true : false;
                              this.setState({
                                data: _data
                              })
                            }}
                          >
                            <Option value="" disabled>是/否</Option>
                            <Option value="true">是</Option>
                            <Option value="false">否</Option>
                          </Select>
                        </td>
                        <td id="pancreaticFluid">
                          <span style={{ fontWeight: 'bold' }}>腹腔积液:</span>
                          <Select
                            defaultValue={String(data.pancreaticFluid)}
                            onChange={(e: any) => {
                              let _data = data;
                              _data.pancreaticFluid = e == 'true' ? true : false;
                              this.setState({
                                data: _data
                              })
                            }}
                          >
                            <Option value="" disabled>是/否</Option>
                            <Option value="true">是</Option>
                            <Option value="false">否</Option>
                          </Select>
                        </td>
                        <td id="energy">
                          <p
                            data-id="parenteralNutritionEnergy"
                            data-target="energy"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.parenteralNutritionEnergy.energy ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.parenteralNutritionEnergy.energy}
                          </p>
                        </td>
                        <td id="energy-PRO">
                          <p
                            data-contenteditable="true"
                            data-id="parenteralNutritionEnergy"
                            data-target="PRO"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.parenteralNutritionEnergy.PRO ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.parenteralNutritionEnergy.PRO}
                          </p>
                        </td>
                        <td id="energy-FAT">
                          <p
                            data-contenteditable="true"
                            data-id="parenteralNutritionEnergy"
                            data-target="FAT"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.parenteralNutritionEnergy.FAT ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.parenteralNutritionEnergy.FAT}
                          </p>
                        </td>
                        <td id="energy-CHO">
                          <p
                            data-contenteditable="true"
                            data-id="parenteralNutritionEnergy"
                            data-target="CHO"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.parenteralNutritionEnergy.CHO ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.parenteralNutritionEnergy.CHO}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row-4">
                  <table>
                    <tbody>
                      <tr>
                        <td id="dietarySurvey">
                          <p
                            data-contenteditable="true"
                            data-id="dietarySurvey"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ textAlign: 'left', background: dataCopy.dietarySurvey ? '#FAFAD2' : '', height: 'unset', minHeight: '20px' }}
                          >
                            {dataCopy.dietarySurvey}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr>
                        <td id="lactoseIntolerance">
                          <span style={{ fontWeight: 'bold', marginTop: '2px' }}>乳糖不耐受:</span>
                          <Select
                            defaultValue={String(data.lactoseIntolerance)}
                            onChange={(e: any) => {
                              let _data = data;
                              _data.lactoseIntolerance = e == 'true' ? true : false;
                              this.setState({
                                data: _data
                              })
                            }}
                          >
                            <Option value="" disabled>是/否</Option>
                            <Option value="true">是</Option>
                            <Option value="false">否</Option>
                          </Select>
                        </td>
                        <td id="inEnergy">
                          <p
                            data-contenteditable="true"
                            data-id="inEnergy"
                            data-target="energy"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.inEnergy.energy ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.inEnergy.energy}
                          </p>
                        </td>
                        <td id="inEnergy-PRO">
                          <p
                            data-contenteditable="true"
                            data-id="inEnergy"
                            data-target="PRO"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.inEnergy.PRO ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.inEnergy.PRO}
                          </p>
                        </td>
                        <td id="inEnergy-FAT">
                          <p
                            data-contenteditable="true"
                            data-id="inEnergy"
                            data-target="FAT"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.inEnergy.FAT ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.inEnergy.FAT}
                          </p>
                        </td>
                        <td id="inEnergy-CHO">
                          <p
                            data-contenteditable="true"
                            data-id="inEnergy"
                            data-target="CHO"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.inEnergy.CHO ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.inEnergy.CHO}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row-5">
                  <table>
                    <tbody>
                      <tr>
                        <td id="height">
                          <p
                            data-contenteditable="true"
                            data-id="height"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.height ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.height}
                          </p>
                        </td>
                        <td id="weight">
                          <p
                            data-contenteditable="true"
                            data-id="weight"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.weight ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.weight}
                          </p>
                        </td>
                        <td id="BMI">
                          <p
                            data-id="BMI"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.BMI ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.BMI}
                          </p>
                        </td>
                        <td id="needEnergy">
                          <p
                            data-contenteditable="true"
                            data-id="needEnergy"
                            data-target="energy"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.needEnergy.energy ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.needEnergy.energy}
                          </p>
                        </td>
                        <td id="needEnergy-PRO">
                          <p
                            data-contenteditable="true"
                            data-id="needEnergy"
                            data-target="PRO"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.needEnergy.PRO ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.needEnergy.PRO}
                          </p>
                        </td>
                        <td id="needEnergy-FAT">
                          <p
                            data-contenteditable="true"
                            data-id="needEnergy"
                            data-target="FAT"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.needEnergy.FAT ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.needEnergy.FAT}
                          </p>
                        </td>
                        <td id="needEnergy-CHO">
                          <p
                            data-contenteditable="true"
                            data-id="needEnergy"
                            data-target="CHO"
                            onInput={this.onInputFun_2.bind(this)}
                            style={{ background: dataCopy.needEnergy.CHO ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.needEnergy.CHO}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr>
                        <td id="waist">
                          <p
                            data-contenteditable="true"
                            data-id="waist"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.waist ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.waist}
                          </p>
                        </td>
                        <td id="hip">
                          <p
                            data-contenteditable="true"
                            data-id="hip"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.hip ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.hip}
                          </p>
                        </td>
                        <td id="upperArm">
                          <p
                            data-contenteditable="true"
                            data-id="upperArm"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.upperArm ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.upperArm}
                          </p>
                        </td>
                        <td id="lowerLeg">
                          <p
                            data-contenteditable="true"
                            data-id="lowerLeg"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.lowerLeg ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.lowerLeg}
                          </p>
                        </td>
                        <td id="skinfoldThickness">
                          <p
                            data-contenteditable="true"
                            data-id="skinfoldThickness"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.skinFoldThickness ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.skinFoldThickness}
                          </p>
                        </td>
                        <td id="gripStrength">
                          <p
                            data-contenteditable="true"
                            data-id="gripStrength"
                            onInput={this.onInputFun_1.bind(this)}
                            style={{ background: dataCopy.gripStrength ? '#FAFAD2' : '' }}
                          >
                            {dataCopy.gripStrength}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row-6">
                  <table>
                    <tbody>
                      <tr style={{ height: '25px' }}>
                        <td style={{ width: '5em', paddingLeft: '0.2em', fontWeight: 'bold' }}>营养诊断:</td>
                        {data.NutritionDiagnosis.options.map((val: any, index: any) => {
                          let width = ''
                          index == 0 && (width = '200px')
                          index == 1 && (width = '200px')
                          index == 2 && (width = '140px')
                          let style = {
                            width: width
                          }
                          return (
                            <td key={index} style={style}>
                              <Checkbox
                                checked={Boolean(val.select1)}
                                onChange={(e) => {
                                  let _data = data;
                                  _data.NutritionDiagnosis.options[index].select1 = e.target.checked;
                                  this.setState({
                                    data: _data
                                  })
                                }}>
                                {val.text}
                              </Checkbox>
                              {val._opt && <Select
                                defaultValue=""
                                onChange={(e: any) => {
                                  let _data = data
                                  _data.NutritionDiagnosis.options[index].select2 = e;
                                  this.setState({
                                    data: _data
                                  })
                                }}
                                style={{}}
                              >
                                <Option value="" disabled>轻&nbsp;中&nbsp;重</Option>
                                {val._opt.map((opt: any, i: any) => {
                                  return <Option key={i} value={i}>{opt}</Option>
                                })}
                              </Select>}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="excel">
                <table className="table">
                  <thead>
                    <tr>
                      <td>
                        <div className="line">
                          <em className="pro">{data.table.language === 'cn' ? `项目` : 'ITEM'}</em>
                          <em className="date">{data.table.language === 'cn' ? `日期` : 'DATE'}</em>
                        </div>
                      </td>
                      {tableData.timerArr[page_i].map((timer_val: any, timer_i: any) => {
                        return (
                          <td key={`${timer_val}${timer_i}`}>
                            <DatePicker
                              defaultValue={timer_val ? moment(timer_val) : undefined}
                              placeholder=""
                              onChange={(date, dateStr) => {
                                tableData.timerArr[page_i][timer_i] = dateStr
                                tableData.data[page_i].map((dataObj: any) => {
                                  dataObj.data[timer_i] = `${dateStr},`
                                })
                                this.setState({ tableData: tableData })
                              }}
                            />
                          </td>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((pageData_item: any, data_i: any) => {
                      return (
                        <tr
                          data-proid={pageData_item.id}
                          key={data_i}
                          style={{
                            borderTop: `${(pageData_item.key == '用法' || pageData_item.key == 'USAGE') ? '3px solid #000' : ''}`,
                            borderBottom: `${(pageData_item.key == '费用/天' || pageData_item.key == '￥/D') ? '3px solid #000' : ''}`,
                          }}>
                          {/* 项目 */}
                          <Popconfirm
                            title="查看趋势？"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={this.openChart.bind(this, pageData_item)}
                          >
                            <td
                              data-contenteditable="true"
                              style={{ height: '22px', fontSize: (data.key == 'DI Symptoms') ? '10px' : '11px' }}
                              onInput={(e: any) => {
                                e.persist();
                                if (new RegExp(/[\r\n]/g).test(e.target.innerText) && e.target.innerText == '\n') {
                                  e.target.innerText = ''
                                }
                                tableData.data[page_i][data_i].key = e.target.innerText;
                                tableData.project[page_i][data_i] = e.target.innerText;
                              }}
                            >
                              {pageData_item.key}
                            </td>
                          </Popconfirm>
                          {pageData_item.data.map((data_item: any, data_item_i: any) => {
                            return (
                              <td
                                key={`${data_item}${data_item_i}`}
                                style={{
                                  color: this.renderChechVal(data_item.split(',')[1], pageData_item.key),
                                  background: data_item.split(',')[1] ? '#FAFAD2' : ''
                                }}
                                contentEditable={
                                  tableData.timerArr[page_i][data_item_i] && pageData_item.key !== '用法' && pageData_item.key !== 'USAGE' ? true : false
                                }
                                suppressContentEditableWarning={true}
                                onInput={(e: any) => {
                                  e.persist()
                                  if (new RegExp(/[\r\n]/g).test(e.target.innerText) && e.target.innerText == '\n') {
                                    e.target.innerText = ''
                                  }
                                  this.checkTdVal(e.target)
                                  let _arr = data_item.split(',');
                                  if (_arr.length == 1 || _arr[0] == '') {
                                    _arr[0] = tableData.timerArr[page_i][data_item_i]
                                  }
                                  _arr[1] = isNaN(Number(e.target.innerText)) ? e.target.innerText : Number(e.target.innerText);
                                  e.target.style.background = _arr[1] ? '#FAFAD2' : '#fff'
                                  tableData.data[page_i][data_i].data[data_item_i] = _arr.join(',');
                                  //设置蛋白质/能量
                                  if (tableData.callGetProEnData[page_i].includes(pageData_item)) {
                                    let arr: any = [];
                                    tableData.callGetProEnData[page_i].map((val: any) => {
                                      let obj: any = {};
                                      obj.name = val.key;
                                      obj.value = val.data[data_item_i].split(',')[1];
                                      arr.push(obj)
                                    })
                                    this.setProEn(arr, page_i, data_item_i, tableData.timerArr[page_i][data_item_i])
                                  }
                                }}
                              >
                                {pageData_item.key !== '用法' && pageData_item.key !== 'USAGE' && data_item.split(',')[1]}
                                {
                                  (pageData_item.key === '用法' || pageData_item.key === 'USAGE') &&
                                  <Select
                                    style={{ width: data_item.split(',')[1] ? 'max-content' : '50px' }}
                                    defaultValue={data_item.split(',')[1] || ''}
                                    onChange={(e: any) => {
                                      let _arr = data_item.split(',');
                                      _arr[1] = e;
                                      tableData.data[page_i][data_i].data[data_item_i] = _arr.join(',');
                                      this.setState({
                                        tableData: tableData
                                      })
                                    }}
                                  >
                                    <Option value="Qd">Qd</Option>
                                    <Option value="Bid">Bid</Option>
                                    <Option value="Tid">Tid</Option>
                                    <Option value="Qid">Qid</Option>
                                  </Select>
                                }
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <p className="pageNum">第&nbsp;{page_i + 1}&nbsp;页</p>
              </div>
            </div>
          )
        })
        }
        <Modal
          title={`${this.state.title}趋势`}
          visible={this.state.showChart}
          okText="确定"
          cancelText="取消"
          onOk={() => { this.setState({ showChart: false }) }}
          onCancel={() => { this.setState({ showChart: false }) }}
        >
          <RenderReactEcharts opt={this.state.chartOption} />
        </Modal>
      </div >
    )
  }
}