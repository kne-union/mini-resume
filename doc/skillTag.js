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
