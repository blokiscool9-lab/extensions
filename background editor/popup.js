const send=m=>chrome.tabs.query({active:true,currentWindow:true},t=>chrome.tabs.sendMessage(t[0].id,m));

document.getElementById("open").onclick=()=>send({type:"open"});
document.getElementById("remove").onclick=()=>send({type:"remove"});
