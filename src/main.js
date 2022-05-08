// 寻找到sitelist
const $sitelist=$('.sitelist');
// 在sitelist里面寻找最后一个li,并插到它前面
const $lastli=$sitelist.find('li.last');

// JSON.parse得到上一次关闭页面时(C)保存的x的值 (x里存储着hashmap的信息)
const x=localStorage.getItem('x');
// 把x字符串重新变成对象
const xObject=JSON.parse(x);
// 创建一个hashmap数组,把list信息放里面,便于储存
const hashMap=xObject || [
    {logo:'A',logoType:'text',url:'https://www.acfun.cn'},
    {logo:'../R-C.png',logoType:'image',url:'https://www.bilibili.com'},
];
    // 以上几步的逻辑是:如果能成功读取到x,就把x的值还原为数组并调到hashmap里
    // 如果不能成功读取X,就初始化为含有a站b站两项的页面
hashMap.forEach(node=>{
    const $li=$(`<li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">
                    ${node.logo[0]}
                </div>
                <div class="link">${node.url}</div>
            </div>    
        </a>
    </li>`).insertBefore($lastLi)
     // (A)和(B)合起来就是刷新
})    


// 点击addbutton时,跳出通知框
$('.addbutton')
    .on('click',()=>{
        let url=window.prompt('请问您要添加的网址是?')
        // 判断是不是填了正确网址,不是的话就在前面补全
        if(url.indexOf('http')!==0){
            url='https://' + url
        }
        // 把新增urlpush到hashmap数组中,得到新的hashmap
        hashMap.push({
            logo:url[0],
            logoType:"text",
            url:url
        });
    // 清空除了最后一项外所有的li   (A)
    $sitelist.find('li:not(.last)').remove()
    // 遍历新的hashmap,并添加到最后一项之前   (B)
    hashMap.forEach(node=>{
        const $li=$(`<li>
            <a href="${node.url}">
                <div class="site">
                    <div class="logo">
                        ${node.logo[0]}
                    </div>
                    <div class="link">${node.url}</div>
                </div>    
            </a>
        </li>`).insertBefore($lastLi)
         // (A)和(B)合起来就是刷新
    })        
});


// 存储hashmap:利用监听(在关闭页面时的操作)
window.onbeforeunload=()=>{
    // JSON.stringify可以把对象变成字符串  (C)
    const string=JSON.stringify(hashMap)
    // 用字符串X保存hashmap的信息.   
        // 在本地存储里设置x,x的值为string
    localStorage.setItem('x',string)
}