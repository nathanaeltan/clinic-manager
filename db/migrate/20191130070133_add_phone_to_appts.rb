class AddPhoneToAppts < ActiveRecord::Migration[6.0]
  def change
    add_column :appts, :phone, :string
  end
end
