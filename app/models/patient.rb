class Patient < ApplicationRecord
  belongs_to :user
  has_many :medication_patients ,  dependent: :destroy
  has_many :medications, through: :medication_patients

  has_many :appts,  dependent: :destroy
  has_many :tests,  dependent: :destroy
  has_many :appt_tests,  dependent: :destroy


  validates :name, presence: true
  validates :phone, presence: true



  
end
