import React from 'react';
import {FixedButton, FixedView, FormInfo, usePreset} from '@kne/mini-core';
import {withFetch} from "@kne/react-fetch";
import {updateResumeSingle} from './resumeApi';

const {Form, FormPart, TextArea, SubmitButton} = FormInfo;

const OtherForm=withFetch(({data})=>{
  const {apis,ajax} = usePreset();

  return <Form data={data} onSubmit={async (formData) => {
    return updateResumeSingle({formData,apis,ajax,resumeData:data,name:"other"})
  }}>
    <FormPart list={[
      <TextArea.Item name="otherInfo" label="其他内容" rule="LEN-0-10000" maxLength={10000}/>,
      <FixedView>
        <FixedButton type={'primary'} block={true} size={'large'}>
          <SubmitButton>保存</SubmitButton>
        </FixedButton>
      </FixedView>]}/>
  </Form>
})


export default OtherForm;
