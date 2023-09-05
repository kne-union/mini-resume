import dayjs from 'dayjs';

const timeTransform = {
  input: (data) => {
    const output = Object.assign({}, data);


    if (data.startTime && (data.soFar || data.endTime)) {
      output.time = [new Date(data.startTime), data.soFar ? 'sofar' : new Date(data.endTime)];
    }
    return output;
  }, output: (data) => {
    const output = Object.assign({}, data);

    if (!(output.time && Array.isArray(output.time) && output.time.length === 2)) {
      return output;
    }

    output.startTime = dayjs(output.time[0]).format('YYYY-MM-DD');
    output.time[1] === 'sofar' ? output.soFar = true : output.endTime = dayjs(output.time[1]).format('YYYY-MM-DD');
    delete output.time;
    return output;
  }
};

export default timeTransform;
