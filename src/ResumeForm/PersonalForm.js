import {Button, Enum, FixView, FormInfo, usePreset} from '@kne/mini-core';
import React, {useRef} from 'react';
import {resumeTransform} from '../transform';
import {updateResumeSingle} from './resumeApi';
import {withFetch} from "@kne/react-fetch";

const {
    Form,
    FormPart,
    InputNumber,
    SubmitButton,
    CitySelect,
    FunctionSelect,
    IndustrySelect,
    Picker,
    CardType
} = FormInfo;


const PersonalForm = withFetch(({data}) => {
    const ref = useRef();
    const {apis, ajax} = usePreset();
    return <Form data={resumeTransform.input(data)} ref={ref} onSubmit={async (formData) => {
        return updateResumeSingle({formData, apis, ajax, resumeData: data, name: "personal"})
    }}>
        <FormPart list={[
            <IndustrySelect.Item name="industry" valueType="all" maxLength={3} label="行业" rule="REQ"/>,
            <FunctionSelect.Item name="function" valueType="all" maxLength={3} label="职能" rule="REQ"/>,
            <CitySelect.Item interceptor="picker-single" name="currentLocation" maxLength={1} label="现居地"
                             rule="REQ"/>,
            <CitySelect.Item name="nativePlace" label={"籍贯"} interceptor="picker-single" maxLength={1}/>,
            <CardType.Item name="card" rule="CARD" label={"证件号码"}/>,
            <InputNumber.Item name="height" hiddenController label={"身高"} addonAfter="cm" min={0} max={300}/>,
            <InputNumber.Item name="weight" hiddenController label={"体重"} addonAfter="kg" min={0} max={1000}/>,
            <Enum moduleName="nationEnum">{(data) => {
                return <Picker.Item
                    arrow
                    name="race"
                    label="民族"
                    interceptor="picker-single"
                    columns={[data.map((item) => ({
                        label: item.description,
                        value: item.value
                    }))]}
                />
            }}</Enum>,
            <Enum moduleName="marital">
                {data => {
                    return <Picker.Item
                        arrow
                        name="marital"
                        label="婚姻状况"
                        interceptor="picker-single"
                        columns={[data.map((item) => ({
                            label: item.description,
                            value: item.value
                        }))]}
                    />
                }}
            </Enum>,
            <Enum moduleName="political">
                {data => {
                    return <Picker.Item
                        arrow
                        name="politicalStatus"
                        label="政治面貌"
                        interceptor="picker-single"
                        columns={[data.map((item) => ({
                            label: item.description,
                            value: item.value
                        }))]}
                    />
                }}
            </Enum>
        ]}/>

        <FixView>
            <Button block={true} type={"primary"} size={"large"}>
                <SubmitButton>保存</SubmitButton>
            </Button>
        </FixView>
    </Form>
});
export default PersonalForm;
