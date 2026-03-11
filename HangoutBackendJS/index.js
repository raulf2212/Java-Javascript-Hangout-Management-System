import express from 'express';
import net from 'net';

const app = express();
app.use(express.json());

const talk = (msg, res) => {
    const client = new net.Socket();
    client.connect(8080, 'ip_address', () => client.write(msg + '\n'));

    client.on('data', (d) => {
        const s = d.toString().trim();
        try { res.json(JSON.parse(s)); } catch (e) { res.json({ response: s }); }
        client.destroy();
    });

    client.on('error', () => {
        if (!res.headersSent) res.status(500).json({ response: "Connection Failed" });
    });
};

app.get('/hangouts', (req, res) => talk("GET_ALL", res));
app.get('/my-activity/:uid', (req, res) => talk(`GET_ACTIVITY|${req.params.uid}`, res));
app.delete('/hangout/:id', (req, res) => talk(`DELETE|${req.params.id}`, res));

app.post('/create-hangout', (req, res) => {
    const { title, leader_id, date_time, location, max_participants, description, category } = req.body;
    
    const newId = Date.now().toString(); 

    const message = `CREATE|${newId}|${title}|${leader_id}|${date_time}|${location}|${max_participants}|${description}|${category}`;
    
    talk(message, res);
});

app.post('/login', (req, res) => talk(`LOGIN|${req.body.id}`, res));

app.post('/join-hangout', (req, res) => talk(`JOIN|${req.body.hangoutId}|${req.body.userId}`, res));

app.listen(3000, () => console.log("Server running on 3000"));