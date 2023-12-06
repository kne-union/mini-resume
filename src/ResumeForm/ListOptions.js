import React from 'react';
import {SubmitButton} from "@kne/react-form-antd-taro";
import get from 'lodash/get';
import Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import {deleteResumeList} from "./resumeApi";
import style from './style.module.scss';
import {FixedButton, FixedView, usePreset} from '@kne/mini-core'

const ListOptions = ({index, name, data, label, onSuccess }) => {
const {apis,ajax}=usePreset();
  return  <FixedView>
    {
   (Number.isInteger(+index) && get(data,`${name}.length`,0) > 1) ? <>
          <FixedButton className={style['flex-1']} type="default" onClick={() => {
            Taro.showModal({
              title: `是否删除该${label}`,
              cancelText:"取消",
              confirmText:"确认",
              confirmColor:"#5CB8B2",
              success (res) {
                if(res.confirm){
                  return deleteResumeList({name, index, data, onSuccess,apis,ajax})
                }
              }
            })
          }}>
            删除
          </FixedButton>
          <FixedButton className={style['flex-2']} type="primary">
            <SubmitButton block type="primary">
              <View id={`save_${name}`}>保存</View>
            </SubmitButton>
        </FixedButton>
        </>:
    <SubmitButton block type="primary" className="submit-button">
      <View id={`save_${name}`}>保存</View>
    </SubmitButton>
}
  </FixedView>
};

export default ListOptions;
