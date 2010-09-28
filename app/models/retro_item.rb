class RetroItem < ActiveRecord::Base
  acts_as_taggable_on :positives, :concerns, :wishes, :risks
  CATEGORIES = ["Positives", "Concerns", "Wishes", "Risks"]

  def tag_list
    send(category.downcase.singularize+"_list") if category
  end

  def tag_list=(tags)
    send(category.downcase.singularize+"_list=", tags) if category
  end
end