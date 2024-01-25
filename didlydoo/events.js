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
  
  export function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';
  
    events.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.className = 'event';
      let datesHTML = event.dates.map(dateInfo =>
        `<li class="event__date">${dateInfo.date} - Available: ${dateInfo.available ? 'Yes' : 'No'}</li>`
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