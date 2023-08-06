const Header = ({ headText, leftChild, rightChild }) => {
	//헤더 잡아놓기
	return (
		<header>
			<div className="head_left">{leftChild}</div>
			<div className="head_text">{headText}</div>
			<div className="head_right">{rightChild}</div>
		</header>
	);
};
export default Header;
