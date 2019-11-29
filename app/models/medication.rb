class Medication < ApplicationRecord
    has_many :medication_patients
    has_many :patients, through: :medication_patients
end
