const { LanguageForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <LanguageForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);
