import React from 'react';
import {FormInfo, usePreset} from '@kne/mini-core';
import {get} from 'lodash';
import {updateResumeList} from './resumeApi';
import ListOptions from './ListOptions';
import {withFetch} from "@kne/react-fetch";

const { Form, FormPart, Input, Picker } = FormInfo;


const CertificateForm = withFetch(({ data,index }) => {
  const { apis, ajax } = usePreset();
  return <Form data={get(data, `certificates[${index}]`, {})} onSubmit={async (formData) => {
    return updateResumeList({ formData, apis, ajax, data,name: "certificates" ,index})
  }}>
    <FormPart list={[
      <Input.Item name="name" label="证书名称" rule="REQ LEN-0-50"/>,
      <Picker.DatePicker.Item
      format='YYYY-MM'
      precision='month'
      name="startTime"
      label="获取时间"/>,

    ]} />

<ListOptions index={index} data={data} name="certificates" label="证书" />
  </Form>
})
export default CertificateForm;
