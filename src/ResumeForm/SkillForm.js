import React from 'react';
import {Enum, FormInfo, usePreset} from '@kne/mini-core';
import {get} from 'lodash';
import {updateResumeList} from './resumeApi';
import ListOptions from './ListOptions';
import {withFetch} from "@kne/react-fetch";

const { Form, FormPart, Input, Picker } = FormInfo;


const SkillForm = withFetch(({ data,index }) => {
  const { apis, ajax } = usePreset();
  return <Form data={get(data, `skills[${index}]`, {})} onSubmit={async (formData) => {
    console.log(formData);

    return updateResumeList({ formData, apis, ajax, data,name: "skills" ,index})
  }}>
    <FormPart list={[
      <Input.Item name="name" label="技能名称" rule="REQ LEN-0-100"/>,
      <Enum moduleName="levelEnum" >
        {data => {
          return <Picker.Item
            arrow
            name="level"
            label="技能等级"
            interceptor="picker-single"
            columns={[data.map((item) => ({
              label: item.description,
              value: item.value
            }))]}
          />
        }}
      </Enum>
    ]} />

<ListOptions index={index} data={data} name="skills" label="技能" />
  </Form>
})
export default SkillForm;
