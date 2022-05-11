const $sitelist = $('.sitelist')
const $lastLi = $sitelist.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
// 删掉链接里面多余的部分
const simplifyUrl=(url)=>{
    return url.replace('https://','')
              .replace('http://','')
              .replace('www.','')
              .replace(/\/.*/,'')  // 删除/开头的内容
}

const render=()=>{
    $sitelist.find('li:not(.last)').remove()
    hashMap.forEach(
        // 为了让点哪个×就关闭哪个页面,用index添加下标
        (node,index) => {
            const $li = $(`<li>
                        <div class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                            <div class="close">
                                <svg class="icon">
                                    <use xlink:href="#icon-quxiao"></use>
                                </svg>
                            </div>
                        </div>    
                </li>`).insertBefore($lastLi)
                // 用on标签代替a标签实现
                $li.on('click',()=>{
                    window.open(node.url)
                })
                // 设置点击叉叉的时候不点击网站:利用阻止冒泡
                $li.on('click','.close',(e)=>{
                    e.stopPropagation()
                    // 从下标为index开始删除1个
                    hashMap.splice(index,1)
                    // 删除之后重新渲染
                    render()
                })
        }
    )
}

render()

$('.addbutton')
    .on('click', () => {
        let url = window.prompt('添加的网址是?')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            // 引用函数删掉前面的部分,再取第0个
            logo: simplifyUrl(url)[0],
            url: url
        })
        render()
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
  }      
// 当按下键盘时的事件:
$(document).on('keypress',(e)=>{
    // 键盘上打哪个键,就显示哪个键的key
    const {key}=e
    for(let i=0;i<hashMap.length;i++){
        // 如果hashmap里哪一项的logo的小写是键盘上打出的key
            // 就打开这项的链接
        if(hashMap[i].logo.toLowerCase()===key && searchForm.search != onfocus){
            window.open(hashMap[i].url)
        }
    }
})
