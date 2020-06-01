
var express = require('express');
var fs = require("fs");


const app = express();
const PORT = 3000;

//最简单的ssr, 纯静态页面
app.get('/', (req, res) => {
  fs.readFile('ssr1/index.html', function (err, data) {
    if (err) {
        return console.error(err);
    }
    res.send(data.toString());
 });
  
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});