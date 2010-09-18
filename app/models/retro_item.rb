class RetroItem < ActiveRecord::Base
  acts_as_taggable
  CATEGORIES = ["Positives", "Concerns", "Wishes", "Risks"]

end