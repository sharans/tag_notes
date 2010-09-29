class ItemsController < ApplicationController
  def new
    @item = RetroItem.new
    @available_tags = ActsAsTaggableOn::Tag.find(:all)
  end

  def create
    RetroItem.new(params[:retro_item]).save!
    flash[:notice] = "Item saved successfully"
    redirect_to :action => :new, :params => {:category => params[:retro_item][:category]}
  end

  def index
  end
  
  def tag_cloud
    RetroItem::CATEGORIES.each do |category|
      instance_variable_set("@#{category}_tags", RetroItem.tag_counts_on(category))
    end
  end
  
  def tag
    @items = RetroItem.tagged_with(params[:tag], :on => params[:category])
  end
  
end