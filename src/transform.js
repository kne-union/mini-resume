import {get, isNil, isUndefined, omit} from 'lodash';
import dayjs from "dayjs";
import compose from '@kne/compose';

export const salaryTransform = {
  input: (data, name = 'salary') => {
    data = Object.assign({}, data);
    const output = omit(data, [name, `${name}Type`, `${name}Min`, `${name}Max`]);
    output[name] = {
      type: get(data, `${name}Type`) || 5,
      value:![1,7].includes(get(data, `${name}Type`))?`${get(data, `${name}Min`)||""}`:get(data, name)||"",
      min:![1,7].includes(get(data, `${name}Type`)) ? get(data, `${name}Min`):"",
      max:![1,7].includes(get(data, `${name}Type`)) ? get(data, `${name}Max`):""
    };
    return output;
  }, output: (data, name = 'salary') => {
    data = Object.assign({}, data);
    const output = omit(data, [name]);
    const value = data[name];

    if (value && ![1,7].includes(value.type)) {
      output[`${name}Min`] = value.min || value.value || '';
      output[`${name}Max`] = value.max || value.value || '';
    }
    if(value?.type === 7){
      output[name] = value.value || '';
    }
    if (value && !isUndefined(value.type)) {
      output[`${name}Type`] = value.type;
    }
    return output;
  }
};

export const timeTransform = {
  input: (data) => {
    data = Object.assign({}, data);
    const output = omit(data, ['startTime', 'endTime', 'soFar']);
    if (data.startTime && (data.soFar || data.endTime)) {
      output.time = [new Date(data.startTime), data.soFar ? 'sofar' : new Date(data.endTime)];
    }
    return output;
  }, output: (data) => {
    data = Object.assign({}, data);
    const output = omit(data, ['time']);
    if (data.time && Array.isArray(data.time) && data.time.length === 2) {
      output.startTime = dayjs(data.time[0]).format('YYYY-MM-DD');
      data.time[1] === 'sofar' ? output.soFar = true : (output.endTime = dayjs(data.time[1]).format('YYYY-MM-DD'));
    }
    return output;
  }
};

export const phoneTransform = {
  input: (data, name = 'phone') => {
    data = Object.assign({}, data);
    const output = omit(data, [name, `${name}Code`]);
    if (!isNil(data[name])) {
      output[name] = {
        value: data[name], code: data[`${name}RegionCode`] || 'CN'
      };
    }
    return output;
  }, output: (data, name = 'phone') => {
    data = Object.assign({}, data);
    const output = omit(data, [name]);
    if (data[name] && data[name].value) {
      output[name] = data[name].value;
      output[`${name}RegionCode`] = data[name].code || 'CN';
    }

    return output;
  }
};

export const typeTransform = {
  input: (data, name = 'card') => {
    data = Object.assign({}, data);
    const output = omit(data, [name, `${name}Type`]);
    if (!isNil(data[name])) {
      output[name] = {
        value: data[name], type: data[`${name}Type`]
      };
    }
    return output;
  }, output: (data, name = 'card') => {
    data = Object.assign({}, data);
    const output = omit(data, [name]);
    if (data[name] && data[name].value) {
      output[name] = data[name].value;
      output[`${name}Type`] = data[name].type;
    }
    return output;
  }
};

export const valueToCodeTransform = {
  input: (data, name) => {
    data = Object.assign({}, data);
    const output = omit(data, [name, `${name}Code`]);
    if (!isNil(data[`${name}Code`])) {
      output[name] = {
        value: data[`${name}Code`], label: data[name]
      };
    }
    return output;
  }, output: (data, name) => {
    data = Object.assign({}, data);
    const output = omit(data, [name]);
    if (data[name] && !isNil(data[name].value)) {
      output[`${name}Code`] = data[name].value;
      output[name] = data[name].label;
    }
    return output;
  }
};

export const valueToCodeArrayTransform = {
  input: (data, name) => {
    data = Object.assign({}, data);
    const output = omit(data, [name, `${name}Code`]);
    if (Array.isArray(data[`${name}Code`])) {
      output[name] = data[`${name}Code`].map((value, index) => {
        return {
          value, label: get(data[name], `[${index}]`)
        };
      });
    }
    return output;
  }, output: (data, name) => {
    data = Object.assign({}, data);
    const output = omit(data, [name]);
    if (Array.isArray(data[name])) {
      output[`${name}Code`] = data[name].map(({value}) => value);
      output[name] = data[name].map(({label}) => label);
    }
    return output;
  }
};

export const resumeTransform = {
  input: compose(phoneTransform.input, (data) => phoneTransform.input(data, 'otherPhone'),(data) => typeTransform.input(data, 'card'), salaryTransform.input, (data) => salaryTransform.input(data, 'currentSalary'), (data) => salaryTransform.input(data, 'expectedSalary'), (data) => valueToCodeArrayTransform.input(data, 'function'), (data) => valueToCodeArrayTransform.input(data, 'industry'), (data) => valueToCodeArrayTransform.input(data, 'expectFunction'), (data) => valueToCodeArrayTransform.input(data, 'expectedIndustry')),
  output: compose(phoneTransform.output, (data) => phoneTransform.output(data, 'otherPhone'), (data) => typeTransform.output(data, 'card'), salaryTransform.output, (data) => salaryTransform.output(data, 'currentSalary'), (data) => salaryTransform.output(data, 'expectedSalary'), (data) => valueToCodeArrayTransform.output(data, 'function'), (data) => valueToCodeArrayTransform.output(data, 'industry'), (data) => valueToCodeArrayTransform.output(data, 'expectFunction'), (data) => valueToCodeArrayTransform.output(data, 'expectedIndustry'))
};
