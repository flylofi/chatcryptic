const express = require('express');
const bodyParser = require('body-parser');
const Web3WisdomWand = require('web3wisdomwand');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const wand = new Web3WisdomWand('YOUR_API_KEY');

app.post('/query', async (req, res) => {
    const { query } = req.body;
    let response = "I'm not sure how to help with that.";

    if (query.includes("news")) {
        const news = await wand.fetchCryptoNews();
        response = news.map(article => article.title).join('\n');
    } else if (query.includes("sentiment")) {
        const sentiment = await wand.getMarketSentiment();
        response = `Market sentiment is currently ${sentiment.overall}.`;
    } else if (query.includes("analyze")) {
        const token = query.split(' ')[1];
        const analysis = await wand.analyzeToken(token);
        response = `Analysis for ${token}: Market Cap - ${analysis.marketCap}, Volume - ${analysis.volume}.`;
    }

    res.send({ response });
});

app.listen(port, () => console.log(`ChatCryptic running on port ${port}`));
