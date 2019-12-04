class Appt < ApplicationRecord
  require 'twilio-ruby'
  validates :phone, presence: true
  validates :time, presence: true
  

  belongs_to :patient 
  has_many :tests, through: :appt_tests

  after_create :reminder



  def reminder
    @twilio_number = '+12563644368'
    @client = Twilio::REST::Client.new(ENV["TWILIO_ACC_SID"], ENV["TWILIO_AUTH_TOKEN"])
    date = (Date.parse(self.time)).strftime("%b. %d, %Y").slice(0, 13)
    time = self.time[11..15]
    # time_str = (Date.parse(self.time)).strftime("%I:%M%p on %b. %d, %Y")
   
    body = " \n Your Appointment with Dr Tan's Clinic is confirmed. Details as follows \n Time: #{time} \n Date: #{date}."
    message = @client.messages.create(
      :from => @twilio_number,
      :to => self.phone,
      :body => body
    )
  end

  def when_to_run
    minutes_before_appt = 10.minutes
    time = minutes_before_appt
  end

  handle_asynchronously :reminder, :run_at => Proc.new { |i| i.when_to_run }

end
