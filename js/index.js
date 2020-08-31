//This is code for the Wu Soul! Why is there no Tarrasque on this list of monsters
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    formCreate()
    submit()
    getMax()
    let page=1
    get(page)
    pagechanger(page)
});

function formCreate(){
    const formArea = document.querySelector('#create-monster')
    const form=document.createElement('div')
    form.innerHTML=`<form id='monster-form'>
    <input type='text' id='name' placeholder='Name of Monster'>
    <input type='number' id='age' placeholder='Age of Monster'>
    <input type='text' id='description' placeholder='Description of Monster'>
    <input type='submit' id='submit-monster'>`
    formArea.appendChild(form)
}

function submit (){
    const form = document.querySelector('#monster-form')
    form.addEventListener('submit',(e)=>{
        event.preventDefault()
        console.log("you are inside the monster form")
        faker = {
            name: form.name.value,
            age: form.age.value,
            description: form.description.value
            }
        //create monster goes here
        console.log(faker)
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(faker)
            // .then(resp=>resp.json())
        })
        form.reset()
    })  
}

function getMax(){
    fetch('http://localhost:3000/monsters')
    .then(res=>res.json())
    .then(results=>{
        num = results.length
        const title = document.querySelector('h1')
        let content = num + " " + title.innerText 
        title.innerText =content
    })
}

function get(page){
    fetch('http://localhost:3000/monsters/?_limit=50&_page='+page)
    .then(res=>res.json())
    .then(renders)
}

function renders(mons){
    // console.log("create monster here")
    const container=document.querySelector('#monster-container')
    mons.forEach(mon=>
        { 
            const place = document.createElement('div')
            place.innerHTML=`<p>Name: ${mon.name}</p><p>Age ${mon.age}</p><p>Description ${mon.description}</p>`
            container.appendChild(place)
        })
}

function pagechanger(page){
    const max = Math.ceil(parseInt(document.querySelector('h1').innerText)/50)
    const container=document.querySelector('#monster-container') // console.log(max)
    document.addEventListener('click',(e)=>{//console.log(e.target)
        if (e.target.matches('#back')){
            console.log("back")
            page--
            if(page<0){
                page++
            }
            container.innerHTML=""
            get(page)
        }
        else if (e.target.matches('#forward')){
            console.log("forward")
            page++
            if(page>max){
                page--
            }
            container.innerHTML=""
            get(page)
        }
    })    
}