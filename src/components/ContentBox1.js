import './styles/contentBox1.css'

function ContentBox1({icon,iconColor,title,commentNum,comment,spanColor,actualNum,totalNum,className=''}) {
    return (
        <div className={'contentBoxSize1 '+className}>
            <div className='boxIcon' style={{backgroundColor:iconColor}}>
                {icon}
            </div>
            <div className='boxTitle'>
                <p>{title}</p>
            </div>
            <div className='boxValue'>
                <h2>{actualNum}/{totalNum}</h2>
            </div>
            <div className='boxComment'>
                <p><span style={{color:spanColor}}>{commentNum}</span> {comment}</p>

            </div>
        </div>
    );
}

export default ContentBox1;
