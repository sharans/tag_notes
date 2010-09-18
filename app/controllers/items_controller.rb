class ItemsController < ApplicationController
  def new
    @item = RetroItem.new
    @available_tags = RetroItem.tag_counts
  end

  def create
    RetroItem.new(params[:retro_item]).save!
    flash[:notice] = "Item saved successfully"
    redirect_to :new_item
  end

  def index
  end
  
  def tag_cloud
    @tags = RetroItem.tag_counts_on(:tags)
  end
  
  def tag
    @items = RetroItem.tagged_with(params[:tag])
  end
  
end