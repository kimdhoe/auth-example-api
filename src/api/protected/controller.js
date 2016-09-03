export const create = (req, res) => {
  res.status(201).json({ user: req.user })
}
