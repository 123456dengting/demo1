import express from 'express';
import Index from "./index.html";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  let html = Index
  console.log(html);
  // 在控制台输入 html，得到的就是一个非常简单的 HTML 字符串
  // <div data-reactroot=""><h1>HELLO, HOME PAGE</h1></div>
  res.send(html);
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
});