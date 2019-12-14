import React from 'react';
import { Radio, Checkbox, DatePicker, Input, Button, notification } from 'antd'
import './nutritionScreening.scss'
import Data from './data';
import api from '../../client/api';
import moment from 'moment';
export default class NutritionScreening extends React.Component<any, any> {
  state: any = {
    data: null,
    dataCopy: null,
    //@ts-ignore
    identity: JSON.parse(sessionStorage.getItem('auth')).role.identity
  }
  componentWillMount() {
    this.setState({
      data: new Data(this.props.info, false),
      dataCopy: new Data(this.props.info, false)
    })
    api.nutritionScreeningGet(this.props.id).then((res: any) => {
      if (res.data.code == 0) {
        this.setState({
          dataCopy: null,
          data: null,
        }, () => {
          this.setState({
            data: new Data(res.data.data, true),
            dataCopy: new Data(res.data.data, true),
          })
        })
      }
    })
  }
  componentDidMount() {
    this.bindEvant()
  }
  bindEvant() {
    let p = document.querySelectorAll('.world [data-contenteditable=true]');
    p.forEach((val: any) => {
      val.id !== 'albumin' && val.setAttribute('contenteditable', 'true')
      val.oninput = (e: any) => {
        if (e.target.id === 'albumin') {
          let { data } = this.state
          data.nutritionalStatus.option1.albumin = e.target.innerText.replace(/(^\s*)|(\s*$)/g, "");
          this.setState({ data: data })
          return
        }
        let { data } = this.state
        if (!e.target.id) {
          data[e.target.dataset.id] = e.target.innerText.replace(/(^\s*)|(\s*$)/g, "");
          this.setState({
            data: data
          })
          return
        }
        data[e.target.id] = e.target.innerText.replace(/(^\s*)|(\s*$)/g, "");
        this.setState({
          data: data
        })
      }
    })
  }
  save() {
    let obj = this.state.data.getPostJson()
    obj = JSON.parse(obj)
    let { id } = this.props;
    api.nutritionScreeningSave(obj, id).then((res: any) => {
      if (res.data.code == 0) {
        notification.success({
          message: '保存成功',
        });
      } else {
        notification.error({
          message: res.data.msg,
        });
      }
    })
  }
  print() {
    window.print()
  }
  componentDidUpdate() {
    this.bindEvant()
  }
  render() {
    let { data, dataCopy, identity } = this.state
    if (!data || !dataCopy) {
      return <></>
    }
    return (
      <div className="nutrition-screening" id="print">
        <div className="operation">
          {identity !== 1 && identity !== 3 && <Button type="primary" style={{ marginRight: '10px' }} onClick={this.save.bind(this)}>保存</Button>}
          <Button type="primary" onClick={this.print.bind(this)}>打印</Button>
        </div>
        <div className="world">
          <div className="header">
            NRS2002营养风险筛查表
          </div>
          <div className="world-box">
            <table className="table">
              <tbody>
                <tr>
                  <td id="department">
                    <p data-contenteditable="true" data-id="department" style={{ height: '25px', lineHeight: '25px' }}>
                      {dataCopy.department}
                    </p>
                  </td>
                  <td id="name">
                    <p style={{ height: '25px', lineHeight: '25px' }}>
                      {dataCopy.name}
                    </p>
                  </td>
                  <td>
                    性别：{dataCopy.sex}
                  </td>
                  <td id="age">
                    <p style={{ height: '25px', textAlign: 'center', lineHeight: '25px' }}>
                      {dataCopy.age}
                    </p>
                  </td>
                  <td id="weight">
                    <p data-contenteditable="true" data-id="weight" style={{ height: '25px', textAlign: 'center', lineHeight: '25px' }}>
                      {dataCopy.weight}
                    </p>
                  </td>
                  <td id="height">
                    <p data-contenteditable="true" data-id="height" style={{ height: '25px', textAlign: 'center', lineHeight: '25px' }}>
                      {dataCopy.height}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td id="diagnosis" data-contenteditable="true" colSpan={6} data-id="diagnosis" style={{ height: '25px' }}>
                    &nbsp;{dataCopy.diagnosis}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ height: '25px', paddingLeft: '5px' }}>
                    住院日期：
                    <DatePicker
                      size="small"
                      placeholder=""
                      defaultValue={dataCopy.inHospitalDate ? moment(dataCopy.inHospitalDate) : undefined}
                      style={{ width: '130px' }}
                      onChange={(date, dateString) => {
                        let _data = data;
                        _data.inHospitalDate = dateString
                        this.setState({ data: _data })
                      }}
                    />
                  </td>
                  <td colSpan={2} style={{ height: '25px', paddingLeft: '5px' }}>
                    手术日期：
                    <DatePicker
                      size="small"
                      placeholder=""
                      defaultValue={dataCopy.inHospitalDate ? moment(dataCopy.operationDate) : undefined}
                      style={{ width: '130px' }}
                      onChange={(date, dateString) => {
                        let _data = data;
                        _data.operationDate = dateString
                        this.setState({ data: _data })
                      }}
                    />
                  </td>
                  <td colSpan={2} style={{ height: '25px', paddingLeft: '5px' }}>
                    测评日期：
                    <DatePicker
                      size="small"
                      defaultValue={dataCopy.inHospitalDate ? moment(dataCopy.assessDate) : undefined}
                      placeholder=""
                      style={{ width: '130px' }}
                      onChange={(date, dateString) => {
                        let _data = data;
                        _data.assessDate = dateString
                        this.setState({ data: _data })
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>1、疾病评分：</td>
                  <td colSpan={5}>
                    <div className="grid">
                      <div className="title">评分1分：</div>
                      <div className="check">
                        {data.diseaseScore.option1.map((val: any) => {
                          return <Checkbox
                            onChange={(e: any) => {
                              let _data = data
                              let index = _data.diseaseScore.option1.findIndex((opt: any) => {
                                return opt.name == val.name
                              });
                              _data.diseaseScore.option1[index].select = e.target.checked
                              this.setState({ data: _data })
                            }}
                            key={val.name}
                            checked={val.select}
                          >{val.name}</Checkbox>
                        })}
                      </div>
                    </div>
                    <div className="grid">
                      <div className="title">评分2分：</div>
                      <div className="check">
                        {data.diseaseScore.option2.map((val: any) => {
                          return <Checkbox
                            onChange={(e: any) => {
                              let _data = data
                              let index = _data.diseaseScore.option2.findIndex((opt: any) => {
                                return opt.name == val.name
                              });
                              _data.diseaseScore.option2[index].select = e.target.checked
                              this.setState({ data: _data })
                            }}
                            key={val.name}
                            checked={val.select}
                          >{val.name}</Checkbox>
                        })}
                      </div>
                    </div>
                    <div className="grid">
                      <div className="title">评分3分：</div>
                      <div className="check">
                        {data.diseaseScore.option3.map((val: any) => {
                          return <Checkbox
                            onChange={(e: any) => {
                              let _data = data
                              let index = _data.diseaseScore.option3.findIndex((opt: any) => {
                                return opt.name == val.name
                              });
                              _data.diseaseScore.option3[index].select = e.target.checked
                              this.setState({ data: _data })
                            }}
                            key={val.name}
                            checked={val.select}
                          >{val.name}</Checkbox>
                        })}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{ padding: '5px' }}>
                    <b>
                      小结：疾病有关评分:&emsp;{data.diseaseScore.totalScore}&emsp;分
                    </b>
                    （注：最高得分3分）
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'center' }}>2、营养状态：</td>
                  <td colSpan={5}>
                    <div style={{ lineHeight: '25px', padding: '8px' }}>
                      1、身体质量指数（BMI）&nbsp;
                      <p className="editor">
                        {data.nutritionalStatus.option1.BMI}
                      </p>&nbsp;
                      ;小于18.5（3分）注：因严重胸腹水、水肿得不到准确BMI值时，无严重肝肾功能异常者，用白蛋白替代&nbsp;
                      <p
                        id="albumin"
                        className="editor"
                        data-contenteditable="true"
                        contentEditable={
                          !data.height && !data.weight ? true : false
                        }
                        suppressContentEditableWarning={true}
                      >
                        {dataCopy.nutritionalStatus.option1.albumin}
                      </p>
                      &nbsp;（g/l）（小于30g/L,3分）
                    </div>
                    <div style={{ lineHeight: '25px', padding: '0 8px 8px' }}>
                      2、体重下降>5%是在：
                      {data.nutritionalStatus.option2.options.map((val: any, i: any) => {
                        return <Checkbox
                          defaultChecked={data.nutritionalStatus.option2.select == i}
                          key={val.text}
                          checked={val.select}
                          onChange={(e: any) => {
                            let _data = data
                            _data.nutritionalStatus.option2.options.map((val: any, index: any) => {
                              if (index == i) {
                                val.select = e.target.checked
                                _data.nutritionalStatus.option2.select = e.target.checked ? index : null
                              } else {
                                val.select = false
                              }
                            })
                            this.setState({ data: _data })
                          }}
                        >{val.text}</Checkbox>
                      })}
                    </div>
                    <div style={{ lineHeight: '25px', padding: '0 8px 8px' }}>
                      3、一周内进食量较从前减少：
                      {data.nutritionalStatus.option3.options.map((val: any, i: any) => {
                        return <Checkbox
                          defaultChecked={data.nutritionalStatus.option3.select == i}
                          key={val.text}
                          checked={val.select}
                          onChange={(e: any) => {
                            let _data = data
                            _data.nutritionalStatus.option3.options.map((val: any, index: any) => {
                              if (index == i) {
                                val.select = e.target.checked
                                _data.nutritionalStatus.option3.select = e.target.checked ? index : null
                              } else {
                                val.select = false
                              }
                            })
                            this.setState({ data: _data })
                          }}
                        >{val.text}</Checkbox>
                      })}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{ padding: '5px' }}>
                    <b>小结：营养状态评分&emsp;{data.nutritionalStatus.totalScore}&emsp;分</b>（注：最高得分3分）
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '5px' }}>3、年龄评分</td>
                  <td colSpan={5} style={{ padding: '5px' }}>
                    年龄>70岁（1分）年龄＜70岁（0分）
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{ padding: '5px' }}>
                    <b>小结：年龄评分 {data.ageScore} 分</b> （注：最高得分1分）
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{ padding: '5px' }}>
                    <p style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px' }}>
                      NRS2002营养风险筛查：总分7分，得分{data.totalScore}分
                    </p>
                    <p style={{ textAlign: 'right', fontWeight: 'bold', fontFamily: '' }}>
                      筛查者签名：<span>_____________</span>
                      &emsp;&emsp;&emsp;&emsp;
                      ________
                       年
                       ________
                        月
                        ________
                        日
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{ padding: '5px' }}>
                    <p>注：对于表中没有明确列出诊断的疾病参考以下标准，依照调查者的理解进行评分</p>
                    <div className="text-2">
                      1分：慢性疾病患者因出现并发症而住院治疗。病人虚弱但不需卧床。蛋白质需要量略有增加，但可通过口服补充来弥补。
                    </div>
                    <div className="text-2">
                      2分：患者需要卧床，如腹部大手术后。蛋白质需要量相应增加，但大多数人仍可以通过肠外或肠内营养支持得到恢复。
                    </div>
                    <div className="text-2">
                      3分：患者在加强病房中靠机械通气支持。蛋白质需要量增加而且不能被肠外或肠内营养支持所弥补。但是通过肠外或肠内营养支持可使蛋白质分解和氮丢失明显减少。
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} style={{ padding: '5px' }}>
                    <p style={{ marginBottom: '5px' }}><b>总分值≥3分：患者处于营养风险，需要营养支持，结合临床，制定营养治疗计划。</b></p>
                    <p><b>总分值＜3分：每周复查营养风险筛查。</b></p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style={{ textAlign: 'left', marginTop: '10px' }}><b>适用对象：18-90岁，住院1天以上，次日8时未行手术者，神志清者。</b></p>
          </div>
        </div>
      </div >
    )
  }
}
