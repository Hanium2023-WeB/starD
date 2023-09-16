const Motive=({motive, onClose, index})=>{
    console.log("지원 동기 : ", motive[index]);
    console.log("onClose : ", onClose);

    return(
        <div className={"background"}>
            <div className={"show_motive"}>
                <p>지원 동기</p>
                <p>{motive[index]}</p>
                <button onClick={onClose}>확인</button>
            </div>
        </div>
    )
}
export default Motive;