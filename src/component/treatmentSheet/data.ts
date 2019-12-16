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
    _projact: [
      // [
      //   '12', '123', '', '', '', '', '', '', '', '',
      //   '消化道症状', '用法', '液量(mL)', '蛋白质/能量', '费用/天',
      //   '白细胞', '淋巴细胞', '血红蛋白', '总蛋白', '白蛋白', '前白蛋白', '谷丙转氨酶',
      //   '谷草转氨酶', '尿素', '肌酐', '尿酸', '钙', '葡萄糖',
      //   '总胆固醇', '甘油三酯', 'LDL', 'hs-CRP', '', '', '',
      // ], [
      //   '123', '124', '', '', '', '', '', '', '', '',
      //   '消化道症状', '用法', '液量(mL)', '蛋白质/能量', '费用/天',
      //   '白细胞', '淋巴细胞', '血红蛋白', '总蛋白', '白蛋白', '前白蛋白', '谷丙转氨酶',
      //   '谷草转氨酶', '尿素', '肌酐', '尿酸', '钙', '葡萄糖',
      //   '总胆固醇', '甘油三酯', 'LDL', 'hs-CRP', '', '', '',
      // ]
    ],
    get project() {
      if (this._projact.length) {
        return this._projact
      } else {
        let pro = new Array();
        pro.push([...this.pro_language[this.language]])
        return pro
      }
    },
    set project(val: any) {
      let pro: any = new Array(val.length);
      if (this.language == 'cn') {
        for (let i = 0; i < val.length; i++) {
          if (!pro[i]) { pro[i] = new Array() }
          val[i].map((val: any, key: any) => {
            (val || val == '') && !this.pro_language.cn[key] && pro[i].push(val);
            val && this.pro_language.cn[key] && pro[i].push(this.pro_language.cn[key]);
          })
        }
      } else {
        for (let i = 0; i < val.length; i++) {
          if (!pro[i]) { pro[i] = new Array() }
          val[i].map((val: any, key: any) => {
            (val || val == '') && !this.pro_language.en[key] && pro[i].push(val);
            val && this.pro_language.en[key] && pro[i].push(this.pro_language.en[key]);
          })
        }

      }
      this._projact = pro
    },
    get data() {
      if (this._data.length) {
        return this._data
      } else {
        return [{}]
      }
    },
    set data(val: any) {
      let data = new Array(val.length)
      if (this.language === 'cn') {
        for (let i = 0; i < val.length; i++) {
          if (!data[i]) {
            data[i] = new Object();
          }
          for (let key in val[i]) {
            for (let [k, v] of this._languageMap.entries()) {
              if (key === k || key === v) {
                data[i][k] = val[i][key]
              } else {
                data[i][key] = val[i][key]
              }
            }
          }
        }
      } else {
        for (let i = 0; i < val.length; i++) {
          if (!data[i]) {
            data[i] = new Object();
          }
          for (let key in val[i]) {
            if (this._languageMap.get(key)) {
              data[i][this._languageMap.get(key)] = val[i][key]
            } else {
              data[i][key] = val[i][key]
            }
          }
        }
      }
      this._data = data
    },
    _data: [
      // {
      //   "12": "2019-12-01,12|2019-12-02,1|2019-12-03,10",
      //   "123": "2019-12-01,|2019-12-02,|2019-12-03,",
      //   "LDL": "2019-12-01,|2019-12-02,|2019-12-03,",
      //   "hs-CRP": "2019-12-01,|2019-12-02,|2019-12-03,",
      //   "前白蛋白": "2019-12-01,|2019-12-02,|2019-12-03,",
      //   "尿素": "2019-12-01,|2019-12-02,|2019-12-03,",
      //   "尿酸": "2019-12-01,|2019-12-02,|2019-12-03,",
      //   "总胆固醇": "2019-12-01,12|2019-12-02,1|2019-12-03,3",
      //   "总蛋白": "2019-12-01,|2019-12-02,|2019-12-03,",
      //   "消化道症状": "2019-12-01,12|2019-12-02,1|2019-12-03,10",
      //   "液量(mL)": "2019-12-01,12|2019-12-02,|2019-12-03,",
      // }, {
      //   "123": "2019-12-07,|2019-12-02,|2019-12-03,",
      //   "124": "2019-12-07,12|2019-12-02,1|2019-12-03,10",
      //   "LDL": "2019-12-07,|2019-12-02,|2019-12-03,",
      //   "hs-CRP": "2019-12-07,|2019-12-02,|2019-12-03,",
      //   "前白蛋白": "2019-12-07,|2019-12-02,|2019-12-03,",
      //   "尿素": "2019-12-07,|2019-12-02,|2019-12-03,",
      //   "尿酸": "2019-12-07,|2019-12-02,|2019-12-03,",
      //   "总胆固醇": "2019-12-07,12|2019-12-02,1|2019-12-03,3",
      //   "总蛋白": "2019-12-07,|2019-12-02,|2019-12-03,",
      //   "消化道症状": "2019-12-07,12|2019-12-02,1|2019-12-03,10",
      //   "液量(mL)": "2019-12-07,12|2019-12-02,|2019-12-03,",
      // }
    ]
  }
  fontMateTable: any = {}
  fontMateTableData() {
    let fontMateTable: any = {}
    fontMateTable.project = [...this.table.project]
    let tableData: any = []
    let project_data: any = new Array(this.table.project.length); // 有数据的项目
    let timerArr: any = new Array(this.table.project.length)
    let callGetProEnData: any = new Array(this.table.project.length)
    for (let i = 0; i < this.table.project.length; i++) {
      let arr: any = [];
      project_data[i] = Object.keys(this.table.data[i])[0] ? this.table.data[i][Object.keys(this.table.data[i])[0]].split('|') : []
      project_data[i].forEach((val: any) => {
        if (!timerArr[i]) {
          timerArr[i] = new Array()
        }
        timerArr[i].push(val.split(',')[0])
      })
      if (timerArr[i]) {
        while (timerArr[i].length < 9) {
          timerArr[i].push('')
        }
      } else {
        timerArr[i] = new Array()
        while (timerArr[i].length < 9) {
          timerArr[i].push('')
        }
      }
      this.table.project[i].forEach((val: any) => {
        let data = this.table.data[i][val];
        if (data) {
          data = data.split('|');
          while (data.length < 9) {
            data.push('')
          }
        } else {
          data = new Array(9).fill('')
        }
        project_data[i].map((v: any, index: number) => {
          if (!data[index].split(',')[0]) {
            data[index] = `${v.split(',')[0]},`
          }
        })
        arr.push({
          key: val,
          data: data,
          id: Math.random()
        })
      })
      callGetProEnData[i] = arr.slice(0, 10);
      tableData.push(arr)
    }
    fontMateTable.data = [...tableData]
    fontMateTable.callGetProEnData = callGetProEnData
    fontMateTable.timerArr = timerArr
    this.fontMateTable = fontMateTable
    return fontMateTable
  }

  newTable() {
    let pro = JSON.parse(JSON.stringify(this.table.project))
    let data = JSON.parse(JSON.stringify(this.table.data))
    pro.push([...this.table.pro_language[this.table.language]])
    data.push(new Object())
    this.table.project = pro;
    this.table.data = data;
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
    let data: any = new Array(fontMateTable.data.length);
    for (let i = 0; i < fontMateTable.data.length; i++) {
      if (!data[i]) { data[i] = new Object() }
      fontMateTable.data[i].forEach((val: any) => {
        if (val.key) {
          data[i][val.key] = val.data.join('|')
        }
      })
    }
    obj.table = {
      language: this.table.language,
      project: fontMateTable.project,
      data: data
    }
    console.log(JSON.stringify(obj))
    return JSON.stringify(obj)
  }

  updataData() {
    let project: any = new Array(this.table.project.length)
    let data: any = new Array(this.table.data.length)
    for (let i = 0; i < this.fontMateTable.data.length; i++) {
      this.fontMateTable.data[i].forEach((val: any) => {
        if (!project[i]) {
          project[i] = new Array();
        }
        project[i].push(val.key)
        if (!data[i]) {
          data[i] = new Object()
        }
        if (val.key) {
          data[i][val.key] = val.data.join('|')
        }
      })
    }
    this.table.project = project
    this.table.data = data
  }
}