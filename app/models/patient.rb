class Patient < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :medication
  has_many :appointments
  has_many :blood_tests
  has_many :appt_tests
  
end
