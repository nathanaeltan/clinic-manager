class CreateAppts < ActiveRecord::Migration[6.0]
  def change
    create_table :appts do |t|
      t.references :patient

      t.string :time

      t.timestamps
    end
  end
end
