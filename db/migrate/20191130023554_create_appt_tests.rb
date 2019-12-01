class CreateApptTests < ActiveRecord::Migration[6.0]
  def change
    create_table :appt_tests do |t|
      t.belongs_to :appt
      t.belongs_to :test
      t.timestamps
    end
  end
end
