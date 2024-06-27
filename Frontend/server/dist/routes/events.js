"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_1 = require("../controllers/events");
const router = (0, express_1.Router)();
router.get('/', events_1.getEvents);
router.post('/', events_1.createEvent);
router.delete('/:id', events_1.deleteEvent);
exports.default = router;
