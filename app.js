const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const ejs=require("ejs");

const app = express();
app.set('view engine','ejs');


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

      res.sendFile(__dirname+"/index.html");

});


app.post("/",function(request,res){
  const query=request.body.cityName;
  const apiKey="8eb532464ebba16b80d37be0eeb9cd76";
  const unit="metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    //console.log(response.statusCode);
    response.on("data",function(data){
      const WeatherData=JSON.parse(data);
      //console.log(WeatherData);
      const temp= WeatherData.main.temp;
      const description = WeatherData.weather[0].description;
      const icon=WeatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

    res.render(__dirname+"/display.ejs",{description:description,query:query,temp:temp,imageURL:imageURL});

});
});
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
