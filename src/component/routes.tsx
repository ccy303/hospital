import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Form } from 'antd';
import { routes } from './routesData';
import './routes.scss'
import { connect } from 'react-redux'
import { updataPath } from './../redux/action/index'

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

interface State {
  collapsed: boolean;
  routesNum: Array<any>
  selectKey: any
}

const mapDispatchToProps = {
  updataPath
}

const mapStateProps = (state: any) => {
  return { ...state.path }
}

class RenderMainMenu extends React.Component<any, State> {
  state: State = {
    collapsed: false,
    routesNum: [],
    selectKey: []
  };
  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };
  getRoutesNum(routes: Array<any>) {
    routes.forEach((val) => {
      if (val.path && !val.routes) {
        this.state.routesNum.push(val)
      } else if (val.routes) {
        this.getRoutesNum(val.routes)
      }
    })
  };
  menuClick(e: any) {
    this.props.updataPath(e.item.props['data-path'])
    this.setState({
      selectKey: e.keyPath
    })
  };
  componentWillReceiveProps(props: any) {
    if (props.location.pathname !== props.path) {
      this.props.updataPath(this.props.location.pathname)
    }
    this.getRoutesNum(routes);
    let { routesNum } = this.state;
    let key = routesNum.find(val => {
      let re = new RegExp(`${val.path}`)
      if (val.path === '/') {
        return val.path === props.path
      } else {
        return re.test(props.path)
      }
    }).key
    this.setState({
      selectKey: [String(key)]
    })
  }
  componentWillMount() {
    this.props.updataPath(this.props.location.pathname)
  }
  loginOut() {
    sessionStorage.clear();
    this.props.history.replace('/login')
  }
  render() {
    const { selectKey } = this.state;
    let _routes = routes.filter((val: any) => {
      if (val.routes) {
        val.routes = val.routes.filter((route: any) => {
          return route.renderMenu
        })
      }
      return val.renderMenu
    })
    // @ts-ignore
    let auth = JSON.parse(sessionStorage.getItem('auth'));
    return (
      <div>
        <Header style={{ position: 'fixed', width: '100%', zIndex: 999 }}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            selectedKeys={selectKey}
            mode="horizontal"
            style={{ lineHeight: '64px', width: '70%', display: 'inline-block' }}
            onClick={this.menuClick.bind(this)}
          >
            {_routes.map((mainRoute: any, i) => {
              return (
                !mainRoute.routes ? <Menu.Item key={mainRoute.key} data-path={mainRoute.path}>
                  <Icon type="pie-chart" />
                  <span>{mainRoute.title}</span>
                  <Link style={{ display: 'inline' }} to={mainRoute.path}></Link>
                </Menu.Item> :
                  <SubMenu key={i + 1} title={
                    <span>
                      <Icon type="user" />
                      <span>{mainRoute.title}</span>
                    </span>
                  }>
                    {mainRoute.routes.map((subRoute: any, index: any) => {
                      return <Menu.Item key={subRoute.key} data-path={subRoute.path}>
                        <Link to={subRoute.path}>{subRoute.title}</Link>
                      </Menu.Item>
                    })}
                  </SubMenu>
              )
            })}
          </Menu>
          <div className="user-info">
            <span>{auth.account}</span>
            <a onClick={this.loginOut.bind(this)}>退出</a>
          </div>
        </Header>
        <Content className="layout-content">
          {this.props.children}
        </Content>
      </div>
    )
  }
}

export default connect(mapStateProps, mapDispatchToProps)(withRouter(RenderMainMenu))