import React from 'react';
import {FormInfo, usePreset} from '@kne/mini-core';
import {get} from 'lodash';
import {updateResumeList} from './resumeApi';
import ListOptions from './ListOptions';
import {withFetch} from "@kne/react-fetch";
import {timeTransform} from '../transform';

const {Form, FormPart, Input, Picker, TextArea} = FormInfo;


const TrainingForm = withFetch(({data, index}) => {
    const {apis, ajax} = usePreset();
    const initData = timeTransform.input(get(data, `trainings[${index}]`, {}));
    return <Form data={initData} onSubmit={async (formData) => {
        return updateResumeList({formData, apis, ajax, data, name: "trainings", index})
    }}>
        <FormPart
            list={[<Input.Item name="authority" label="培训机构" rule="REQ LEN-0-50"/>, <Picker.DateRangePicker.Item
                format='YYYY-MM'
                precision='month'
                name="time" label="培训时间" soFar/>,
                <TextArea.Item name="description" label="培训内容" rule="LEN-0-10000" maxLength={10000}/>,]}/>

        <ListOptions index={index} data={data} name="trainings" label="培训"/>
    </Form>
})
export default TrainingForm;
