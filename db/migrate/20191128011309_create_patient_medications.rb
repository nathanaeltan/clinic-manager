class CreatePatientMedications < ActiveRecord::Migration[6.0]
  def change
    create_table :patient_medications do |t|
      t.references :patient
      t.references :medication

      t.timestamps
    end
  end
end
