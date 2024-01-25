import { fetchEvents } from './events.js';
import { setupEventForm } from './eventForm.js';


document.addEventListener('DOMContentLoaded', () => {
  fetchEvents();
  setupEventForm();
});