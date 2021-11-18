let urlInput=document.getElementById("link");
let form=document.querySelector("#addBookmark");
let clearTitle=form.querySelector("#clearTitle");
let clearUrl=form.querySelector("#clearUrl");
let check=document.querySelector("#check")
console.log(check)
check.addEventListener("click",(e)=>{
chrome.storage.sync.get((res)=>{
    console.log(res);
})
})
console.log(form.querySelector("[name=title]").name)

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
    this.reset();
    chrome.storage.sync.get((res)=>{
        let bookmarks=[];
        if(res.hasOwnProperty("bookmarks")){
           bookmarks=[...res.bookmarks]
        }
        bookmarks.push({
            title,
            url,
            favIconUrl:"" 
            // compare urls from chrome.tabs and url from input
        });
        chrome.storage.sync.set({bookmarks},function(){
            console.log("link is set");
        });
    })
};

// window.onload=async(e)=>{
//     console.log("heh")
//     let queryOptions = { active: true, currentWindow: true };
//     let [{facIconUrl,title,url}] = await chrome.tabs.query(queryOptions);
    
// };




