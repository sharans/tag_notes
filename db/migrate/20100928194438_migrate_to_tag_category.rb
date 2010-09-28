class MigrateToTagCategory < ActiveRecord::Migration
  def self.up
    execute <<-SQL
      update taggings set context = (select lower(category) from retro_items where retro_items.id = taggings.taggable_id);
    SQL
  end

  def self.down
    execute <<-SQL
      update taggings set context = 'tags';
    SQL
  end
end
