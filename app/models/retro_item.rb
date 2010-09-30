class RetroItem < ActiveRecord::Base
  CATEGORIES = [:positives, :concerns, :wishes, :risks]
  acts_as_taggable_on CATEGORIES

  def tag_list
    send(category.downcase.singularize+"_list") if category
  end

  def tag_list=(tags)
    send(category.downcase.singularize+"_list=", tags) if category
  end

end