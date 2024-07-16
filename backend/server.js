// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
      return res.status(200).json({
          body: "OK"
      });
  }
  
  next();
});
//Adding this to check
app.get('/hello', (req, res) => {
  res.send('Your server is runnin da');
});

// Enable CORS
app.use(cors());
app.use(express.json());


// Endpoint to handle requests from the React application
app.post('/generate-profile-picture', async (req, res) => {
  console.log("You are here");
  const { prompt } = req.body;
  const optimizedPrompt = `${prompt}`;
  try {
    const response = await axios.post(
      'https://api.cloudflare.com/client/v4/accounts/a1cfee758c7a8c26842e6516749e3746/ai/run/@cf/lykon/dreamshaper-8-lcm',
      { prompt: optimizedPrompt },
      {
        headers: {
          Authorization: `Bearer 39_MjqOhobYdwIf_oQCAA_o5a0De4CtziyPhZj-V`,
        },
        responseType: 'arraybuffer',
      }
    );
    
    res.setHeader('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
