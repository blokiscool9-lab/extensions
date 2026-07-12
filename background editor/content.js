let panel;

chrome.runtime.onMessage.addListener(m=>{
if(m.type==="open")create();
if(m.type==="remove"&&panel)panel.remove();
});

function create(){
if(panel)return;

panel=document.createElement("div");
panel.id="bgEditor";
panel.innerHTML=`
<strong>BACKGROUND EDITOR</strong>
<input id="c1" type="color" value="#ff4b2b">
<input id="c2" type="color" value="#4158d0">
<input id="deg" value="180" placeholder="Degree">
<button id="grad">GRADIENT</button>
<button id="solid">SOLID</button>
<button id="dots">DOTS</button>
<button id="reset">RESET</button>
`;

Object.assign(panel.style,{
position:"fixed",
top:"20px",
right:"20px",
zIndex:999999,
background:"#fff",
padding:"15px",
border:"2px solid #000",
borderRadius:"12px",
boxShadow:"0 10px 40px #0006",
fontFamily:"monospace",
width:"230px"
});

document.body.appendChild(panel);

let c1=panel.querySelector("#c1");
let c2=panel.querySelector("#c2");
let deg=panel.querySelector("#deg");

function apply(type){
if(type==="solid"){
document.body.style.backgroundImage="none";
document.body.style.backgroundColor=c1.value;
}

if(type==="grad"){
document.body.style.backgroundImage=
`linear-gradient(${deg.value}deg,${c1.value},${c2.value})`;
document.body.style.backgroundSize="cover";
}

if(type==="dots"){
document.body.style.backgroundColor=c2.value;
document.body.style.backgroundImage=
`radial-gradient(${c1.value} 10px,transparent 10px)`;
document.body.style.backgroundSize="50px 50px";
}
}

panel.querySelector("#grad").onclick=()=>apply("grad");
panel.querySelector("#solid").onclick=()=>apply("solid");
panel.querySelector("#dots").onclick=()=>apply("dots");

panel.querySelector("#reset").onclick=()=>{
document.body.style.background="";
};

[c1,c2,deg].forEach(x=>x.oninput=()=>apply("grad"));

drag(panel);
}

function drag(el){
let x,y,down=false;

el.onmousedown=e=>{
down=true;
x=e.clientX-el.offsetLeft;
y=e.clientY-el.offsetTop;
};

document.onmousemove=e=>{
if(!down)return;
el.style.left=e.clientX-x+"px";
el.style.top=e.clientY-y+"px";
el.style.right="auto";
};

document.onmouseup=()=>down=false;
}
