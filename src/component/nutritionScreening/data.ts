export default class Data {

  constructor(obj: any, reviewData: any) {
    if (obj && !reviewData) {
      this.name = obj.fullName;
      this.sex = obj.gender == 0 ? '男' : '女'
      this.age = obj.age
    }
    if (obj && reviewData) {
      this.setData(obj)
    }
  }

  department: string = ''; //科室
  name: string = '';
  sex: string = '';
  age: string = '';
  _weight: string | number = '';
  _height: string | number = '';
  diagnosis: string = ''; //疾病诊断
  operationDate: string = ''; //手术日期
  assessDate: string = ''; //测评日期
  inHospitalDate: string = '' //住院日期
  diseaseScore: any = { //疾病评分
    option1: [
      { name: '髋骨折', select: false },
      { name: '慢性疾病急性发作或有并发症者', select: false },
      { name: 'COPD', select: false },
      { name: '血液透析', select: false },
      { name: '肝硬化', select: false },
      { name: '一般恶性肿瘤患者', select: false },
      { name: '糖尿病', select: false },
    ],
    option2: [
      { name: '腹部大手术', select: false },
      { name: '脑卒中', select: false },
      { name: '重度肺炎', select: false },
      { name: '血液恶性肿瘤', select: false },
    ],
    option3: [
      { name: '颅脑损伤', select: false },
      { name: '骨髓移植', select: false },
    ],
    _totalScore: '',
    get totalScore() {
      if (this._totalScore) { return this._totalScore }
      if (this.option3.findIndex((val: any) => { return val.select }) != -1) { return 3 }
      if (this.option2.findIndex((val: any) => { return val.select }) != -1) { return 2 }
      if (this.option1.findIndex((val: any) => { return val.select }) != -1) { return 1 }
      return 0
    }
  }

  set height(val: any) {
    this._height = val;
    this.nutritionalStatus.option1.BMI = Number(this._weight) / Math.pow(Number(this._height), 2)
  }

  get height() {
    return this._height
  }

  set weight(val: any) {
    this._weight = val;
    this.nutritionalStatus.option1.BMI = Number(this._weight) / Math.pow(Number(this._height), 2)
  }

  get weight() {
    return this._weight
  }

  nutritionalStatus: any = {//营养状态
    option1: {
      _BMI: '', // BIM
      get BMI() {
        return this._BMI ? this._BMI : ''
      },
      set BMI(val: any) {
        if (!isNaN(val) && val) {
          this._BMI = Number(val).toFixed(2)
        } else {
          this._BMI = ''
        }
      },
      _albumin: '', //用白蛋白代替
      get albumin() {
        return this._albumin ? this._albumin : ''
      },
      set albumin(val) {
        this._albumin = val
      },
      get score() {
        if (this._BMI == '' && this._albumin == '') { return '' }
        if (Number(this._BMI) < 18.5 && this._BMI !== '') {
          return 3
        } else if (Number(this._BMI) >= 18.5) {
          return 0
        }
        if (Number(this._albumin) < 30 && this._albumin !== '') {
          return 3
        } else if (Number(this._albumin) >= 30) {
          return 0
        }
      }
    },
    option2: {
      options: [
        { text: '3个月内(1分)', select: false },
        { text: '2个月内(2分)', select: false },
        { text: '1个月内(3分)', select: false },
      ],
      select: null,
      get score() {
        return this.select != null ? Number(this.select) + 1 : 0
      }
    },
    option3: {
      options: [
        { text: '25%-50%(1分)', select: false },
        { text: '51%-75%(2分)', select: false },
        { text: '76%-100%(3分)', select: false },
      ],
      select: null,
      get score() {
        return this.select != null ? Number(this.select) + 1 : 0
      }
    },
    _totalScore: '',
    get totalScore() {
      let scoreArr: Array<any> = [];
      scoreArr.push(this.option1.score)
      scoreArr.push(this.option2.score)
      scoreArr.push(this.option3.score)
      let score = scoreArr.sort((a, b) => { return b - a })[0]
      return score != 0 ? score : 0
    }
  }

  get ageScore() {
    if (this.age == '') return ''
    return Number(this.age) >= 70 ? 1 : 0
  }

  get totalScore() {
    return Number(this.ageScore) +
      Number(this.nutritionalStatus.totalScore) +
      Number(this.diseaseScore.totalScore)
  }

  screeningPeople: string = '' // 筛查者签名
  screeningDate: string = '' // 筛查时间

  getPostJson() {
    let obj: any = {};
    obj.department = this.department
    obj.name = this.name
    obj.sex = this.sex
    obj.age = Number(this.age)
    obj.weight = this._weight
    obj.height = this._height
    obj.diagnosis = this.diagnosis
    obj.operationDate = this.operationDate
    obj.assessDate = this.assessDate
    obj.inHospitalDate = this.inHospitalDate
    obj.diseaseScore = {}
    obj.diseaseScore.option1 = this.diseaseScore.option1
    obj.diseaseScore.option2 = this.diseaseScore.option2
    obj.diseaseScore.option3 = this.diseaseScore.option3
    obj.diseaseScore.totalScore = this.diseaseScore.totalScore
    obj.nutritionalStatus = {
      option1: {},
      option2: {},
      option3: {},
    }
    obj.nutritionalStatus.option1 = {
      BMI: this.nutritionalStatus.option1.BMI,
      albumin: this.nutritionalStatus.option1.albumin,
      score: this.nutritionalStatus.option1.score,
    }
    obj.nutritionalStatus.option2 = {
      options: this.nutritionalStatus.option2.options,
      select: this.nutritionalStatus.option2.select,
      score: this.nutritionalStatus.option2.score,
    }
    obj.nutritionalStatus.option3 = {
      options: this.nutritionalStatus.option3.options,
      select: this.nutritionalStatus.option3.select,
      score: this.nutritionalStatus.option3.score,
    }
    obj.nutritionalStatus.totalScore = this.nutritionalStatus.totalScore
    obj.ageScore = this.ageScore
    obj.totalScore = this.totalScore
    obj.screeningPeople = this.screeningPeople
    obj.screeningDate = this.screeningDate
    return JSON.stringify(obj)
  }

  setData(obj: any) {
    this.age = obj.age;
    this.assessDate = obj.assessDate;
    this.department = obj.department;
    this.diagnosis = obj.diagnosis;
    this.height = obj.height;
    this.name = obj.name;
    this.operationDate = obj.operationDate;
    this.screeningPeople = obj.screeningPeople;
    this.screeningDate = obj.screeningDate;
    this.screeningDate = obj.screeningDate;
    this.inHospitalDate = obj.inHospitalDate;
    this.weight = obj.weight;
    this.sex = obj.sex == 0 ? '男' : '女';
    this.diseaseScore.option1 = obj.diseaseScore.option1;
    this.diseaseScore.option2 = obj.diseaseScore.option2;
    this.diseaseScore.option3 = obj.diseaseScore.option3;
    this.nutritionalStatus.option1.BMI = obj.nutritionalStatus.option1.BMI
    this.nutritionalStatus.option1.albumin = obj.nutritionalStatus.option1.albumin
    this.nutritionalStatus.option2.options = obj.nutritionalStatus.option2.options
    this.nutritionalStatus.option2.select = obj.nutritionalStatus.option2.select
    this.nutritionalStatus.option3.options = obj.nutritionalStatus.option3.options
    this.nutritionalStatus.option3.select = obj.nutritionalStatus.option3.select
  }
}