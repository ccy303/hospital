import Fetch from './fetch';
class Api extends Fetch {
  login(parmas: any) {
    return this.fetch('post', '/auth/login', parmas)
  }

  addHospital(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    return this.fetch('post', '/super-admin/hospital/create', parmas)
  }

  getHospitalList() {
    //@ts-ignore
    let token = this.token
    return this.fetch('get', `/hospitals?token=${token}`)
  }

  setPatient(parmas: any) {
    parmas = Object.assign(
      {},
      { token: this.token },
      parmas
    )
    let url = '';
    if (this.identity === 4) {
      url = '/super-admin/user/create'
    }
    if (this.identity === 2) {
      url = '/hospital-editor/user/create'
    }
    if (this.identity === 5) {
      url = '/hospital-nurse/user/create'
    }
    return this.fetch('post', url, parmas)
  }

  getIndicators(parmas?: any) {
    //@ts-ignore
    let token = this.token
    let url = `/indicators?token=${token}`
    if (parmas) {
      url += `&hospitalId=${parmas}`
    }
    return this.fetch('get', url)
  }

  setIndicator(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    //@ts-ignore
    let url = JSON.parse(sessionStorage.getItem('auth')).role.identity === 4 ?
      '/super-admin/indicator/set' :
      '/hospital-admin/indicator/set'
    return this.fetch('post', url, parmas)
  }

  setEditor(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    //@ts-ignore
    let url = JSON.parse(sessionStorage.getItem('auth')).role.identity === 4 ?
      '/super-admin/hospital-editor/create' :
      '/hospital-admin/hospital-editor/create'
    return this.fetch('post', url, parmas)
  }

  getEditorList(parmas?: any) {
    //@ts-ignore
    let token = this.token
    let url = ''
    if (this.identity === 4) {
      url = `/super-admin/hospital-editors?token=${token}`;
    }
    if (this.identity === 3) {
      url = `/hospital-admin/hospital-editors?token=${token}`;
    }
    if (this.identity === 1) {
      url = `/customer-service/hospital-editors?token=${token}`;
    }
    if (parmas) {
      url += `&hospitalId=${parmas}`
    }
    return this.fetch('get', url)
  }

  updataEditor(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    let url = ''
    if (this.identity === 4) {
      url = `/super-admin/hospital-editor/modify`;
    }
    if (this.identity === 3) {
      url = `/hospital-admin/hospital-editor/modify`;
    }
    return this.fetch('post', url, parmas)
  }

  setCustomer(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    return this.fetch('post', '/super-admin/customer-service/create', parmas)
  }

  updataCustomer(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    return this.fetch('post', '/super-admin/customer-service/modify', parmas)
  }

  customerList(parmas: any) {
    let token = this.token
    let url = ''
    url = `/super-admin/customer-services?token=${token}`;
    if (parmas) {
      url += `&hospitalId=${parmas}`
    }
    return this.fetch('get', url)
  }

  setHospitalManager(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    return this.fetch('post', '/super-admin/hospital-admin/create', parmas)
  }

  getHospitalManagerLis(parmas?: any) {
    //@ts-ignore
    let token = this.token
    let url = ''
    if (this.identity === 4) {
      url = `/super-admin/hospital-admins?token=${token}`;
    }
    if (this.identity === 1) {
      url = `/customer-service/hospital-admins?token=${token}`;
    }
    if (parmas) {
      url += `&hospitalId=${parmas}`
    }
    return this.fetch('get', url)
  }

  updataHospitalManager(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    return this.fetch('post', '/super-admin/hospital-admin/modify', parmas)
  }

  setNurse(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    return this.fetch('post', '/super-admin/hospital-nurse/create', parmas)
  }

  getNurse(parmas?: any) {
    //@ts-ignore
    let token = this.token
    let url = ''
    if (this.identity === 4) {
      url = `/super-admin/hospital-nurses?token=${token}`;
    }
    if (this.identity === 1) {
      url = `/customer-service/hospital-nurses?token=${token}`;
    }
    if (parmas) {
      url += `&hospitalId=${parmas}`
    }
    return this.fetch('get', url)
  }

  updataNurse(parmas: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    return this.fetch('post', '/super-admin/hospital-nurse/modify', parmas)
  }

  userSearch(parmas: any) {//病人查询
    let url = ''
    let token = this.token
    if (this.identity === 4) {
      url = `/super-admin/user/query?token=${token}`
    }
    if (this.identity === 2) {
      url = `/hospital-editor/user/query?token=${token}`
    }
    if (this.identity === 5) {
      url = `/hospital-nurse/user/query?token=${token}`
    }
    if (this.identity === 1) {
      url = `/customer-service/user/query?token=${token}`
    }
    if (this.identity === 3) {
      url = `/hospital-admin/user/query?token=${token}`
    }
    for (let k in parmas) {
      parmas[k] && (url += `&${k}=${parmas[k]}`)
    }
    return this.fetch('get', url)
  }

  patientDetail(parmas: any) {
    let token = this.token
    let url = ``;
    if (this.identity === 4) {
      url = `/super-admin/user/${parmas}/detail?token=${token}`
    }
    if (this.identity === 2) {
      url = `/hospital-editor/user/${parmas}/detail?token=${token}`
    }
    if (this.identity === 5) {
      url = `/hospital-nurse/user/${parmas}/detail?token=${token}`
    }
    if (this.identity === 1) {
      url = `/customer-service/user/${parmas}/detail?token=${token}`
    }
    if (this.identity === 3) {
      url = `/hospital-admin/user/${parmas}/detail?token=${token}`
    }
    return this.fetch('get', url)
  }

  nutritionScreeningSave(parmas: any, id: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    let url = ``
    if (this.identity === 4) {
      url = `/super-admin/user/${id}/risk-screening/update`
    }
    if (this.identity === 5) {
      url = `/hospital-nurse/user/${id}/risk-screening/update`
    }
    return this.fetch('post', url, parmas)
  }

  nutritionScreeningGet(id: any) {
    //@ts-ignore
    let token = this.token
    let url = ''
    if (this.identity === 4) {
      url = `/super-admin/user/${id}/risk-screening?token=${token}`;
    }
    if (this.identity === 5) {
      url = `/hospital-nurse/user/${id}/risk-screening?token=${token}`;
    }
    if (this.identity === 1) {
      url = `/customer-service/user/${id}/risk-screening?token=${token}`;
    }
    if (this.identity === 3) {
      url = `/hospital-admin/user/${id}/risk-screening?token=${token}`;
    }
    return this.fetch('get', url)
  }

  treatmentSheetGet(id: any) {
    let token = this.token
    let url = ''
    if (this.identity === 4) {
      url = `/super-admin/user/${id}/treatment?token=${token}`;
    }
    if (this.identity === 2) {
      url = `/hospital-editor/user/${id}/treatment?token=${token}`;
    }
    if (this.identity === 1) {
      url = `/customer-service/user/${id}/treatment?token=${token}`;
    }
    if (this.identity === 3) {
      url = `/hospital-admin/user/${id}/treatment?token=${token}`;
    }
    return this.fetch('get', url)
  }

  treatmentSheetSave(parmas: any, id: any) {
    parmas = Object.assign(
      {},
      //@ts-ignore
      { token: this.token },
      parmas
    )
    let url = ``
    if (this.identity === 4) {
      url = `/super-admin/user/${id}/treatment/update`
    }
    if (this.identity === 2) {
      url = `/hospital-editor/user/${id}/treatment/update`;
    }
    return this.fetch('post', url, parmas)
  }

  delHospital(id: any) {
    let url = `/super-admin/hospital/${id}/delete?token=${this.token}`;
    return this.fetch('DELETE', url)
  }

  delPatient(id: any) {
    let url = `/super-admin/user/${id}?token=${this.token}`;
    return this.fetch('DELETE', url)
  }

}

export default new Api()