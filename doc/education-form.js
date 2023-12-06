const { EducationForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <EducationForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);
