"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var show = exports.show = function show(req, res) {
  res.json({ user: req.user });
};