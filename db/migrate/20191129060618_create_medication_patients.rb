class CreateMedicationPatients < ActiveRecord::Migration[6.0]
  def change
    create_table :medication_patients do |t|
      t.belongs_to :medication
      t.belongs_to :patient
      t.timestamps
    end
  end
end
