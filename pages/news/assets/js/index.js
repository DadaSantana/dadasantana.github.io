const qs = (element) => document.querySelector(element);
const qsAll = (element) => document.querySelectorAll(element);

qs('body').style.backgroundColor = '#f5f7f9';

let index = 0;

function removeClassFromLoadingBar() {
    qsAll('.news-items .news-sm .loading-bar').forEach((element)=>{
        element.classList.remove('active');
    })
}

function activeLoadingBar(index) {
    removeClassFromLoadingBar();

    let background = [];
    qsAll('.news-items .news-sm').forEach((element)=>{
        background.push(element.getAttribute('data-url'));
    });  
    qs('.news-banner .news-lg').style.backgroundImage = background[index];
    qs('.news-banner .news-lg').style.backgroundPosition = 'center';
    qs('.news-banner .news-lg').style.backgroundSize = 'cover';
    qsAll('.news-items .news-sm .loading-bar')[index].classList.add('active');

}

qs('.search input').addEventListener('focusin', ()=> {
    qs('header .search').classList.add('activeClick');
});

qs('.search input').addEventListener('focusout', ()=> {
    qs('header .search').classList.remove('activeClick');
});

setTimeout(() => {
  activeLoadingBar(index);  
}, 100);

setInterval(()=>{
    index++;
    activeLoadingBar(index);
}, 5000);

setInterval(()=>{
    if (index == 3) {
        index = -1;
    } 
}, 1000);



