const express = require("express");
const router = express.Router();

let store = [
  { id: 1, name: "Alpha" },
  { id: 2, name: "Bravo" },
];

/* --------------------
   GET  /api
   Returns entire list
--------------------- */
router.get("/", (req, res) => {
  res.status(200).json({
    message: "GET – all items",
    data: store,
    meta: meta(req),
  });
});

/* --------------------
   GET  /api/:id
--------------------- */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = store.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({
      error: `Item ${id} not found`,
      meta: meta(req),
    });
  }

  res.status(200).json({
    message: "GET – item by ID",
    data: item,
    meta: meta(req),
  });
});

/* --------------------
   POST /api
   Body: { "name": "Charlie" }
--------------------- */
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const nextId = store.length ? Math.max(...store.map((i) => i.id)) + 1 : 1;
  const item = { id: nextId, name };
  store.push(item);

  res.status(201).json({
    message: "POST – created",
    data: item,
    meta: meta(req),
  });
});

/* --------------------
   PUT /api/:id
   Body: { "name": "Delta" }  
--------------------- */
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const idx = store.findIndex((i) => i.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: `Item ${id} not found` });
  }
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  store[idx].name = name;

  res.status(200).json({
    message: "PUT – updated",
    data: store[idx],
    meta: meta(req),
  });
});

/* --------------------
   DELETE /api/:id
--------------------- */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = store.findIndex((i) => i.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: `Item ${id} not found` });
  }

  store.splice(idx, 1);
  res.status(204).end();
});

function meta(req) {
  return { hostname: req.hostname, method: req.method };
}

module.exports = router;
