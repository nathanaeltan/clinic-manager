require 'twilio-ruby'
client = Twilio::REST::Client.new('ACc9334a668f03e0dac9e34bcfed7e52c7', 'b3592a0035ef51d506eb5d3864d8958f')
message = client.messages.create(
  to: '+6594528617',
  from: '+12568587060',
  body: 'Reminder You have an Appt Coming Up'
)