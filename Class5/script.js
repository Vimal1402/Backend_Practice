const mouseFollower = document.querySelector(".mouse-follower")

let x = 0;
let y = 0;

addEventListener("mousemove", (e)=>{
    const { clientX, clientY } = e;
    x = clientX;
    y = clientY;
    
    

    // mouseFollower.style.top = clientY + 'px'
    // mouseFollower.style.left = clientX + 'px'
})

function far(){
    mouseFollower.style.transform = `translate(${x}px, ${y}px)`
    requestAnimationFrame(far);
}
far();