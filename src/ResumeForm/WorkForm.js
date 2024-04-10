import React from 'react';
import {Enum, FormInfo, usePreset} from '@kne/mini-core';
import {salaryTransform, timeTransform, valueToCodeTransform} from '../transform';
import {withFetch} from "@kne/react-fetch";
import compose from '@kne/compose';
import merge from "lodash/merge";
import get from 'lodash/get';
import Taro from "@tarojs/taro";
import FormFooter from "./FormFooter";

const {Form, FormPart, Input, InputNumber, Picker, IndustrySelect, SalaryInput, TextArea} = FormInfo;


const WorkForm = withFetch(({data, index}) => {
    const {apis, ajax} = usePreset();
    const resumeData = data;
    const initData = compose(timeTransform.input, salaryTransform.input, (data) => valueToCodeTransform.input(data, 'industry'))(get(resumeData, `works[${index}]`, {}));
    return <Form data={initData} onSubmit={async (formData) => {
        const {data} = await ajax(merge({}, initData.id ? apis.resume.updateResumeWork : apis.resume.addResumeWork, {
            data: compose(timeTransform.output, salaryTransform.output, (data) => valueToCodeTransform.output(data, 'industry'))(Object.assign({
                cvId: resumeData.id, updateType: 12
            }, initData, formData))
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
        <FormPart list={[<Input.Item name="company" label="公司" rule="REQ LEN-0-100"/>,
            <Input.Item name="position" label="职位" rule="REQ LEN-0-100"/>,
            <IndustrySelect.Item name="industry" valueType="all" maxLength={1} label="行业"
                                 interceptor="picker-single"/>, <Picker.DateRangePicker.Item
                format='YYYY-MM'
                precision='month'
                name="time" label="时间" rule="REQ" soFar/>, <Enum moduleName="companyTypeEnum">
                {data => {
                    return <Picker.Item
                        name="type"
                        label="公司性质"
                        interceptor="picker-single"
                        columns={[data.map((item) => ({
                            label: item.description, value: item.value
                        }))]}
                    />
                }}
            </Enum>, <Enum moduleName="companyScaleEnum">
                {data => {
                    return <Picker.Item
                        name="scale"
                        label="公司规模"
                        interceptor="picker-single"
                        columns={[data.map((item) => ({
                            label: item.description, value: item.value
                        }))]}
                    />
                }}
            </Enum>, <Input.Item name="department" label="部门" rule="LEN-0-50"/>,
            <Input.Item name="rank" label="职级" rule="LEN-0-50"/>,
            <SalaryInput.Item rule="SALARY" name="salary" label="薪资"/>,
            <Input.Item name="reportTo" label="汇报对象" rule="LEN-0-50"/>,
            <InputNumber.Item name="subordinatesCount" label="下属" placeholder={"下属人数"} rule="LEN-0-50"/>,
            <TextArea.Item name="description" label="工作内容" rule="LEN-0-10000" maxLength={10000}/>,
            <TextArea.Item name="departure" label="离职原因" rule="LEN-0-10000" maxLength={10000}/>]}/>
        <FormFooter name="works" label="工作经历" onDelete={initData.id ? async () => {
            const {data} = await ajax(merge({}, apis.resume.deleteResumeMultiple, {
                data: {
                    cvId: resumeData.id, experienceId: initData.id, fieldName: 'works', updateType: 12
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
export default WorkForm;
