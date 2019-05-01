
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
      tbl.increments();

      tbl
        .text('name')
        .notNullable()

      tbl
        .integer('cohort_id')
        .references('cohort_id')    
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
