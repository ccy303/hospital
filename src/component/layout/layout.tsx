import { Layout } from 'antd';
import React from 'react';
import RenderMainMenu from './../routes'
import LoginCom from './../login/login'
import { HashRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import AddInfo from "../addInfo/addInfo";
import Search from '../search/search';
import Quota from '../quota/quota';
import HospitalList from '../hospitalList/hospitalList';
import UserList from '../user/user';
import PatientList from '../patientList/patientlist';
import { connect } from 'react-redux'
import { updataPath } from './../../redux/action/index'

const mapDispatchToProps = {
  updataPath
}
class LayoutSlideCom extends React.Component<any> {
  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <HashRouter>
            <Switch>
              <Route path='/login' component={LoginCom} />
              <Route path='/' render={props => {
                let auth: any = sessionStorage.getItem('auth');
                if (!auth) {
                  return <Redirect to="/login" />
                }
                //@ts-ignore
                let authObj = JSON.parse(sessionStorage.getItem('auth'))
                if (authObj.role.identity === 4) {
                  return (
                    <RenderMainMenu>
                      <Route exact path='/' component={AddInfo} />
                      <Route exact path='/search/:id' component={Search} />
                      <Route exact path='/manager/quota' component={Quota} />
                      <Route exact path='/manager/addHospital' component={HospitalList} />
                      <Route exact path='/user' component={UserList} />
                      <Route exact path='/patientList' component={PatientList} />
                    </RenderMainMenu>
                  )
                }
                if (authObj.role.identity === 3) {
                  return (
                    <RenderMainMenu>
                      <Route exact path='/' render={props => {
                        return <Redirect to="/patientList" />
                      }} />
                      <Route exact path='/user' component={UserList} />
                      <Route exact path='/manager/quota' component={Quota} />
                      <Route exact path='/patientList' component={PatientList} />
                      <Route exact path='/search/:id' component={Search} />
                    </RenderMainMenu>
                  )
                }
                if (authObj.role.identity === 2) {
                  return (
                    <RenderMainMenu>
                      <Route exact path='/' component={AddInfo} />
                      <Route exact path='/patientList' component={PatientList} />
                      <Route exact path='/search/:id' component={Search} />
                    </RenderMainMenu>
                  )
                }
                if (authObj.role.identity === 5) {
                  return (
                    <RenderMainMenu>
                      <Route exact path='/' component={AddInfo} />
                      <Route exact path='/patientList' component={PatientList} />
                      <Route exact path='/search/:id' component={Search} />
                    </RenderMainMenu>
                  )
                }
                if (authObj.role.identity === 1) {
                  return (
                    <RenderMainMenu>
                      <Route exact path='/' render={props => {
                        return <Redirect exact to="/patientList" />
                      }} />
                      <Route exact path='/patientList' component={PatientList} />
                      <Route exact path='/search/:id' component={Search} />
                    </RenderMainMenu>
                  )
                }
              }} />
            </Switch>
          </HashRouter>
        </Layout>
      </div>
    );
  }
}

export default connect(
  null, mapDispatchToProps
)(withRouter(LayoutSlideCom))