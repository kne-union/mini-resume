const { ExpectForm } = miniResume;
const {data:resumeData} = _resumeData;

const BaseExample = ()=>{
    return <ExpectForm loader={()=>{
        return resumeData;
    }}/>
};

render(<BaseExample />);
