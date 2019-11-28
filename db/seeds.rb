# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# patient2 = Patient.create!({:name => 'Patient 1', :phone => '9452919', :email => 'patient1@patient1.com', :diagnosis => 'diabetes', :user_id => 1})
# bloodtest2 = Test.create!({:name =>'HBA1C'})
# med1 = Medication.create!({:name => "Insulin"})
# appt1 = Appt.create!({:patient_id => 1, :time => '2019-11-30T10:00:00+08:00'})
# patMed = PatientMedication.create!({:patient_id => 1, :medication_id => 1})
apptTest1 = ApptTest.create!({:appt_id => 1, :test_id => 1})
