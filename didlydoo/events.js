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

async function editEvent(eventId, dateIndex, allEvents) {
  const eventData = allEvents.find(event => event.id === eventId);
  if (eventData && eventData.dates[dateIndex]) {
    eventData.dates[dateIndex].available = !eventData.dates[dateIndex].available;
    await updateEvent(eventId, eventData);
  } else {
    console.error('Event not found!');
  }
}

async function updateEvent(eventId, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Error updating event');
    }

    fetchEvents();
  } catch (error) {
    console.error('Failed to update event:', error);
  }
}

export function displayEvents(events) {
  const eventsContainer = document.getElementById('events-container');
  eventsContainer.innerHTML = '';

  events.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    let datesHTML = event.dates.map((dateInfo, index) =>
      `<li class="event__date">
        ${dateInfo.date} - Available: 
        <input type="checkbox" class="event__available-checkbox" data-id="${event.id}" data-index="${index}" ${dateInfo.available ? 'checked' : ''}>
      </li>`
    ).join('');

    eventElement.innerHTML = `
      <h2 class="event__name">${event.name}</h2>
      <p class="event__author">${event.author}</p>
      <p class="event__description">${event.description}</p>
      <div class="event__dates">
        <ul>
          ${datesHTML}
        </ul>
      </div>
      <button class="event__delete-btn" data-id="${event.id}">Delete</button>
    `;
    eventsContainer.appendChild(eventElement);
  });

  document.querySelectorAll('.event__available-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const eventId = e.target.getAttribute('data-id');
      const dateIndex = e.target.getAttribute('data-index');
      editEvent(eventId, dateIndex, events); // pass 'events' here along with the date index
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
