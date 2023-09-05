import {Button, FixView, FormInfo, usePreset} from '@kne/mini-core';
import React, {useRef} from 'react';
import style from './style.module.scss';
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {resumeTransform} from '../transform';

const {
    Form, FormPart, Input, Selector, SubmitButton, CitySelect, FunctionSelect, IndustrySelect, PhoneNumber
} = FormInfo;
const RequireResume = ({data}) => {
    const ref = useRef();
    const {apis, ajax} = usePreset();

    return <Form data={resumeTransform.input(data)} ref={ref} onSubmit={async (formData) => {
        const newForm = Object.assign({}, data, formData);
        //入库
        const {data: addRes} = await ajax(Object.assign({}, apis.resume.addResume, {
            data: resumeTransform.output(newForm)
        }));
        if (addRes.code === 0) {
            Taro.showToast({
                icon: "none", title: "保存成功", success: () => {
                    setTimeout(() => {
                        Taro.redirectTo({
                            url: `/pages/talentDetail/index?resumeId=${addRes.data.id}`
                        });
                    }, 500)
                }
            })

            return true
        } else if (addRes.code === 10005) {
            Taro.showToast({
                icon: 'none', title: "重复简历，本次填写内容不保存"
            })
            return false;
        } else {
            Taro.showToast({
                icon: 'none', title: addRes.msg
            })
        }

    }}>
        <FormPart list={[<Input.Item name="name" label="姓名" rule="REQ LEN-1-20"/>,
            <PhoneNumber.Item name="phone" label="手机号" rule="REQ PHONE_NUMBER"/>,
            <View className={style['form-field-gender']}>
                <Selector.Item
                    rule="REQ"
                    interceptor="picker-single"
                    showCheckMark={false}
                    name="gender"
                    label="性别"
                    options={[{label: '男', value: "M"}, {label: '女', value: "F"}]}/>
            </View>, <CitySelect.Item
                interceptor="picker-single" name="currentLocation" maxLength={1} label="现居地" rule="REQ"/>,
            <IndustrySelect.Item name="industry" valueType="all" maxLength={3} label="行业" rule="REQ"/>,
            <FunctionSelect.Item name="function" valueType="all" maxLength={3} label="职能" rule="REQ"/>,]}/>

        <FixView>
            <Button block={true} className={style['upload-resume-btn']} type={"primary"} size={"large"}>
                <SubmitButton>保存</SubmitButton>
            </Button>
        </FixView>
    </Form>
}

export default RequireResume;
