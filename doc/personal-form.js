const { PersonalForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <PersonalForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);
