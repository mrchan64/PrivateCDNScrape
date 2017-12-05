var http = require('http');
var fs = require('fs');

var options = {
  'host': 'everyvideo.net',
  'path': '/watch/2561d5f3cc38a75'

}

var file = fs.createWriteStream("darkknight.html");

http.get(options, (res)=>{
  var datalength = 0;
  var nextTime = new Date().getTime();
  var start = nextTime;
  res.on('data', (chunk)=>{
    datalength+=chunk.length;
    var now = new Date().getTime();
    var diff = now-nextTime
    if(diff>0){
      var time = now - start;
      var kilo = 1024;
      var mega = kilo*1024;
      var giga = mega*1024;
      console.log(Math.floor(time/60000)+'m \t'+Math.floor((time%60000)/1000)+'s \t'+Math.floor(datalength/giga)+'GB \t'+Math.floor((datalength%giga)/mega)+'MB \t'+Math.floor((datalength%mega)/kilo)+'KB \t'+Math.floor(datalength%kilo)+'B');
      nextTime+=2000;
    }
  })
  res.on('end', ()=>{
    var now = new Date().getTime();
    var time = now - start;
    var kilo = 1024;
    var mega = kilo*1024;
    var giga = mega*1024;
    console.log(Math.floor(time/60000)+'m \t'+Math.floor((time%60000)/1000)+'s \t'+Math.floor(datalength/giga)+'GB \t'+Math.floor((datalength%giga)/mega)+'MB \t'+Math.floor((datalength%mega)/kilo)+'KB \t'+Math.floor(datalength%kilo)+'B');
    console.log('Download complete!' + res.statusCode)
    console.log(res.headers)
  })
  res.pipe(file);
}).on('error', (err)=>{
  console.log('Download error');
  console.log(err);
})