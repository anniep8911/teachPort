const btn = document.querySelectorAll('.conView .btn');
const lb = document.querySelector('.lightBox');
const lbClose = document.querySelector('.lightBox .close');
const con = document.querySelector('.contentGroup .content');
const conG = document.querySelector('.contentGroup');
const btnPrev = document.querySelector('.prev'),
      btnNext = document.querySelector('.next'),
      bar = document.querySelector('.hdrWrap h2');
      logo = document.querySelector('.hdrWrap h1'),
      cPrev = document.querySelector(".helper"),
      sideBar = document.querySelector('.hdrWrap section'),
      sideLi = document.querySelectorAll('.hdrWrap section .sideBar li'),
      tableTitle = document.querySelector('.lightBox table caption'),
      tableExp = document.querySelectorAll('.lightBox table tbody tr'),
      tableClass1 = tableExp[0],tableClass2 = tableExp[1],tableClass3 = tableExp[2];
      
let color = ["rgb(199, 127, 33)", "rgb(73, 101, 143)", "rgb(158, 122, 165)","rgb(77, 77, 150)","rgb(85, 52, 85)","rgb(66, 99, 66)","rgb(99, 65, 61)"];

let conWidth = parseInt(getComputedStyle(con).width)*-1,
    conML = parseInt(getComputedStyle(conG).marginLeft),
    num=0, cnt=0, ind=0, count=0, flag=false;

btn.forEach((eve)=>{
    eve.addEventListener('click',show);
    eve.addEventListener('mouseenter',ent);
    eve.addEventListener('mouseleave',leav);
});


sideLi.forEach((e)=>{
    e.addEventListener('click',function(){
        var ind= inDex(this);
        lb.classList.add('show');
        lb.animate({opacity:[0,1]},{duration:500,fill:'forwards'});
        lb.style.backgroundColor= color[ind];
        fetch('/data/skills.json')
        .then((data)=> data.json())
        .then((obj)=>{
            console.log(obj)
            tableTitle.firstElementChild.innerHTML=obj.classTitle[ind];
            tableTitle.lastElementChild.innerHTML=obj.classGoal[ind];
            tableClass1.children[1].innerHTML=obj.className1[ind];
            tableClass1.children[2].innerHTML=obj.classExp1[ind];
            tableClass2.children[1].innerHTML=obj.className2[ind];
            tableClass2.children[2].innerHTML=obj.classExp2[ind];
            tableClass3.children[1].innerHTML=obj.className3[ind];
            tableClass3.children[2].innerHTML=obj.classExp3[ind];
        });
    });
})


//인덱스 만드는 함수
function inDex(element){
    let _i = 0;
    while((element=element.previousElementSibling) != null){
        _i++;
    }
    return _i;
}

function ent(){
    this.firstElementChild.innerHTML='🥇';
    this.style.fontSize='70px';
    cPrev.style.transform='scale(3)';
}
function leav(){
    this.firstElementChild.innerHTML='+';
    cPrev.style.transform='scale(1)';
    
}

   
btnNext.addEventListener('click',function(){
    if(num >= 6){
        this.style.cursor='not-allowed';
        conG.style.marginLeft='-200%';
  
    }else{
        num++;
        btnPrev.style.cursor='pointer';
        btnNext.style.cursor='pointer';
        conG.style.marginLeft=-33.33*num+'%';
    }
})

btnPrev.addEventListener('click',function(){
    num--;
    if(num <= 0){
        this.style.cursor='not-allowed';
        conG.style.marginLeft='0%';
        num=0;
    }else{
        btnNext.style.cursor='pointer';
        btnPrev.style.cursor='pointer';
        conG.style.marginLeft=-33.33*num+'%';
        console.log(num);
    }
    })
function show(){
    var n = this.getAttribute('data-num');
    this.firstElementChild.style.color='transparent';
    this.animate({transform:['scale(0)','scale(70)'],opacity:[1,0],color:'transparent'},{duration:1000});
    lb.classList.add('show');
    lb.animate({opacity:[0,1]},{duration:500,fill:'forwards'});
    var bgC = getComputedStyle(this).backgroundColor;
    lb.style.backgroundColor=bgC;
    fetch('/data/skills.json')
    .then((data)=> data.json())
    .then((obj)=>{
        console.log(obj)
        tableTitle.firstElementChild.innerHTML=obj.classTitle[n];
        tableTitle.lastElementChild.innerHTML=obj.classGoal[n];
        tableClass1.children[1].innerHTML=obj.className1[n];
        tableClass1.children[2].innerHTML=obj.classExp1[n];
        tableClass2.children[1].innerHTML=obj.className2[n];
        tableClass2.children[2].innerHTML=obj.classExp2[n];
        tableClass3.children[1].innerHTML=obj.className3[n];
        tableClass3.children[2].innerHTML=obj.classExp3[n];
    });
}

lbClose.addEventListener('click',function(){
    lb.animate({opacity:[1,0]},{duration:1000,fill:'forwards'});
    this.innerHTML='✖';
    setTimeout(remove,1000);
    btn.forEach((eve)=>{
        eve.firstElementChild.style.color='#fff';
    });
})
lbClose.addEventListener('mouseenter',function(){
    this.innerHTML='🙋‍♀️'
    this.parentNode.style.bnackgroundColor='transparent';
});

function remove(){
    lb.classList.remove('show');
}

bar.addEventListener('click',()=>{
    if(cnt >= 1){
        sideBar.classList.remove('show');
        cnt =0;
    }else{
        sideBar.classList.add('show');
        cnt++;
    }
})

window.addEventListener('mousemove',(e)=>{
    cPrev.style.left=e.pageX-20+"px";
    cPrev.style.top=e.pageY-20+"px";
    bar.addEventListener('mousemove',()=>{
        cPrev.style.transform='scale(3)';
        bar.innerHTML='🍔';
    })
    bar.addEventListener('mouseleave',()=>{
        cPrev.style.transform='scale(1)'; 
        bar.innerHTML='≡';
    })
    logo.addEventListener('mousemove',()=>{
        cPrev.style.transform='scale(3)';
        logo.innerHTML='🙆‍♀️';
    })
    logo.addEventListener('mouseleave',()=>{
        cPrev.style.transform='scale(1)';
        logo.innerHTML='Jeong';
    })
    btnNext.addEventListener('mousemove',()=>{
        cPrev.style.transform='scale(3)';
        cPrev.style.fontSize='30px';
        cPrev.innerHTML='🚀';
        cPrev.style.backgroundColor='transparent';
        
    })
    btnNext.addEventListener('mouseleave',()=>{
        cPrev.style.transform='scale(1)';
        cPrev.innerHTML='';
        cPrev.style.backgroundColor='#fc0';
    })
    btnPrev.addEventListener('mousemove',()=>{
        cPrev.style.transform='scale(3)';
        cPrev.style.fontSize='30px';
        cPrev.innerHTML='🚗';
        cPrev.style.backgroundColor='transparent';
    })
    btnPrev.addEventListener('mouseleave',()=>{
        cPrev.style.transform='scale(1)';
        cPrev.innerHTML='';
        cPrev.style.backgroundColor='#fc0';
    })
})
