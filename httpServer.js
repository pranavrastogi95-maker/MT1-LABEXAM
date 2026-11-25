
const http = require('http');
const fs = require('fs');

let patients = [
    {
        id: 1,
        name: "Amit Kumar",
        age: 35,
        disease: "Fever",
        doctorName: "Dr. Sharma"
    },
    {
        id: 2,
        name: "Rahul Singh",
        age: 40,
        disease: "Diabetes",
        doctorName: "Dr. Verma"
    },
    {
        id: 3,
        name: "Priya Sharma",
        age: 25,
        disease: "Cold",
        doctorName: "Dr. Gupta"
    }
];

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Hospital Patient Management System</h1>');
    }

    else if (req.url === '/patients' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(patients));
    }

    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>City Hospital</h1><p>We provide the best healthcare services.</p>');
    }

    else if (req.url === '/add-patient' && req.method === 'POST') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const patient = JSON.parse(body);

                if (!patient.id || !patient.name || !patient.age ||
                    !patient.disease || !patient.doctorName) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'All fields are required' }));
                    return;
                }

                patients.push(patient);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Patient added successfully',
                    patient: patient
                }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON data' }));
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
