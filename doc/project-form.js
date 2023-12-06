const { ProjectForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <ProjectForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);
