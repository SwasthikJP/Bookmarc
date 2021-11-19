let urlInput=document.getElementById("link");
let form=document.querySelector("#addBookmark");
let clearTitle=form.querySelector("#clearTitle");
let clearUrl=form.querySelector("#clearUrl");
let bookmarksDiv=document.querySelector(".bookmarks");
// let check=document.querySelector("#check")
// console.log(check)
// check.addEventListener("click",async(e)=>{
// chrome.storage.sync.get((res)=>{
//     console.log(res);
//     console.log(res.hasOwnProperty("bookmarks")? res.bookmarks.reverse():"jo")
// })

// })
console.log(bookmarksDiv)

function clear(e){
    e.preventDefault();
     console.log(this)
 form.querySelector(`[name=${e.target.dataset.key}]`).value="";
 
}
clearTitle.onclick=clear;
clearUrl.onclick=clear;




form.onsubmit=function(e){
    e.preventDefault();
    console.log(this)
    let title=this.querySelector("[name=title]").value;
    let url=this.querySelector("[name=url]").value;
    let favIconUrl=this.querySelector("img").src;
    this.reset();
    chrome.storage.sync.get((res)=>{
        let bookmarks=[];
        if(res.hasOwnProperty("bookmarks")){
           bookmarks=[...res.bookmarks]
        }
        bookmarks.push({
            title,
            url,
            favIconUrl
            // compare urls from chrome.tabs and url from input
        });
        chrome.storage.sync.set({bookmarks},function(){
            console.log("link is set");
        bookmarksDiv.insertAdjacentHTML('afterbegin',`<a target="_blank" href=${url} class="bookmarkCard">
        <img src=${favIconUrl} alt="favIcon" class="favIcon">
        <p class="bookmarkTitle">${title}</p>
    </a>`);
        });
    })
};
console.log(form.querySelector("img"));
window.onload=async(e)=>{
    console.log("heh")
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
let {favIconUrl,title,url}=tab;
console.log(tab)
    form.querySelector(`[name=title]`).value=title;
    form.querySelector(`[name=url]`).value=url;
    form.querySelector("img").src=favIconUrl||"error_img.jpg";
    chrome.storage.sync.get((res)=>{
        console.log(res);
        bookmarksDiv.innerHTML=res.hasOwnProperty("bookmarks")? 
        res.bookmarks.reverse().map((ele)=>{
            return `<a target="_blank" href=${ele.url} class="bookmarkCard">
            <img src=${ele.favIconUrl} alt="favIcon" class="favIcon">
            <p class="bookmarkTitle">${ele.title}</p>
        </a>`;
        }).join(" "):"";
    })
};




