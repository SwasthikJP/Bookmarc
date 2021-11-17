let urlInput=document.getElementById("link");
let form=document.querySelector("#form");
let check=document.querySelector("#check")
console.log(check)
check.addEventListener("click",(e)=>{
chrome.storage.sync.get((res)=>{
    console.log(res);
})
})
console.log(form)


form.onsubmit=(e)=>{
    e.preventDefault();
    let link=e.target.querySelector("[name=link]").value;
    console.log(link)
    chrome.storage.sync.get((res)=>{
        let bookmarks=[];
        if(res.hasOwnProperty("bookmarks")){
           bookmarks=[...res.bookmarks]
        }
        bookmarks.push({
            url:link
        })
        chrome.storage.sync.set({bookmarks},function(){
            console.log("link is set");
        });
    })
   
};

window.onload=async(e)=>{
    console.log("heh")
    let queryOptions = { active: true, currentWindow: true };
    let [{facIconUrl,title,url}] = await chrome.tabs.query(queryOptions);
    
};




