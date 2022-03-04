var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("display_cmd").innerHTML = ""; 
    recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event);
 var content= event.results[0][0].transcript;
 console.log(content);
 document.getElementById("display_cmd").innerHTML= content;
 if(content=="take my selfie"){
     console.log("taking selfie...");
     speak();
 }
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data= "Taking your selfie in 5 seconds";
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function (){
        take_snapshot();
        save();
    },5000);    
}


Webcam.set({
    width: 360,
    height: 250,
    image_format: "png",
    png_quality: 90
});
camera= document.getElementById("cam");
function take_snapshot(){
Webcam.snap(function (data_uri){
    document.getElementById("selfie").innerHTML= "<img id='snap' src="+data_uri+">";
});
}
function save(){
    link= document.getElementById("link");
    image= document.getElementById("selfie").src;
    link.href= image;
    link.click();
}