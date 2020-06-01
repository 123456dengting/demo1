
var express = require('express');
var fs = require("fs");
const path = require('path');

const app = express();
const PORT = 3000;

//加载引入文件404处理
app.use(express.static(path.join(__dirname,'/')))


app.get('/', (req, res) => {

  fs.readFile('index.html', function (err, data) {
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