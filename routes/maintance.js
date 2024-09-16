// routes/maintance.js
const express = require('express');
const router = express.Router();

// Importa modelos
const { AgeRange, HierarchicalLevel, ResponsabilityLevel, Gender } = require('../models');

// Ruta para obtener el rango de edad
router.get('/range-age', async (req, res) => {
  try {
    const ageRanges = await AgeRange.findAll();
    res.json({ results: ageRanges });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener rango de edades' });
  }
});

// Ruta para obtener los niveles jerárquicos
router.get('/hierarchical-level', async (req, res) => {
  try {
    const levels = await HierarchicalLevel.findAll();
    res.json({ results: levels });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener niveles jerárquicos' });
  }
});

// Ruta para obtener los niveles de responsabilidad
router.get('/responsability-level', async (req, res) => {
  try {
    const levels = await ResponsabilityLevel.findAll();
    res.json({ results: levels });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener niveles de responsabilidad' });
  }
});

// Ruta para obtener los géneros
router.get('/gender', async (req, res) => {
  try {
    const genders = await Gender.findAll();
    res.json({ results: genders });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener géneros' });
  }
});

module.exports = router;
