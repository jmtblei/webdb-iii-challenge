const router = require("express").Router();
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

router.get('/', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}); 

router.get('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .first()
    .then(response => {
        if(response) {
            res.status(200).json(response)
        } else {
            res.status(404).json({ message: "Cohort was not found!" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Error loading cohort list", err })
    })
});

router.get('/:id/students', (req, res) => {
    const id = req.params.id;
    db('cohorts')
      .join('students', 'students.cohort_id', 'cohorts.id')
      .select('students.id', 'students.name')
      .where('cohorts.id', id)
      .first()
      .then(response => {
        if (response) {
          res.status(200).json(response);
        } else {
          res.status(404).json({ message: "No students were found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "Error loading student list", err });
      });
});

router.post('/', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body);
        const cohort = await db('cohorts')
        .where({ id })
        .first()
        res.status(201).json({cohort, message: "Cohort successfully added"})
    } catch (err) {
        res.status(500).json({ error: "Error adding cohort", err })
    }
});

router.put('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
        if (count > 0) {
        db('cohorts')
        .where({ id: req.params.id })
        .first()
        .then(response => {
            res.status(200).json({response, message: "Cohort successfully updated"})
        })
    } else {
        res.status(404).json({ message: "Cohort id was not found"})
    }
    })
    .catch(err => {
        res.status(500).json({ error: "Error updating cohort", err })
    })
});

router.delete('/:id', (req, res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .del(req.body)
    .then(count => {
        if (count > 0) {
        db('cohorts')
        .where({ id: req.params.id })
        .first()
        .then(response => {
            res.status(200).json({response, message: "Cohort successfully deleted"})
        })
    } else {
        res.status(404).json({ message: "Cohort id was not found!"})
    }
    })
    .catch(err => {
        res.status(500).json({ error: "Error deleting cohort", err })
    })
});

module.exports = router;