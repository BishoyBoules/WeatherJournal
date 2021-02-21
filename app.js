let d = new Date();

let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

const theURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const theKey = "&appid=49157e6bc867eafc7c51ab70a8d3bcee&units=metric";

const btn = document.getElementById('generate');

const getData = async (zip)=>{

    const res = await fetch(theURL+zip+theKey)
    try {
      const data = await res.json();
      console.log(data.main.temp)
      return data.main.temp;
    }catch(error) {
      console.log("error", error);
    }
}

const updateUI = async ()=> {
    const request = await fetch('/getData');
  try{
    
    const allData = await request.json();
    console.log(allData[0]);
    document.getElementById('date').innerHTML = newDate;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feelings;
  }catch(error){
    console.log("error", error);
  }
}

const postData = async(url= '', data={})=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const theData =await response.json();
        return theData
    }catch(error){
        console.log('error', error);
    }
}

btn.addEventListener('click', ()=>{
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getData(zip)
    .then (temp =>{
        postData('/setData', {date: newDate, temp: temp, feelings: feelings})
    })
    .then (data => {
        updateUI()
    })
    
    
    if(!zip){
        alert("please enter your zipCode");
    }

})
