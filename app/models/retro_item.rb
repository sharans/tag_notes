class RetroItem < ActiveRecord::Base
  acts_as_taggable
  CATEGORIES = ["positives", "concerns", "wishes"]
end