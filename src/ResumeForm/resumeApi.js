import {merge} from "lodash";
import Taro from "@tarojs/taro";
import {resumeTransform, timeTransform} from "../transform";

//改成分段保存
export const deleteResumeList = ({name, index, data, onSuccess, ajax, apis}) => {
  const list = (data[name] || []).slice(0);
  if (!Number.isInteger(+index)) {
    return;
  }
  list.splice(index, 1);

  return ajax(merge({}, apis.resume.updateSeparateResume, {
    data: Object.assign({}, {
      updateCv: {
        ...data,
        [name]: list,
        updateType: 12
      },
      keys: [name]
    })
  })).then(async ({data}) => {
    if (data.code === 0) {
      Taro.showToast({
        icon: 'success', title: '删除成功',
      });
      onSuccess && await onSuccess();

      setTimeout(() => {
        Taro.navigateBack().catch(err => {

        });
      }, 200)
    }
  });
};

const getDefaultParams = defaultParamsKey => {
  const _defaultParams = {};
  defaultParamsKey.forEach(item => {
    _defaultParams[item] = null;
  });
  return _defaultParams;
};


//改成分段保存
export const updateResumeSingle = ({formData, ajax, apis, resumeData, name}) => {
  let defaultParamsKey = [];

  if(name === 'basic'){
    defaultParamsKey = ['age', 'birth', 'email', 'gender', 'name', 'phone', 'phoneRegionCode', 'otherPhoneRegionCode', 'otherEmail', 'otherPhone', 'photo'];
  }
  if (name === 'personal') {
    defaultParamsKey = ['currentLocation', 'industryCode', 'industry', 'functionCode', 'function', 'cardType', 'card', 'nativePlace', 'race', 'marital', 'politicalStatus', 'height', 'weight'];
  }
  if (name === 'expect') {
    defaultParamsKey = [
      'currentStatus',
      'currentType',
      'currentSalary',
      'currentSalaryMin',
      'currentSalaryMax',
      'expectedSalary',
      'expectedSalaryMin',
      'expectedSalaryMax',
      'expectedLocations',
      'expectedIndustry',
      'expectedIndustryCode',
      'expectFunction',
      'expectFunctionCode'
    ];
  }
  if (name === 'other') {
    defaultParamsKey = ['otherInfo'];
  }
  const transformFormData=resumeTransform.output(formData);
  const submitFormData = merge({},getDefaultParams(defaultParamsKey), transformFormData);
  return ajax(Object.assign({}, apis.resume.updateSeparateResume, {
    data: {
      updateCv: {
        ...submitFormData,
        id:resumeData.id,
        updateType: 12
      },
      keys:Object.keys(submitFormData)
    }
  })).then(({data}) => {
    if (data.code === 0) {
      Taro.showToast({
        icon: "none", title: "保存成功", success: () => {
          Taro.navigateBack().catch(err => {

          })
        }
      })
      return;
    } else {
      Taro.showToast({
        icon: 'none', title: data.msg
      })
      return false;
    }
  })
}

//改成分段保存
export const updateResumeList = ({formData, name, index, data = {}, ajax, apis, onSuccess}) => {
  data = data || {};

  const outputData = timeTransform.output(formData);
  const list = (data[name] || []).slice(0);

  if (Number.isInteger(+index)) {
    list.splice(index, 1, outputData);
  } else {
    list.push(outputData);
  }

  const resumeData = Object.assign({}, data, {
    updateCv: {
      ...data,
      [name]: list,
      updateType: 12
    },
    keys: [name]
  });

  return ajax(merge({}, apis.resume.updateSeparateResume, {data: resumeData})).then(async ({data}) => {
    if (data.code === 0) {
      Taro.showToast({
        icon: 'success', title: '保存成功',
      });

      onSuccess && await onSuccess();


      setTimeout(() => {
        Taro.navigateBack().catch(err => {

        });
      }, 200)
    }
  });
};

