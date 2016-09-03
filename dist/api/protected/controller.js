"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var create = exports.create = function create(req, res) {
  res.status(201).json({ user: req.user });
};