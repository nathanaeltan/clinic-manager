class CreateApptTests < ActiveRecord::Migration[6.0]
  def change
    create_table :appt_tests do |t|
      t.references :appt, null: false, foreign_key: true
      t.references :test, null: false, foreign_key: true

      t.timestamps
    end
  end
end
