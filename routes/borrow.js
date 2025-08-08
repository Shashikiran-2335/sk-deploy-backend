const express = require('express');
const mongoose = require('mongoose');
const Borrow = require('../models/Borrow');
const router = express.Router();

// POST: Add new borrow entry
router.post('/', async (req, res) => {
  try {
    const newBorrow = new Borrow(req.body);
    await newBorrow.save();
    res.status(201).json({ message: 'Borrow entry saved successfully!' });
  } catch (error) {
    console.error('Error saving borrow entry:', error.message);
    res.status(500).json({ error: 'Server error saving borrow entry.' });
  }
});

// GET: Fetch all borrow entries
router.get('/', async (req, res) => {
  try {
    const entries = await Borrow.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching entries" });
  }
});

// DELETE: Remove a borrow entry
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deleted = await Borrow.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Borrow entry not found' });
    }
    res.json({ message: 'Borrow entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting borrow entry:', err.message);
    res.status(500).json({ message: 'Server error deleting entry' });
  }
});

// GET: Fetch unique customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Borrow.distinct('customerName');
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

module.exports = router;
