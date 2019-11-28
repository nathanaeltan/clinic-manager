class CreatePatients < ActiveRecord::Migration[6.0]
  def change
    create_table :patients do |t|
      t.string :name
      t.string :phone
      t.string :email
      t.string :diagnosis
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
