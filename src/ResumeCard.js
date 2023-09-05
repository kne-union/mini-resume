import React from 'react';
import style from './card.module.scss';
import {View, Image, Text} from '@tarojs/components';
import classnames from 'classnames';
import {Enum, CommonCityEnum, AvatarPreview} from '@kne/mini-core';
import {Space} from '@kne/antd-taro';
import dayjs from 'dayjs';
import beiwosuoding from './assets/beiwosuoding.svg';
import jinzhisuoding from './assets/jinzhisuoding.svg';
import yisuoding from './assets/yisuoding.svg';
import femaleSrc from './assets/female.svg';
import maleSrc from './assets/male.svg';
import {isNil} from 'lodash';

const ResumeCard = ({resumeData, className, lockRender, userInfo, nameExtra}) => {
  const {id, name, phone, degree, gender, age, currentLocation = "上海", workExperience, photo, resumeLock} = resumeData
  const {uid, locked, expireAt} = resumeLock || {};
  const isByMeLock = userInfo?.appUserInfo?.uid === uid && locked;
  const isBanLock = !locked && !!expireAt && new Date(dayjs(expireAt).format('YYYY-MM-DD HH:mm:ss')).getTime() > new Date().getTime();
  const lockIconSrc = locked ? (isByMeLock ? beiwosuoding : yisuoding) : isBanLock ? jinzhisuoding : null;
  const lockIconText = locked ? (isByMeLock ? "被我锁定" : "已锁定") : isBanLock ? "禁止锁定" : null;

  return <View className={classnames(style['basic'], className)}>
    <View className={classnames(style['flex'], style['basic-top'])}>
      <View className={classnames(style['avatar'],"avatar")}>
        {photo ? <AvatarPreview value={photo}/> : <Image className={style['avatar-icon']} src={gender === 'F' ? femaleSrc : maleSrc}/>}
      </View>
      <View className={style['info']}>
         <View className={classnames(style['name-box'],{
           [style['padding-right']]:!!nameExtra
         },"name-box")}>
          <Text className={classnames(style['name'], "name")}>{name||"缺失姓名"}</Text>
          {lockRender && lockIconSrc && lockRender(lockIconSrc,lockIconText)}
           {nameExtra}
        </View>
        <Space wrap={false} style={{'--gap': '0'}} className={style['basic-info']}>
          {gender && <Enum moduleName={"gender"} name={gender}/>}
          {age > 0 && <View>{age}岁</View>}
          {currentLocation && <View className={style['city']}><CommonCityEnum name={currentLocation}/></View>}
          {!isNil(degree) && degree > 0 ? <Enum moduleName={"degreeEnum"} name={degree}/> : null}
          {!isNil(workExperience) && workExperience > 0 ? <View>{workExperience}年</View> : null}
        </Space>
      </View>
    </View>
  </View>
}

ResumeCard.defaultProps={
  lockRender:(src)=>{
    return <Image className={style['lock-icon']} src={src}/>
  }
}

export default ResumeCard
