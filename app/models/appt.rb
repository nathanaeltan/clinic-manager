class Appt < ApplicationRecord
  require 'twilio-ruby'
  validates :phone, presence: true
  validates :time, presence: true
  

  belongs_to :patient 
  has_many :tests, through: :appt_tests

  after_create :reminder


  # client = Twilio::REST::Client.new('ACc9334a668f03e0dac9e34bcfed7e52c7', 'f13e566d3db3edd674dfb624f1c964c9')
  # message = client.messages.create(
  #   to: '+6594528617',
  #   from: '+12568587060',
  #   body: 'Ahoy from Twilio!'
  # )
  # Notify our appointment attendee X minutes before the appointment time
  def reminder
    @twilio_number = '+12563644368'
    @client = Twilio::REST::Client.new(ENV["TWILIO_ACC_SID"], ENV["TWILIO_AUTH_TOKEN"])
    
    time_str = (Date.parse(self.time)).strftime("%I:%M%p on %b. %d, %Y")
  
    body = "Hi Just a reminder that you have an appointment coming up with Dr Tan's Clinic at #{time_str}."
    message = @client.messages.create(
      :from => @twilio_number,
      :to => self.phone,
      :body => body,
    )
  end

  def when_to_run
    minutes_before_appt = 10.minutes
    time = minutes_before_appt
  end

  handle_asynchronously :reminder, :run_at => Proc.new { |i| i.when_to_run }

end
