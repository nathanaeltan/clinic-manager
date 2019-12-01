require 'twilio-ruby'
client = Twilio::REST::Client.new('ACc9334a668f03e0dac9e34bcfed7e52c7', 'f13e566d3db3edd674dfb624f1c964c9')
message = client.messages.create(
  to: '+6594528617',
  from: '+12568587060',
  body: 'Ahoy from Twilio!'
)