
# mini-resume


### 安装

```shell
npm i --save @kne/mini-resume
```


### 概述

这里填写组件概要说明


### 示例

#### 示例代码

- 候选人卡片加高亮
- 这里填写示例说明
- miniResume(@kne/mini-resume),miniCore(@kne/mini-core),lodash(lodash)

```jsx
const { ResumeCard } = miniResume;
const {HighLightProvider} = miniCore;

const BaseExample = () => {
  return <HighLightProvider keyword="年">
    <ResumeCard resumeData={{
      "age": 32,
      "birth": "1991-07-18T14:28:01.230+08:00",
      "birthFromAge": true,
      "candidateUid": null,
      "card": "898765367444776589",
      "cardType": 1,
      "name": "张三",
      "phone": null,
      "degree": 60,
      "gender": "F",
      "currentLocation": "上海",
      "workExperience": 10,
      "photo": null
    }} />
  </HighLightProvider>;
};

render(<BaseExample />);

```

- 技能加高亮
- 这里填写示例说明
- miniResume(@kne/mini-resume),miniCore(@kne/mini-core),lodash(lodash)

```jsx
const { SkillTag } = miniResume;
const { HighLightProvider } = miniCore;

const BaseExample = () => {
  return (
    <HighLightProvider keyword="测试">
      <SkillTag data={{
        skills: [
          {
            name: "自动化测试"
          },
          {
            name: "性能测试"
          },
          {
            name: "餐刀"
          },
          {
            name: "接口测试"
          },
          {
            name: "黑河测试"
          }
        ],
        manualTagNames: ["功能测试", "Python"]
      }} />
    </HighLightProvider>
  );
};

render(<BaseExample />);

```

- 基础信息表单
- 展示基础信息表单
- miniResume(@kne/mini-resume),miniCore(@kne/mini-core),_resumeData(@mockData/resume.json),lodash(lodash)

```jsx
const { BasicForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <BasicForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);

```

- 个人信息表单
- 展示个人信息表单
- miniResume(@kne/mini-resume),miniCore(@kne/mini-core),_resumeData(@mockData/resume.json),lodash(lodash)

```jsx
const { PersonalForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <PersonalForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);

```

- 求职意向表单
- 展示求职意向表单
- miniResume(@kne/mini-resume),miniCore(@kne/mini-core),_resumeData(@mockData/resume.json),lodash(lodash)

```jsx
const { ExpectForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <ExpectForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);

```

- 项目经历表单
- 展示项目经历表单
- miniResume(@kne/mini-resume),miniCore(@kne/mini-core),_resumeData(@mockData/resume.json),lodash(lodash)

```jsx
const { ProjectForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <ProjectForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);

```

- 语言表单
- 展示语言表单
- miniResume(@kne/mini-resume),miniCore(@kne/mini-core),_resumeData(@mockData/resume.json),lodash(lodash)

```jsx
const { LanguageForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <LanguageForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

