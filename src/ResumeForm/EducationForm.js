import React from 'react';
import {Enum, FormInfo, usePreset} from '@kne/mini-core';
import {View} from "@tarojs/components";
import style from './style.module.scss'
import {timeTransform} from '../transform';
import {withFetch} from "@kne/react-fetch";
import merge from "lodash/merge";
import get from 'lodash/get';
import Taro from "@tarojs/taro";
import FormFooter from "./FormFooter";

const {Form, FormPart, Input, Selector, Picker} = FormInfo;


const EducationForm = withFetch(({data, index}) => {
    const {apis, ajax} = usePreset();
    const resumeData = data;
    const initData = timeTransform.input(get(resumeData, `educations[${index}]`, {}));
    return <Form data={initData} onSubmit={async (formData) => {
        const {data} = await ajax(merge({}, initData.id ? apis.resume.updateResumeEducation : apis.resume.addResumeEducation, {
            data: timeTransform.output(Object.assign({cvId: resumeData.id, updateType: 12}, initData, formData))
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
        <FormPart list={[<Input.Item name="school" label="学校" rule="REQ"/>, <Picker.DateRangePicker.Item
            format='YYYY-MM'
            precision='month'
            name="time" label="时间" rule="REQ" soFar/>, <Enum moduleName="degreeEnum">
            {data => {
                return <Picker.Item
                    name="degree"
                    label="学历"
                    interceptor="picker-single"
                    rule="REQ"
                    columns={[data.map((item) => ({
                        label: item.description, value: item.value
                    }))]}
                />
            }}
        </Enum>, <Input.Item name="subject" label="专业"/>, <Enum moduleName="confirm">
            {data => {
                return <View className={style['form-field-gender']}>
                    <Selector.Item
                        interceptor="picker-single"
                        showCheckMark={false}
                        name="unifiedEnrolment"
                        label="是否统招"
                        options={data.map((item) => ({
                            label: item.description, value: item.value
                        }))}/>
                </View>;
            }}
        </Enum>,]}/>

        <FormFooter name="educations" label="教育经历" onDelete={initData.id ? async () => {
            const {data} = await ajax(merge({}, apis.resume.deleteResumeMultiple, {
                data: {
                    cvId: resumeData.id, experienceId: initData.id, fieldName: 'educations', updateType: 12
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
