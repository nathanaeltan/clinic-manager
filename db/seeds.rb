
# patient2 = Patient.create!({:name => 'Patient 1', :phone => '9452919', :email => 'patient1@patient1.com', :diagnosis => 'diabetes', :user_id => 1})
# bloodtest2 = Test.create!({:name =>'HBA1C'})
# newMed = Medication.create!({:name => 'Insulin'})
# Med2 = Medication.create!({:name => 'Arcoxia'})
# appt1 = Appt.create!({:patient_id => 1, :time => '2019-11-30T10:00:00+08:00'})
# new = MedicationPatient.create!({:medication_id => 1, :patient_id => 1})
new2 = MedicationPatient.create!({:medication_id => 2, :patient_id => 1})
# apptTest1 = ApptTest.create!({:appt_id => 1, :test_id => 1})
