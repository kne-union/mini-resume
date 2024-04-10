import React from 'react';
import {Enum, FormInfo, usePreset} from '@kne/mini-core';
import {get} from 'lodash';
import {updateResumeList} from './resumeApi';
import ListOptions from './ListOptions';
import {withFetch} from "@kne/react-fetch";

const { Form, FormPart, Input, Picker } = FormInfo;


const Language = withFetch(({ data,index }) => {
  const { apis, ajax } = usePreset();
  return <Form data={get(data, `languages[${index}]`, {})} onSubmit={async (formData) => {
    return updateResumeList({ formData, apis, ajax, data,name: "languages" ,index})
  }}>
    <FormPart list={[
      <Input.Item name="name" label="语言名称" rule="REQ LEN-0-100"/>,
      <Enum moduleName="levelEnum" >
        {data => {
          return <Picker.Item
            name="level"
            label="语言等级"
            interceptor="picker-single"
            columns={[data.map((item) => ({
              label: item.description,
              value: item.value
            }))]}
          />
        }}
      </Enum>
    ]} />

<ListOptions index={index} data={data} name="languages" label="语言" />
  </Form>
})
export default Language;
