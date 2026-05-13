import "./ScrollToTop.css"

function ScrollToTop() {

  const scroll = () => {
    window.scrollTo(0, 0);
    return <></>;
  };

  return (

    <button className="scroll-to-top" onClick={scroll}>
        <div className="arrow-up"></div>
    </button>
  )

    
}
export default ScrollToTop
