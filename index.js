require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

client.once('ready', () => {
    console.log('First name: Mister; middle name: period; last name: P.');
    console.log('Mr. P is ready to roll');
})

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) {
        if (!message.content.toLowerCase().includes('fuck mr. p')) return;
        message.reply(`What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.`)
    }

    var commandBody = message.content.slice(prefix.length);
    var args = commandBody.split(' ');
    var command = args.shift().toLowerCase();

    if (command === 'render') {
        message.reply("No, I don't hate render. I pity the fool.")
    }

    if (command === 'heroku') {
        message.reply("Float like Porter, sting like Mr. P. Heroku can't hit what Heroku can't see.")
    }
})

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/feedback', (req, res) => {
    let key = req.body.key;
    let cid = req.body.cid;
    let mes = req.body.message;
    console.log(key);
    console.log(cid);
    console.log(mes);
    if (key == process.env.MESSAGE_KEY) {
        console.log(client);
        let guild = client.guilds.cache.get('542888846271184896');
        if (guild && guild.channels.cache.get(cid)) {
            guild.channels.cache.get(cid).send(mes);
        } else {
            res.write('Invalid Guild or Server ID');
            res.write('Guild/Server ID: 542888846271184896');
            res.write(`Supplied Channel ID: ${cid}`);
            res.close();
        }
    } else {
        res.send('Invalid Access Key');
    }
})

router.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/agent-p.png');
})

app.use('/', router);

app.listen(9001, () => {
    console.log('Running on port 9001');
})

client.login(process.env.BOT_TOKEN)