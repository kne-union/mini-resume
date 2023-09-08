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
