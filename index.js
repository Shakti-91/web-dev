import express from 'express'

const app = express();
let todos=[];
app.use(express.json());

app.get('/', (req, res) => {
  
  const titles = todos.map(todo => todo.title).join("\n");
  res.send(titles);
  
})
app.post('/',(req,res)=>{
   const { id, title } = req.body;

  // Validation
  if (!id || !title || title.trim() === "") {
    return res.status(400).json({ error: "Both id and title are required!" });
  }

  // Add to array
  todos.push({ id, title });
   res.status(201).json({ message: "Todo added successfully", todos });
});
app.put('/',(req,res)=>{
  const { id, title } = req.body;
  let change=false;
  // Validation
  if (!id || !title || title.trim() === "") {
    return res.status(400).json({ error: "Both id and title are required!" });
  }
  
    for(let i=0;i<todos.length;i++ ){
      if(todos[i].id===req.body.id){
        todos[i].title=req.body.title;
        change=true;
        break;
      }
    }
  if(change)res.send("succesful");
  else res.send("no such id");
})
app.delete('/',(req,res)=>{
  const toBeDeleted=req.query.id;
  if(!toBeDeleted){
    return res.status(400).json({ error: "Both id and title are required!" });
  }
  for(let i=0;i<todos.length;i++){
   if(todos[i].id==toBeDeleted){
    todos.splice(i,1);
   }
  }
  res.send('suiiiiii')
})

app.listen(3000);