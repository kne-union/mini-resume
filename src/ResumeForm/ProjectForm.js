import React from 'react';
import {FormInfo, usePreset} from '@kne/mini-core';
import ListOptions from './ListOptions';
import {timeTransform} from '../transform';
import {withFetch} from "@kne/react-fetch";
import merge from "lodash/merge";
import get from 'lodash/get';
import Taro from "@tarojs/taro";
import FormFooter from "./FormFooter";

const {Form, FormPart, Input, Picker, TextArea} = FormInfo;


const EducationForm = withFetch(({data, index}) => {
  const {apis, ajax} = usePreset();
  const resumeData = data;
  const initData = timeTransform.input(get(resumeData, `projects[${index}]`, {}));
  return <Form data={initData} onSubmit={async (formData) => {
    const {data} = await ajax(merge({}, initData.id ? apis.resume.updateResumeProject : apis.resume.addResumeProject, {
      data: timeTransform.output(Object.assign({cvId: resumeData.id,updateType:12}, initData, formData))
    }));
    if (data.code !== 0) {
      return;
    }
    Taro.showToast({
      icon: 'success', title: '保存成功',
    });
    setTimeout(() => {
      Taro.navigateBack().catch(err => {

      });
    }, 200);
  }}>
    <FormPart list={[<Input.Item name="name" label="项目名称" rule="REQ LEN-0-100"/>, <Picker.DateRangePicker.Item
      format='YYYY-MM'
      precision='month'
      name="time" label="时间" rule="REQ" soFar/>,
      <Input.Item name="companyName" label="公司名称" rule="LEN-0-100"/>,
      <Input.Item name="position" label="职位" rule="LEN-0-100"/>,
      <TextArea.Item name="description" label="项目描述" rule="LEN-0-10000" maxLength={10000}/>,
      <TextArea.Item name="responsibilities" label="项目职责" rule="LEN-0-10000" maxLength={10000}/>]}/>

    <ListOptions index={index} data={data} name="projects" label="项目经历"/>
    <FormFooter name="projects" label="项目经历" onDelete={initData.id ? async () => {
      const {data} = await ajax(merge({}, apis.resume.deleteResumeMultiple, {
        data: {
          cvId: resumeData.id, experienceId: initData.id, fieldName: 'projects',updateType:12
        }
      }));
      if (data.code !== 0) {
        return;
      }
      Taro.showToast({
        icon: 'success', title: '删除成功',
      });
      setTimeout(() => {
        Taro.navigateBack().catch(err => {

        });
      }, 200)
    } : null}/>
  </Form>
})
export default EducationForm;
