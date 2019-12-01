class Test < ApplicationRecord
    has_many :appts, through: :appt_tests
end
