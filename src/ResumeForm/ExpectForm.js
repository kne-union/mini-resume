import React from 'react';
import {Button, Enum, FixView, FormInfo, usePreset} from '@kne/mini-core';
import {resumeTransform} from '../transform';
import {updateResumeSingle} from './resumeApi';
import {withFetch} from "@kne/react-fetch";

const {Form, FormPart, SalaryInput, SubmitButton, CitySelect, FunctionSelect, IndustrySelect, Picker} = FormInfo;


const ExpectForm = withFetch(({data}) => {
  const {apis, ajax} = usePreset();
  return <Form data={resumeTransform.input(data)} onSubmit={async (formData) => {
    return updateResumeSingle({formData, apis, ajax, resumeData: data,name:"expect"})
  }}>
    <FormPart list={[
      <Enum moduleName="currentStatusEnum">
        {data => {
          return <Picker.Item
            arrow
            name="currentStatus"
            label="求职状况"
            interceptor="picker-single"
            columns={[data.map((item) => ({
              label: item.description,
              value: item.value
            }))]}
          />
        }}
      </Enum>,
      <Enum moduleName="positionTypeEnum">
        {data => {
          return <Picker.Item
            arrow
            name="currentType"
            label="求职类型"
            interceptor="picker-single"
            columns={[data.map((item) => ({
              label: item.description,
              value: item.value
            }))]}
          />
        }}
      </Enum>,
      <SalaryInput.Item
        rule="SALARY"
        name="currentSalary"
        label="当前薪资"/>,

      <SalaryInput.Item
        rule="SALARY"
        name="expectedSalary"
        label="期望薪资"/>,
      <CitySelect.Item name="expectedLocations" maxLength={5} label="期望城市" rule="REQ"/>,
      <FunctionSelect.Item name="expectFunction" valueType="all" maxLength={3} label="期望职能" rule="REQ"/>,
      <IndustrySelect.Item name="expectedIndustry" valueType="all" maxLength={3} label="期望行业"/>,
    ]}/>

    <FixView>
      <Button block={true} type={"primary"} size={"large"}>
        <SubmitButton>保存</SubmitButton>
      </Button>
    </FixView>
  </Form>
});
export default ExpectForm;
