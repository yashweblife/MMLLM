import cors from 'cors';
import express from 'express';
import ollama from 'ollama';

const app = express();
const port = 3300;

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(express.json());

app.get('/',(req, res)=>{
    const apiCalls = {
        ollama: 'ollama',
        models: ['llama3','llama3.1', 'llava', 'mistral'],
        commands: [
            {
                name: 'chat',
                description: 'Chat with Ollama',
                body:{
                    prompt: 'string'
                }
            },
            {
                name: 'image',
                description: 'Pass an image to Ollama',
                body:{
                    prompt: 'string',
                    image: 'string'
                }
            },
        ]
    }
    res.send(apiCalls);
})

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    const messages = [
        {
            role: 'user',
            content: prompt
        }
    ]
    try {
        const c = await ollama.chat({
            model: 'llama3',
            messages,
        })
        res.send(JSON.stringify(c));
    }
    catch (e) {
        console.log(e)
        res.send(JSON.stringify({error:e.message}));
    }
})

app.post('/image',async (req,res)=>{
    // the req hsw an html canvas image as dataURL, send it to ollama
    const {prompt, image} = req.body;
    const messages = [
        {
            role:'user',
            content:prompt,
            images:[image]
        }
    ]
    console.log("Sending Image")
    try{
        const c = await ollama.chat({
            model:'llava',
            messages,
        })
        res.send(JSON.stringify(c));
    }catch(e){
        res.send(JSON.stringify({error:e.message}));
    }
})

const server = app.listen(port,'0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${port}`);
});
