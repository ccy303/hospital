export function getProEn(inputItems) {
  const projectSettings = [{
    "\u54c1\u540d": "\u5747\u8861\u6027\u5168\u8425\u517b\u7d20",
    "\u7b80\u79f0": "LJH",
    "Pro": "13.6 ",
    "Fat": "28.6 ",
    "Cho": "55.8 ",
    "\u80fd\u91cf\u5bc6\u5ea6": "4.4",
    "Na": "2",
    "K": "1.6",
    "Ca": "3.5",
    "DF": "0.03",
    "DHA": "0"
  }, {
    "\u54c1\u540d": "\u4f0a\u5168\u7d20",
    "\u7b80\u79f0": "HJH",
    "Pro": "17.0 ",
    "Fat": "23.4 ",
    "Cho": "56.8 ",
    "\u80fd\u91cf\u5bc6\u5ea6": "4.23",
    "Na": "3.1",
    "K": "4.8",
    "Ca": "2.88",
    "DF": "0.04",
    "DHA": ""
  }, {
    "\u54c1\u540d": "\u9ea6\u9a8f",
    "\u7b80\u79f0": "MJ",
    "Pro": "16.0 ",
    "Fat": "60.4 ",
    "Cho": "23.6 ",
    "\u80fd\u91cf\u5bc6\u5ea6": "400kcal\/\u76d2",
    "Na": "",
    "K": "",
    "Ca": "",
    "DF": "",
    "DHA": ""
  }, {
    "\u54c1\u540d": "\u7545\u6e05",
    "\u7b80\u79f0": "MCQ",
    "Pro": "17.9 ",
    "Fat": "30.5 ",
    "Cho": "51.0 ",
    "\u80fd\u91cf\u5bc6\u5ea6": "4.45",
    "Na": "4",
    "K": "0",
    "Ca": "3",
    "DF": "",
    "DHA": ""
  }, {
    "\u54c1\u540d": "\u672f\u548c", "\u7b80\u79f0": "MSH", "Pro": "63.0 ", "Fat": "6.6 ", "Cho": "26.8 ", "\u80fd\u91cf\u5bc6\u5ea6": "3.8", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u77ed\u80bd\u578b\u8425\u517b\u7d20", "\u7b80\u79f0": "LDT", "Pro": "14.5 ", "Fat": "14.6 ", "Cho": "69.9 ", "\u80fd\u91cf\u5bc6\u5ea6": "4.14", "Na": "3", "K": "6.2", "Ca": "0.8", "DF": "0", "DHA": ""
  }, {
    "\u54c1\u540d": "\u4f4e\u86cb\u767d\u5168\u8425\u517b\u7d20", "\u7b80\u79f0": "LLP", "Pro": "8.0 ", "Fat": "31.0 ", "Cho": "61.0 ", "\u80fd\u91cf\u5bc6\u5ea6": "4.42", "Na": "1.2", "K": "0", "Ca": "3.3", "DF": "0.045", "DHA": ""
  }, {
    "\u54c1\u540d": "\u652f\u94fe\u6c28\u57fa\u9178\u5168\u8425\u517b\u7d20", "\u7b80\u79f0": "LBA", "Pro": "21.0 ", "Fat": "28.0 ", "Cho": "51.0 ", "\u80fd\u91cf\u5bc6\u5ea6": "4.26", "Na": "1.5", "K": "1.2", "Ca": "3.5", "DF": "0.03", "DHA": ""
  }, {
    "\u54c1\u540d": "\u4f0a\u652f\u7d20", "\u7b80\u79f0": "HBA", "Pro": "10.8 ", "Fat": "8.7 ", "Cho": "77.4 ", "\u80fd\u91cf\u5bc6\u5ea6": "4.13", "Na": "1.57", "K": "4.6", "Ca": "2.5", "DF": "0.04", "DHA": ""
  }, {
    "\u54c1\u540d": "\u4f0a\u7cd6\u7d20", "\u7b80\u79f0": "HGI", "Pro": "16.9 ", "Fat": "40.0 ", "Cho": "38.4 ", "\u80fd\u91cf\u5bc6\u5ea6": "4.5", "Na": "4.22", "K": "4.8", "Ca": "2.7", "DF": "0.1", "DHA": ""
  }, {
    "\u54c1\u540d": "\u4f4eGI\u5168\u8425\u517b\u7d20", "\u7b80\u79f0": "LGI", "Pro": "19.4 ", "Fat": "31.5 ", "Cho": "46.0 ", "\u80fd\u91cf\u5bc6\u5ea6": "4.43", "Na": "2", "K": "1.5", "Ca": "4.2", "DF": "0.06", "DHA": ""
  }, {
    "\u54c1\u540d": "\u6d53\u7f29\u4e73\u6e05\u86cb\u767d\u7c89", "\u7b80\u79f0": "LP", "Pro": "81.3 ", "Fat": "11.4 ", "Cho": "6.1 ", "\u80fd\u91cf\u5bc6\u5ea6": "4", "Na": "4", "K": "0", "Ca": "0", "DF": "0", "DHA": ""
  }, {
    "\u54c1\u540d": "\u529b\u6108", "\u7b80\u79f0": "LHP", "Pro": "39.7 ", "Fat": "27.8 ", "Cho": "31.8 ", "\u80fd\u91cf\u5bc6\u5ea6": "4.52", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u5927\u8c46\u86cb\u767d\u7c89", "\u7b80\u79f0": "SP", "Pro": "92.5 ", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "4", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u590d\u914d\u4e73\u6e05\u86cb\u767d\u7c89", "\u7b80\u79f0": "HP", "Pro": "83.8 ", "Fat": "11.3 ", "Cho": "3.6 ", "\u80fd\u91cf\u5bc6\u5ea6": "3.82", "Na": "1.52", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u6d66\u7d22\u86cb\u767d\u7c89", "\u7b80\u79f0": "MP", "Pro": "95.8 ", "Fat": "2.7 ", "Cho": "0.0 ", "\u80fd\u91cf\u5bc6\u5ea6": "3.33", "Na": "5.33", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u7ef4\u751f\u7d20\u7ec4\u4ef6", "\u7b80\u79f0": "LVt", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u6c34\u6eb6\u6027\u7ef4\u751f\u7d20\u7ec4\u4ef6", "\u7b80\u79f0": "WVt", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u76ca\u751f\u83cc\u9897\u7c92", "\u7b80\u79f0": "LBi", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u7545\u900f", "\u7b80\u79f0": "MCT", "Pro": "0.0 ", "Fat": "0.0 ", "Cho": "20.7 ", "\u80fd\u91cf\u5bc6\u5ea6": "97kcal\/\u74f6", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u81b3\u98df\u7ea4\u7ef4\u7ec4\u4ef6", "\u7b80\u79f0": "LDF", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "1.87", "Na": "", "K": "", "Ca": "", "DF": "0.9", "DHA": ""
  }, {
    "\u54c1\u540d": "\u81b3\u98df\u7ea4\u7ef4\u7ec4\u4ef61\u53f7", "\u7b80\u79f0": "HDF", "Pro": "1.5 ", "Fat": "0.0 ", "Cho": "0.0 ", "\u80fd\u91cf\u5bc6\u5ea6": "2.03", "Na": "0.1", "K": "", "Ca": "", "DF": "0.992", "DHA": ""
  }, {
    "\u54c1\u540d": "\u767e\u7eb3\u6b62\u5f3a\u590d\u5408\u81b3\u98df\u7ea4\u7ef4\u7c89", "\u7b80\u79f0": "MZQ", "Pro": "3.5 ", "Fat": "0.0 ", "Cho": "85.8 ", "\u80fd\u91cf\u5bc6\u5ea6": "38kcal\/\u888b", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "DHA\u7ec4\u4ef6", "\u7b80\u79f0": "DHA", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": "20"
  }, {
    "\u54c1\u540d": "\u94c1\u5143\u7d20\u7ec4\u4ef6", "\u7b80\u79f0": "LFe", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "", "Na": "", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u76d0", "\u7b80\u79f0": "LNa", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "", "Na": "381", "K": "", "Ca": "1.2", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u590d\u5408\u9499\u7ec4\u4ef6", "\u7b80\u79f0": "LCa", "Pro": "", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "", "Na": "", "K": "", "Ca": "60", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u4e73\u9499", "\u7b80\u79f0": "Hca", "Pro": "1.7 ", "Fat": "3.4 ", "Cho": "95.0 ", "\u80fd\u91cf\u5bc6\u5ea6": "2.61", "Na": "0.3", "K": "", "Ca": "100", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u5361\u6377", "\u7b80\u79f0": "MKJ", "Pro": "0.0 ", "Fat": "0.0 ", "Cho": "98.5 ", "\u80fd\u91cf\u5bc6\u5ea6": "3.69", "Na": "3.63", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u8c37\u6c28\u9170\u80fa\u7ec4\u4ef6", "\u7b80\u79f0": "HG", "Pro": "100", "Fat": "", "Cho": "", "\u80fd\u91cf\u5bc6\u5ea6": "3.96", "Na": "0.2", "K": "", "Ca": "", "DF": "", "DHA": ""
  }, {
    "\u54c1\u540d": "\u9ea6\u82bd\u7cca\u7cbe", "\u7b80\u79f0": "HMY", "Pro": "0.7", "Fat": "0", "Cho": "97.7", "\u80fd\u91cf\u5bc6\u5ea6": "3.86", "Na": "0.006", "K": "", "Ca": "", "DF": "", "DHA": ""
  }];

  let energySum = 0;
  let proSum = 0;
  let fatSum = 0;
  let choSum = 0

  for (const item of inputItems) {
    for (const setting of projectSettings) {
      const itemName = item.name.trim()
      if (itemName == setting.品名 || itemName == setting.简称) {
        const energy = setting.能量密度 * Math.round(item.value * 100) / 100
        const pro = energy * setting.Pro / 400;
        const fat = energy * setting.Fat / 900;
        const cho = energy * setting.Cho / 400;

        energySum += energy;
        proSum += pro;
        fatSum += fat;
        choSum += cho;
        break;
      }
    }
  }

  energySum = Math.round(energySum)
  proSum = Math.round(proSum * 10) / 10
  fatSum = Math.round(fatSum * 100) / 100
  choSum = Math.round(choSum * 100) / 100

  return {
    energySum,
    proSum,
    fatSum,
    choSum,
  };
}
