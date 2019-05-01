const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

router.get("/", (req, res) => {
  db("cohorts")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json({ error: "Error loading cohort list", err }));
});

router.post("/", (req, res) => {
  db("cohorts")
    .insert(req.body)
    .then(response => {
      res.status(200).json({response, message: "Cohort successfully added"});
    })
    .catch(err => res.status(500).json({ error: "Error adding cohort", err }));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("cohorts")
    .where("id", id)
    .del()
    .then(response => {
      res.status(200).json({response, message: "Cohort successfully deleted"});
    })
    .catch(err => res.status(500).json({ error: "Error deleting cohort", err }));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db("cohorts")
    .where("id", id)
    .update(changes)
    .then(response => {
      res.status(200).json({response, message: "Cohort successfully updated"});
    })
    .catch(err => res.status(500).json({ error: "Error updating cohort", err }));
});

module.exports = router;