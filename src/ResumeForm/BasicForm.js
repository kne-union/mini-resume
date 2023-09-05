import React from 'react';
import {Button, FixView, FormInfo, usePreset} from '@kne/mini-core';
import {View} from "@tarojs/components";
import style from "./style.module.scss";
import {withFetch} from "@kne/react-fetch";
import {resumeTransform} from '../transform';
import {updateResumeSingle} from './resumeApi';

const {Form, FormPart, Input, Selector, SubmitButton, Picker,PhoneNumber,Avatar} = FormInfo;

const BasicForm=withFetch(({data})=>{
  const {apis,ajax} = usePreset();

  return <Form data={resumeTransform.input(data)} onSubmit={async (formData) => {
    return updateResumeSingle({formData,apis,ajax,resumeData:data,name:"basic"})
  }}>
    <FormPart list={[
      <View
        className={style['avatar-box']}>
        <Avatar name={"photo"} />
        <View className={style['title-box']}>
          <View className={style['title']}>点击上传头像</View>
          <View className={style['subtitle']}>真实头像更有助于提高求职成功率</View>
        </View>
      </View>,
      <Input.Item name="name" label="姓名" rule="REQ LEN-0-20"/>,
      <View className={style['form-field-gender']}>
        <Selector.Item
          rule="REQ"
          interceptor="picker-single"
          showCheckMark={false}
          name="gender"
          label="性别"
          options={[{label: '男', value: "M"}, {label: '女', value: "F"}]}/>
      </View>,
      <Picker.DatePicker.Item label="出生年月" name="birth"
                              arrow={true}
                              precision='month'
                              format='YYYY-MM'
                              min={new Date('1949-10')}
                              max={new Date()}
                              placeholder="请选择出生年月(选填)"/>,
      <PhoneNumber.Item name="phone" label="电话" rule="REQ PHONE_NUMBER"/>,
      <PhoneNumber.Item name="otherPhone" label="备用电话"/>,
      <Input.Item name="email" label="邮箱" rule="EMAIL"/>,
      <Input.Item name="otherEmail" label="备用邮箱" rule="EMAIL"/>,
      <FixView>
        <Button type={'primary'} block={true} size={'large'}>
          <SubmitButton>保存</SubmitButton>
        </Button>
      </FixView>]}/>
  </Form>
})


export default BasicForm;
