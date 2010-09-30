class DefaultValueForCount < ActiveRecord::Migration
  def self.up
    execute <<-SQL
      update retro_items set count = 1 where count is null;
    SQL

    change_column(:retro_items, :count, :integer, :default => 1)

  end

  def self.down
  end
end
