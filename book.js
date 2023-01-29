window.onload = function() {
  const bookInfo =  JSON.parse(document.getElementById('bookInfo').value);
  const pages = Number(bookInfo.pages); //ページ数
  let page = []; //ページ情報を入れる
  let t = document.getElementById('book-body');
  let scroll = true;
	let startY;	
	let moveY;
	let dist = 30;

  for(let i=0; i < pages+1; i++){
    page.push(document.getElementById(`page${i}`))
  }

  const body = document.getElementById('book-body');
  body.style.position = 'relative';
  body.style.overflow = 'hidden';

  for(let i=1; i < pages+1; i++){
    page[i].style.position = 'absolute';
    page[i].style.transition = '1s';
    if(i === 1){
        page[1].style.top = '0';
        continue;
    }
    page[i].style.top = `${bookInfo.height}`;
  }

  function topToBottom(back, now, next){
    page[back].classList.add("active");
    page[back].style.top = "0";
    page[now].classList.remove("active");
    page[now].style.top = `${bookInfo.height}`;
    page[next].style.transition = "none";
    page[next].style.top = `-${bookInfo.height}`;
    setTimeout(()=>{
      page[next].style.transition = "1s";
    },100)
    return;
  }

  function buttomToTop(back, now, next){
    page[back].classList.add("active");
    page[back].style.top = "0";
    page[now].classList.remove("active");
    page[now].style.top = `-${bookInfo.height}`;
    page[next].style.transition = "none";
    page[next].style.top = `${bookInfo.height}`;
    setTimeout(()=>{
      page[next].style.transition = "1s";
    },100)
    return;
  }

  function findActive(){
    return Number(document.querySelector(".active").id.slice(4));
  }

  function setTimeOut(){
    setTimeout(()=>{
      scroll = true;
    },1500);
  }

  //スクロール用
  t.onwheel = (e)=>{
    e.preventDefault();
    if(scroll){
      scroll = false
      //下方向だったら
      if (e.deltaY > 0){
        if(pages-1 === findActive()){
          buttomToTop(pages,pages-1,1);
          setTimeOut();
        }else if(pages === findActive()){
          buttomToTop(1,pages,2);
          setTimeOut();
        }else{
          buttomToTop(findActive()+1,findActive(),findActive()+2);
          setTimeOut();
        }
      }

      //上方向だったら
      if(e.deltaY < 0){
        if(findActive() === 1){
          topToBottom(pages,1,pages-1);
          setTimeOut();
       }else if(findActive() === 2){
          topToBottom(1,2,pages);
          setTimeOut();
        }else if(findActive() === pages){
          topToBottom(pages-1,pages,pages-2);
          setTimeOut();
        }else{
           topToBottom(findActive()-1,findActive(),findActive()-2);
           setTimeOut();
        }
        
      }
    }
  }
	
  //スワイプ用
	t.addEventListener("touchstart", function(e) {
		e.preventDefault();
		startY = e.touches[0].pageY;
	});

  t.addEventListener("touchmove", function(e) {
    e.preventDefault();
    moveY = e.changedTouches[0].pageY;
  });

  t.addEventListener("touchend", function(e) {
		if (startY + dist <  moveY) {		// 上から下
      for(let j =1;j<pages+1;j++){
         if(page[1].className.match(/active/)){
            topToBottom(pages,1,pages-1);
            break;
         }

          if(page[2].className.match(/active/)){
            topToBottom(1,2,pages)
            break;
          }

          if(page[pages].className.match(/active/)){
            topToBottom(pages-1,pages,pages-2);
            break;
          }

          if(page[j].className.match(/active/)){
             topToBottom(j-1,j,j-2);
             break;
          }
      }
		}

		if (startY + dist >  moveY) {	// したから上
      for(let j =1;j<pages+1;j++){

        if(page[j].className.match(/active/)){
          buttomToTop(j+1,j,j+2)
          break;
       }

        if(page[pages-1].className.match(/active/)){
          buttomToTop(pages,pages-1,1)
          break;
        }

        if(page[pages].className.match(/active/)){
          buttomToTop(1,pages,2);
          break;
        }

      }
		}
  });
    
 
}
