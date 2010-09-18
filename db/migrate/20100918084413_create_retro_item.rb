class CreateRetroItem < ActiveRecord::Migration
  def self.up
    create_table :retro_items do |t|
      t.column :content, :string
      t.column :category, :string
      t.column :count, :integer
      t.timestamps
    end
  end

  def self.down
     drop_table :retro_items
  end
end
