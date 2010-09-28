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
    @wishes_tags = RetroItem.tag_counts_on(:wishes)
    @risks_tags = RetroItem.tag_counts_on(:risks)
  end
  
  def tag
    @items = RetroItem.tagged_with(params[:tag], :on => params[:category])
  end
  
end