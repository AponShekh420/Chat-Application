const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const userRouter = require('./routes/userRouter')
const chatRouter = require('./routes/chatRouter')
const app = express();

// app.use(cors({
//   credentials: true,
//   origin: 'https://chat-application-x512.vercel.app',
// }))

dotenv.config();



mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(()=> console.log('database connection successful'))
  .catch((err)=> console.log(err))


  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static(path.join(__dirname, "public")))




app.use('/', (req, res)=> {
  res.send('server is running')
})
app.use('/api/users', userRouter)
app.use('/api/chat', chatRouter)



app.use(notFoundHandler)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, ()=> {
    console.log(`Server has started in ${PORT}`)
})



const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'https://chat-application-x512.vercel.app'
  }
})

io.on('connection', (socket)=> {
  console.log('conntection successful with socket')
    socket.on('setup', (user)=> {
      socket.join(user.id);
      socket.emit('connected')
    });

    socket.on('join-chat', (room)=> {
      socket.join(room);
      console.log('user Joined room:' + ' ' + room)
    })

    socket.on('leave-chat', (room)=> {
      socket.leave(room);
      console.log('user leave room:' + ' ' + room)
    })

    socket.on("new message", (newMessageRecieved)=>{
      var chat = newMessageRecieved.chat;
      if(!chat.users) return console.log('chat.users not defined')

      // chat.users.forEach((user)=> {
      //   if(user._id === newMessageRecieved.senderId._id) return;
        socket.to(chat._id).emit('message recieved', newMessageRecieved)
      // })
    })

    socket.on('new chat', (chat)=> {
      if(chat) {
        socket.emit('reload chat')
        chat.users.forEach((user)=> {
          socket.to(user._id).emit('reload chat')
        })
      }
      
    })

    socket.on('typing', (room)=> socket.to(room).emit('typing'))
    socket.on('stop typing', (room)=> socket.to(room).emit('stop typing'))
   
})





