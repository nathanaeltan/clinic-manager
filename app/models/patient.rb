class Patient < ApplicationRecord
  belongs_to :user
  has_many :medication_patients
  has_many :medications, through: :medication_patients

  has_many :appts
  has_many :tests
  has_many :appt_tests
  
end
