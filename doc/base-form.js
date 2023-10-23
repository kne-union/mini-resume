const { BasicForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <BasicForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);
