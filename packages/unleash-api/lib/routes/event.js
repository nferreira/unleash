'use strict';
const eventDiffer = require('../eventDiffer');

module.exports = function (app, config) {
    const eventDb = config.eventDb;

    app.get('/events', (req, res) => {
        eventDb.getEvents().then(events => {
            eventDiffer.addDiffs(events);
            res.json({ events });
        });
    });

    app.get('/events/:name', (req, res) => {
        eventDb.getEventsFilterByName(req.params.name).then(events => {
            if (events) {
                eventDiffer.addDiffs(events);
                res.json(events);
            } else {
                res.status(404).json({ error: 'Could not find events' });
            }
        });
    });
};
