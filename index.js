//import './data'
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
var loader = new THREE.GLTFLoader()
var root
//Loding a object 
loader.load('./assets/1.glb',function(glb)
{
    console.log(glb)
    root = glb.scene.children[0];
	
    root.scale.set(11,8,8)
	
    scene.add(root);
	animate();
},  
    function(xhr)
    {
        console.log((xhr.loaded/xhr.total*100)+"% loaded")

    },
    function(error)
    {
    console.log('An Error Occurred')
})

//Lighting for the object 
scene.background = new THREE.Color(0xffffff);//0x010203


    const light = new THREE.DirectionalLight(0xfefefa,1)
    light.position.set(2,3,2)
    scene.add(light)

    const light1 = new THREE.DirectionalLight(0xfefefa,1)
    light1.position.set(-1,-1,-2)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xfefefa,1)
    light2.position.set(1,-0.5,-1)
    scene.add(light2)

    const light3 = new THREE.DirectionalLight(0xfefefa,1)
    light3.position.set(-1,0.5,1)
    scene.add(light3)

const size =
{
    width: window.innerWidth,
    hight:window.innerHeight
} 

//camera setup 
const camera = new THREE.PerspectiveCamera(30,size.width/size.hight,0.1,10000)
camera.position.set(0,0,11)
scene.add(camera)


// renderer the object in display 
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.domElement.id = 'threeJsRenderer';
renderer.setSize(2*window.innerWidth/2.8,window.innerHeight-55);
// document.body.appendChild(renderer.domElement);
document.getElementById("rendererParent").appendChild(renderer.domElement)

//set up mouse controls 
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,0,2)

controls.autoRotate=true;
controls.enableRotate=true;
controls.autoRotateSpeed=0.3;
controls.enableDamping = true;
controls.campingFactor = 0;
controls.enableZoom = true;
controls.keyPanSpeed =10;


window.addEventListener("click", ()=>{
    controls.autoRotate=false
  
});
window.addEventListener("dblclick", ()=>{
    controls.autoRotate=true;
});

//camera adjesment when swiper-slide click

function onBoneSelect(id)
{
    scene.remove(root)
    const detailedInfo = document.getElementById("detailedInfo")
    detailedInfo.innerHTML = ""
    const detailedInfoText = document.createElement("p")
    detailedInfoText.id="Infotext"
    loader.load('./assets/2.glb',function(glb)
    {
        console.log(glb)
        
        root = glb.scene.children[0];
        
        root.scale.set(11,8,8)
        
        scene.add(root);
        animate();
    })
    if(id == "SW-1")
    {
        camera.position.set(2.5,7,2)
        camera.zoom = 13
        controls.target = new THREE.Vector3(0,0,2)
        detailedInfoText.textContent = "The acromioclavicular joint is distinguished by the lateral clavicle joining with the acromion process (Part of the scapula). In standard physiological states, these joint permits just gliding movement." 
    }
    else if(id == "SW-2")
    {
        camera.position.set(0,1.2,-1)
        camera.zoom = 2.1
        controls.target = new THREE.Vector3(0,1.12,2)
        detailedInfoText.textContent ="This is a synovial plane joint. The union of the costal facet of the transverse process of a thoracic vertebra and the articular costal tubercle of the rib form this joint."
    }
    else if(id == "SW-3")
    {
        camera.position.set(25,0,5)
        camera.zoom = 40
        controls.target = new THREE.Vector3(0,0,2)
        detailedInfoText.textContent ="These are the plane joints formed between the carpal bones of the wrist. These joints allow flexion and extension movement."
    } 
    else if(id == "SW-4")
    {
        camera.position.set(0,0.6,-1)
        camera.zoom = 4
        controls.target = new THREE.Vector3(0,0.6,2)
        detailedInfoText.textContent ="This joint is a type of cartilaginous joint. In the vertebral column, this joint is a connection between adjacent vertebrae. An intervertebral joint is a combination of intervertebral symphysis (intervertebral disc joint) and facet (zygapophyseal joints)."
    }
    else if(id == "SW-5")
    {
        camera.position.set(0,0,0)
        camera.zoom = 2
        controls.target = new THREE.Vector3(0,0.19,2)
        detailedInfoText.textContent ="The association between a superior portion of the Pelvis (Ilium) and the lower spine (Sacrum) is Sacroiliac Joint. It serves as a shock absorber and allows anterior-posterior (Front & Back) movement."
    } 
    else if(id == "SW-6")
    {
        camera.position.set(0,0,3)
        camera.zoom = 2
        controls.target = new THREE.Vector3(0,-2,2.1)
        detailedInfoText.textContent ="These are the plane joints formed between the tarsal bones of the feet. These joints allow flexion and extension movement."
    } 
    else if(id == "SW-7")
    {
        camera.position.set(15,0,3)
        camera.zoom = 30
        controls.target = new THREE.Vector3(0,0,2)
        detailedInfoText.textContent ="These are synovial plane joints. It is the attachment among the carpals and the metacarpals and permits the bottoms of the metacarpal bones to attach. The Carpometacarpal joint of the thumb is termed Carpometacarpal Pollicis. It is a first carpometacarpal joint."
    }
    else if(id == "SW-8")
    {
        camera.position.set(15,-7,7)
        camera.zoom = 28
        controls.target = new THREE.Vector3(0,0,2)
        detailedInfoText.textContent ="It is a uniaxial hinge joint present between the phalanges of the fingers and allows good movements in the fingers."
        
    }    
    else if(id == "SW-9")
    {
        camera.position.set(0,0,3)
        camera.zoom = 2
        controls.target = new THREE.Vector3(0,-2,2.1)
        detailedInfoText.textContent ="These are arthrodial joints. It is the attachment among the tarsals and the metatarsals and permits the bottoms of the metatarsal’s bones to attach to tarsals."
    }
    else if(id == "SW-10")
    {
        camera.position.set(2,1,1.7)
        camera.zoom = 2
        controls.target = new THREE.Vector3(0,0.4,2)
        detailedInfoText.textContent ="This is a type of freely movable joint (Synovial Joint). It connects the upper arm (humerus) and forearm (radius & ulna) and allows flexion and extension movement."
        
    }else if(id == "SW-11")
    {
        camera.position.set(0,-3,11)
        camera.zoom = 5
        controls.target = new THREE.Vector3(0,-1,2)
        detailedInfoText.textContent ="This is a type of freely movable joint (Synovial Joint). It connects the femur and the tibia & patella and allows flexion and extension of the leg."
    }
    else if(id == "SW-12")
    {
        camera.position.set(0,20,25)
        camera.zoom = 35
        controls.target = new THREE.Vector3(0,1.5,2)
        detailedInfoText.textContent ="This joint is the primary skeletal union of the clavicle (Appendicular Skeleton) and the sternum (Axial Skeleton)."
        
    }
    else if(id == "SW-13")
    {
        camera.position.set(0,4,-11)
        camera.zoom = 15
        controls.target = new THREE.Vector3(0,-2,2)
        detailedInfoText.textContent ="The connection between the talus and the tibia, fibula is a talocrural joint (Ankle Joint). It permits dorsiflexion and plantarflexion movements."  
    }
    camera.updateProjectionMatrix()
    detailedInfo.appendChild(detailedInfoText)
}

const cards = document.getElementsByClassName("swiper-slide")

for(let i=0; i<cards.length; i++) {
    const currentCard = cards[i]
    currentCard.onclick = () => {
        onBoneSelect(currentCard.id)
    }
}

//renderer the animation  in display 
function animate(){

    controls.update();
    
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate()
