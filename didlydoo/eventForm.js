import { fetchEvents } from './events';


export function setupEventForm() {
    const eventForm = document.getElementById('event-form');
    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const eventName = document.getElementById('event-name').value;
        const eventAuthor = document.getElementById('event-author').value;
        const eventDescription = document.getElementById('event-description').value;
        const eventDate = document.getElementById('event-date').value;


        if (!eventName || eventName.length > 256 || !eventAuthor || eventAuthor.length > 256 || !eventDescription || eventDescription.length > 256) {
            console.error('Validation failed');
            return;
        }

        const newEvent = {
            name: eventName,
            author: eventAuthor,
            description: eventDescription,
            dates: [eventDate]
        };

        try {
            const response = await fetch('http://localhost:3000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEvent)
            });
            if (response.ok) {
                
                eventForm.reset();
                
                fetchEvents();
            } else {
                console.error('Failed to create event:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting event:', error);
        }
    });
}