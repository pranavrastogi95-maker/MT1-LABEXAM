
const express = require('express');

const app = express();

app.use(express.json());

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
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Hospital Patient Management System</h1>');
});

// GET all patients
app.get('/patients', (req, res) => {
    res.json(patients);
});

// GET patient by ID
app.get('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id == req.params.id);

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
});

// POST add new patient
app.post('/patients', (req, res) => {
    const { id, name, age, disease, doctorName } = req.body;

    if (!id || !name || !age || !disease || !doctorName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const patient = { id, name, age, disease, doctorName };

    patients.push(patient);

    res.status(201).json({
        message: 'Patient added successfully',
        patient: patient
    });
});

// PUT update patient
app.put('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id == req.params.id);

    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    patient.name = req.body.name || patient.name;
    patient.age = req.body.age || patient.age;
    patient.disease = req.body.disease || patient.disease;
    patient.doctorName = req.body.doctorName || patient.doctorName;

    res.json({
        message: 'Patient updated successfully',
        patient: patient
    });
});

// DELETE patient
app.delete('/patients/:id', (req, res) => {
    const index = patients.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    patients.splice(index, 1);

    res.json({ message: 'Patient deleted successfully' });
});

// Invalid route
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
