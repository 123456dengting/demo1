
import { memo, useEffect, useRef, useState } from 'react';
import './index.scss';

function XuniList() {
  const itemHeight = 50;
  const containerHeight = 800;
  const list = Array.from({length: 10000}).map((t, index) => index);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [top, setTop] = useState(0);
  const currentTop = useRef(0);


  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    // 是否向上滚动
    const isScrollTop = currentTop.current > scrollTop;

    currentTop.current = scrollTop;
    const index = Math.floor(scrollTop / itemHeight);
    console.log("111111-top", top);
    // h 处理滚到一半的情况
    const h = scrollTop % itemHeight;
    // -100 处理网上滚的情况
    setTop(isScrollTop && index >= 2 ? scrollTop - 100  - h: scrollTop - h);
    
    // 在设置 top 之后立即使用更新后的 top 值进行计算

    setStartIndex(isScrollTop && index >= 2 ? index - 2 : index);
    setEndIndex(index + containerHeight / itemHeight + 2);
  }

  useEffect(() => {
    setEndIndex(containerHeight / 50 + 2);
    const listContainer = document.getElementsByClassName("list-container")[0];
    listContainer.addEventListener("scroll", handleScroll);
    
    return () => {
      listContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="app-home">
        <div className='list-container' style={{height: containerHeight + "px"}}>
          <div className='list-content' style={{height: list.length * 50 + "px"}}>
          </div>
          <div className='list-item-fixed' style={{top: top + "px"}}>
            {
              list.slice(startIndex, endIndex).map((t, index) => {
                return <div key={t} className='list-item' style={{height: itemHeight + "px"}}>{t + 1}</div>
              })
            }
            </div>
        </div>
    </div>
  );
}

export default memo(XuniList);