export default class Data {
  constructor(obj: any, reviewData: any, changeLanguage?: any) {
    changeLanguage && (this.table.language = changeLanguage)
    if (obj && !reviewData) {
      this.name = obj.fullName;
      this.sex = obj.gender == 0 ? '男' : '女'
      this.age = obj.age
      this.hospitalizationNum = obj.hospitalizationNumber
    }
    if (obj && reviewData) {
      this.setData(obj)
    }
  }
  title: string = '营养治疗单'
  name: string = '';
  sex: string = '';
  age: string = '';
  bedNum: string = ''; //床号
  hospitalizationNum: string = ''; //住院号
  department: string = ''; //科室
  mainDiagnosis: string = ''; //主要诊断
  parenteralNutritionEnergy: object = {//肠外营养
    energy: '',
    PRO: '',
    FAT: '',
    CHO: '',
  };
  dietarySurvey: string = '' //膳食调查
  inEnergy: object = {//摄入能量
    energy: '',
    PRO: '',
    FAT: '',
    CHO: '',
  };
  height: number | string = ''
  weight: number | string = ''
  BMI: number | string = ''
  needEnergy: object = {//需要能量
    energy: '',
    PRO: '',
    FAT: '',
    CHO: '',
  }
  waist: number | string = '' //腰围
  hip: number | string = '' //臀围
  upperArm: number | string = '' //上臂围
  lowerLeg: number | string = ''; //小腿围
  skinFoldThickness: number | string = ''; //皮褶厚度  
  gripStrength: number | string = '' //握力
  lactoseIntolerance: boolean | string = false // 填了 是true 否 false
  pleuralEffusion: boolean | string = false; // 填了 是true 否 false
  pancreaticFluid: boolean | string = false; // 填了 是true 否 false
  NutritionDiagnosis: object = {//营养诊断
    options: [
      {
        text: '蛋白质营养不良',
        _opt: ['轻', '中', '重'],
        select1: false, // true | false
        select2: 0, //  _opt 下标 
      },
      {
        text: '热能营养不良',
        _opt: ['轻', '中', '重'],
        select1: false, // true | false
        select2: 0, //  _opt 下标 
      },
      {
        text: '贫血',
        _opt: ['轻', '中', '重'],
        select1: false, // true | false
        select2: 0, //  _opt 下标 
      },
      {
        text: '超重',
        select1: false, // true | false
      },
      {
        text: '肥胖',
        select1: false, // true | false
      }
    ],
  };

  table: any = {
    language: 'cn',
    pro_language: {
      cn: [
        '', '', '', '', '', '', '', '', '', '',
        '消化道症状', '用法', '液量(mL)', '蛋白质/能量', '费用/天',
        '白细胞', '淋巴细胞', '血红蛋白', '总蛋白', '白蛋白', '前白蛋白', '谷丙转氨酶',
        '谷草转氨酶', '尿素', '肌酐', '尿酸', '钙', '葡萄糖',
        '总胆固醇', '甘油三酯', 'LDL', 'hs-CRP', '', '', '',
      ],
      en: [
        '', '', '', '', '', '', '', '', '', '',
        'DI Symptoms', 'USAGE', 'fl(mL)', 'PRO/EN', '￥/D',
        'WBC', 'LYM', 'HGB', 'TP', 'ALB', 'PA', 'ALT',
        'AST', 'UREA', 'CREA', 'UA', 'Ca', 'GLU',
        'TC', 'TG', 'LDL', 'hs-CRP', '', '', '',
      ],
    },
    //@ts-ignore
    _languageMap: new Map([
      ['消化道症状', 'DI Symptoms'], ['用法', 'USAGE'], ['液量(mL)', 'fl(mL)'], ['蛋白质/能量', 'PRO/EN'], ['费用/天', '￥/D'],
      ['白细胞', 'WBC'], ['淋巴细胞', 'LYM'], ['血红蛋白', 'HGB'], ['总蛋白', 'TP'], ['白蛋白', 'ALB'], ['前白蛋白', 'PA'], ['谷丙转氨酶', 'ALT'],
      ['谷草转氨酶', 'AST'], ['尿素', 'UREA'], ['肌酐', 'CREA'], ['尿酸', 'UA'], ['钙', 'Ca'], ['葡萄糖', 'GLU'],
      ['总胆固醇', 'TC'], ['甘油三酯', 'TG']
    ]),
    _projact: [],
    get project() {
      return this._projact.length ? this._projact : this.pro_language[this.language]
    },
    set project(val: any) {
      let pro: any = [];
      if (this.language == 'cn') {
        val.map((val: any, i: any) => {
          (val || val == '') && !this.pro_language.cn[i] && pro.push(val);
          val && this.pro_language.cn[i] && pro.push(this.pro_language.cn[i]);
        })
      } else {
        val.map((val: any, i: any) => {
          (val || val == '') && !this.pro_language.en[i] && pro.push(val);
          val && this.pro_language.en[i] && pro.push(this.pro_language.en[i]);
        })
      }
      this._projact = pro
    },
    get data() {
      return this._data
    },
    set data(val: any) {
      if (this.language === 'cn') {
        let obj: any = {};
        for (let key in val) {
          let i = 0;
          for (let [k, v] of this._languageMap.entries()) {
            i++;
            if (key === k || key === v) {
              i = 0;
              obj[k] = val[key]
            } else if (i === this._languageMap.size) {
              obj[key] = val[key]
            }
          }
        }
        this._data = obj
      } else {
        let obj: any = {};
        for (let key in val) {
          if (this._languageMap.get(key)) {
            obj[this._languageMap.get(key)] = val[key]
          } else {
            obj[key] = val[key]
          }
        }
        this._data = obj
      }
    },
    _data: {
    }
  }
  fontMateTable: any = {}
  fontMateTableData() {
    let fontMateTable: any = {}
    fontMateTable.project = [...this.table.project]
    let data: any = []
    this.table.project.map((val: any) => {
      data.push({
        key: val,
        data: [],
        id: Math.random()
      })
    })
    //处理现有数据
    if (this.table.data && Object.keys(this.table.data).length) {
      for (let key in this.table.data) {
        let index = data.findIndex((val: any) => { // 对应项目数组下标
          return val.key == key
        })
        let arr = this.table.data[key].split('|')
        let newArr = new Array();
        for (let i = 0; i < Math.ceil(arr.length / 9); i++) { //切割为每9列一组
          let sliceArr = []
          if (arr.length - i * 9 > 9) {
            sliceArr = arr.slice(i * 9, 9)
          } else {
            sliceArr = arr.slice(i * 9)
          }
          while (sliceArr.length < 9) {
            sliceArr.push('')
          }
          newArr.push([...sliceArr])
          fontMateTable.page = i + 1;
        }
        data[index].data = newArr;
      }
    } else {
      data.map((item: any) => {
        item.data.push(new Array(9).fill(''))
      })
    }
    fontMateTable.data = [...data]
    let project_data = fontMateTable.data.find((val: any) => { return val.data.length > 0 });
    let timerArr: any = []
    project_data.data.map((data_val: any) => {
      let _arr: any = [];
      let empty_data: any = [];
      data_val.map((data_item: any) => {
        _arr.push(data_item.split(',')[0])
        empty_data.push(`${data_item.split(',')[0]},`)
      })
      while (_arr.length < 9) {
        _arr.push('')
      }
      while (empty_data.length < 9) {
        empty_data.push('')
      }
      fontMateTable.data.map((data: any) => {
        data.data.length < project_data.data.length && data.data.push([...empty_data])
      })
      timerArr.push([..._arr])
    })
    //填写时间
    fontMateTable.data.map((pro: any) => {
      pro.data.map((data: any, index: any) => {
        data.map((dataItem: any, dataItem_i: any) => {
          let time = dataItem.split(',')[0];
          !timerArr[index][dataItem_i] && (timerArr[index][dataItem_i] = time)
        })
      })
    })
    fontMateTable.timerArr = timerArr
    !fontMateTable.page && (fontMateTable.page = 1)
    this.fontMateTable = fontMateTable
    return fontMateTable
  }

  newTable() {
    let fontMateTable: any = {}
    fontMateTable.project = [...this.table.project]
    let data: any = []
    this.table.project.map((val: any) => {
      data.push({
        key: val,
        data: [],
        id: Math.random()
      })
    })
  }

  setData(obj: any) {
    for (let key in obj) {
      if (key === 'table') {
        this.table.data = obj[key].data;
        this.table.language = obj[key].language || 'cn';
        this.table.project = obj[key].project;
      } else if (key === 'sex') {
        //@ts-ignore
        this.sex = obj[key] == 0 || obj[key] == '男' ? '男' : '女'
      } else if (key === 'title') {
        this[key] = obj[key]
      } else {
        //@ts-ignore
        this[key] = obj[key]
      }
    }
  }

  getPostJson() {
    let obj = JSON.parse(JSON.stringify(this))
    let fontMateTable = Object.assign({}, this.fontMateTable)
    delete obj.table;
    delete obj.fontMateTable;
    let project: any = []
    let data: any = {}
    fontMateTable.data.map((val: any) => {
      project.push(val.key)
      val.key && (data[val.key] = [].concat(...val.data).join('|'))
    })
    obj.table = {
      language: this.table.language,
      project: project,
      data: data
    }
    return JSON.stringify(obj)
  }

  updataData() {
    let project: any = []
    let data: any = {}
    this.fontMateTable.data.map((val: any) => {
      project.push(val.key)
      val.key && (data[val.key] = [].concat(...val.data).join('|'))
    })
    this.table = {
      project: project,
      data: data
    }
  }
}