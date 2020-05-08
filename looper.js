const numDivs = 8;
const size = 60;
const paddingVal = 8;
const numContainers  = 4;
const colors = Array.from({length : numContainers},() =>`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`);
const sounds = Array.from({length:numContainers},(e,i)=>{
    console.log(i)
    return new Howl({ src: `sounds/${i}.mp3`, html5: false, volume:0.9, loop: false});
})
const containers = Array.from({length: numContainers}, (e,i)=> document.querySelector(`#container${i+1}`));
let count=0;
containers.forEach(container=>{
    styleContainer(container)
});
containers.forEach((container, i)=>{
    const divs = Array.from({length: numDivs}, ()=>makeDiv());
    divs.map(div=>div.style.backgroundColor=colors[i]);
    divs.forEach(div=>container.appendChild(div));
})
mainLoop();
function mainLoop(){
    containers.forEach((container, index)=>{     
        Array.from(container.children).forEach((child,i)=>{
            child.style.backgroundColor=colors[index];
            if(child.id=='clicked'){
                child.style.opacity=0.9;  
            } else if (child.id==''){
                child.style.opacity=0.3;
            }       
        });
        let specialChild =  container.children[count%numDivs]
        specialChild.style.backgroundColor="black";
        specialChild.style.opacity=0.4;
        if(specialChild.id=="clicked"){
            sounds[index].play();
        }
    });
    count++
    setTimeout(mainLoop, 500);
}

function styleContainer(container){
    container.style.display="flex";
    container.style.justifyContent="flex-start";
    container.style.flexWrap="wrap";
    container.style.height="100px";
    container.style.width="800px";
    container.style.marginLeft="10vw";
    container.style.marginTop="3px";
    container.backgroundColor="red";
}

function makeDiv(e,i){
        let div = document.createElement('div');
        div.style.height=`${size}px`;
        div.style.width=`${size}px`;
        div.style.margin=`${size/paddingVal}px`;
        div.style.border="6px solid grey";
        div.style.borderRadius="6px";
        div.id="";
        div.addEventListener("click", (e)=>{
            console.log(e);
            if(e.target.id=="clicked"){
                e.target.id="";
            } else {
                e.target.id="clicked";
            };           
        })
    return div
}
