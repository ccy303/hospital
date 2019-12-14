import AddInfo from "./addInfo/addInfo";
import Search from './search/search';
import Login from './login/login';
import quota from './quota/quota'
import PatientList from './patientList/patientlist'
import UserList from "./user/user";
import HospitalList from './hospitalList/hospitalList';
export const routes = [
  {
    key: 1,
    title: '新增信息',
    path: '/',
    get renderMenu() {
      return (
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity == 4 ||
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity == 2 ||
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity == 5
      )
    },
    component: AddInfo
  },
  {
    key: 2,
    title: '病人列表',
    path: '/patientList',
    get renderMenu() {
      return (
        //@ts-ignore
        // JSON.parse(sessionStorage.getItem('auth')).role.identity !== 3
        true
      )
    },
    component: PatientList
  }, {
    key: 2,
    title: '病人列表',
    path: '/search',
    renderMenu: false,
    component: Search
  }, {
    key: 6,
    title: '用户管理',
    path: '/user',
    get renderMenu() {
      return (
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity !== 2 &&
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity !== 5 &&
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity !== 1
      )
    },
    component: UserList,
  }, {
    key: 3,
    title: '医院管理',
    path: '/manager',
    get renderMenu() {
      return (
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity !== 2 &&
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity !== 5 &&
        //@ts-ignore
        JSON.parse(sessionStorage.getItem('auth')).role.identity !== 1
      )
    },
    routes: [
      {
        key: 4,
        title: '添加医院',
        path: '/manager/addHospital',
        component: HospitalList,
        get renderMenu() {
          //@ts-ignore
          return JSON.parse(sessionStorage.getItem('auth')).role.identity === 4
        },
      },
      {
        key: 5,
        title: '生化指标',
        path: '/manager/quota',
        component: quota,
        renderMenu: true,
      },
    ]
  }, {
    key: 7,
    title: '登录',
    path: '/logon',
    renderMenu: false,
    component: Login,
  }
]