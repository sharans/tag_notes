class ItemsController < ApplicationController
  def new
    @item = RetroItem.new
    @available_tags = RetroItem.tag_counts
  end

  def create
    @item = RetroItem.new(params[:retro_item])
    (render :text => "Item saved succesfully" and return) if @item.save!
    render new
  end
end