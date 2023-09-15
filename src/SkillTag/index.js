import style from './style.module.scss';
import React, {useEffect, useMemo, useState} from 'react';
import {View} from "@tarojs/components";
import classnames from 'classnames';
import get from 'lodash/get';
import {Icon} from '@kne/antd-taro';
import Taro from "@tarojs/taro";
import { HighLight } from "@kne/mini-core";

const SkillTag = ({ data = {}, showOpen = true, className }) => {
  const { skills, manualTagNames } = data || [];
  const [open, setOpen] = useState(false);
  const [showMore,setShowMore]=useState(false);

  const tagAll = useMemo(() => {
    let _skills = skills || [],
      _manualTagNames = manualTagNames || [];
    if (get(_skills, 'length') > 0) {
      _skills = _skills.map((item, index) => ({ name: item?.name, id: `skill_${index}`, type: 1 }));
    }
    if (get(_manualTagNames, 'length') > 0) {
      _manualTagNames = _manualTagNames.map((item, index) => ({ name: item, id: `manual_${index}`, type: 2 })).reverse();
    }
    return _manualTagNames.concat(_skills);
  }, [skills, manualTagNames]);


  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select(`#skill_box`).boundingClientRect();
    query.exec((res) => {
      if (!res || !res[0]) {
        return;
      }
      setShowMore(res[0].height > 32);
    });
  }, [])

  return (
    <View
      className={classnames(
        style['relative'],
        {
          [style['padding']]: !showOpen
        },
        className,
        {
          [style['no-padding']]: !tagAll?.length
        }
      )}
      onClick={e => e.stopPropagation()}
    >
      <View
        className={classnames(style['tags'], {
          [style['tags-opened']]: !!open
        })}
      >
        <View id={"skill_box"} className={style['tags-box']}>
          {(tagAll || []).map(({ type, name, id }) => {
            return (
              <HighLight tagName={View} text={name} key={id} className={classnames(style['tag'],{
                [style['active']]:type===2
              })}>
                {name}
              </HighLight>
            );
          })}
        </View>
      </View>
      {showMore && <View className={classnames(style['more-tag'], style['open-tag'])} onClick={() => setOpen(!open)}>
        <Icon type={open ? 'arrow-thin-up' : 'arrow-thin-down'} className={"iconfont"}/>
      </View>}
    </View>
  );
};

export default SkillTag;
