class ItemsController < ApplicationController
  def new
    @item = RetroItem.new
    @available_tags = RetroItem.tag_counts
  end

  def create
    RetroItem.new(params[:retro_item]).save!
    render new
  end

  def index
  end
end