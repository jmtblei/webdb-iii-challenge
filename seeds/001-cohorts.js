
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Web 101'},
        {name: 'Web 102'},
        {name: 'Web 103'}
      ]);
    });
};
