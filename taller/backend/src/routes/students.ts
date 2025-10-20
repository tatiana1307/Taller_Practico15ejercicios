import express from 'express';
import { Student } from '../types';

const router = express.Router();

// Mock database
let students: Student[] = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana.garcia@university.edu',
    age: 20,
    course: 'Computer Science',
    grade: 85,
    createdAt: new Date('2023-01-15')
  },
  {
    id: 2,
    name: 'Carlos López',
    email: 'carlos.lopez@university.edu',
    age: 22,
    course: 'Engineering',
    grade: 92,
    createdAt: new Date('2023-02-20')
  },
  {
    id: 3,
    name: 'María Rodríguez',
    email: 'maria.rodriguez@university.edu',
    age: 19,
    course: 'Mathematics',
    grade: 78,
    createdAt: new Date('2023-03-10')
  },
  {
    id: 4,
    name: 'José Martínez',
    email: 'jose.martinez@university.edu',
    age: 21,
    course: 'Physics',
    grade: 88,
    createdAt: new Date('2023-04-05')
  },
  {
    id: 5,
    name: 'Laura Sánchez',
    email: 'laura.sanchez@university.edu',
    age: 23,
    course: 'Chemistry',
    grade: 95,
    createdAt: new Date('2023-05-12')
  }
];

// Get all students
router.get('/', (req, res) => {
  const { course, minGrade, search } = req.query;
  
  let filteredStudents = [...students];
  
  // Filter by course
  if (course) {
    filteredStudents = filteredStudents.filter(s => 
      s.course.toLowerCase() === (course as string).toLowerCase()
    );
  }
  
  // Filter by minimum grade
  if (minGrade) {
    const minGradeNum = parseFloat(minGrade as string);
    filteredStudents = filteredStudents.filter(s => s.grade >= minGradeNum);
  }
  
  // Search by name or email
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredStudents = filteredStudents.filter(s => 
      s.name.toLowerCase().includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json(filteredStudents);
});

// Get student by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  res.json(student);
});

// Create new student
router.post('/', (req, res) => {
  const { name, email, age, course, grade } = req.body;
  
  if (!name || !email || !age || !course || grade === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const newStudent: Student = {
    id: students.length + 1,
    name,
    email,
    age: parseInt(age),
    course,
    grade: parseFloat(grade),
    createdAt: new Date()
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const { name, email, age, course, grade } = req.body;
  students[studentIndex] = {
    ...students[studentIndex],
    name: name || students[studentIndex].name,
    email: email || students[studentIndex].email,
    age: age !== undefined ? parseInt(age) : students[studentIndex].age,
    course: course || students[studentIndex].course,
    grade: grade !== undefined ? parseFloat(grade) : students[studentIndex].grade
  };
  
  res.json(students[studentIndex]);
});

// Delete student
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  students.splice(studentIndex, 1);
  res.status(204).send();
});

export default router;
