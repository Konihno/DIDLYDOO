async function deleteEvent(eventId) {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting event');
    }

    fetchEvents();
  } catch (error) {
    console.error('Failed to delete event:', error);
  }
}

async function toggleEventAvailability(eventId, date) {
  const toggle = !date.available; // inverse l'état de disponibilité
  try {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}/availability`, {
      method: 'PATCH', // ou 'PATCH' selon votre API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: date.date, available: toggle }), // envoie la nouvelle disponibilité
    });
    if (!response.ok) {
      throw new Error('Error updating event availability');
    }

    fetchEvents(); // rafraîchit la liste des événements
  } catch (error) {
    console.error('Failed to update event availability:', error);
  }
}

export function displayEvents(events) {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = '';

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';

    let datesHTML = event.dates.map(dateInfo =>
      `<div class="event__date">
        <span class="event__date-text">${dateInfo.date}</span>
        <div class="event__availability">
          Availability: <input type="checkbox" ${dateInfo.available ? 'checked' : ''}>
        </div>
      </div>`
    ).join('');

    eventElement.innerHTML = `
      <h2 class="event__name">${event.name}</h2>
      <p class="event__author">${event.author}</p>
      <p class="event__description">${event.description}</p>
      <div class="event__dates">${datesHTML}</div>
      <button class="event__delete-btn" data-id="${event.id}">Delete</button>
    `;
    eventsContainer.appendChild(eventElement);
  });

  // Ajout des écouteurs d'événements pour la case à cocher de disponibilité
  document.querySelectorAll('.event__availability input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const dateElement = e.target.closest('.event__date');
      const date = dateElement.querySelector('.event__date-text').innerText;
      const available = e.target.checked;
      const eventId = dateElement.closest('.event').querySelector('.event__delete-btn').getAttribute('data-id');
      toggleEventAvailability(eventId, { date, available });
    });
  });


  document.querySelectorAll('.event__delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.getAttribute('data-id');
      deleteEvent(eventId);
    });
  });
}



export async function fetchEvents() {
  try {
    const response = await fetch('http://localhost:3000/api/events');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const events = await response.json();
    displayEvents(events);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}
