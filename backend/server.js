// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Your server is running!');
});

// Endpoint to handle requests from the React application
app.post('/generate-profile-picture', async (req, res) => {
  const { prompt } = req.body;
  const optimizedPrompt = `NFT profile picture, ${prompt}`;
  
  try {
    const response = await axios.post(
      'https://api.cloudflare.com/client/v4/accounts/a1cfee758c7a8c26842e6516749e3746/ai/run/@cf/bytedance/stable-diffusion-xl-lightning',
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
