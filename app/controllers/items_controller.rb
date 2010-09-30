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

  def merge
    return unless params[:merge_ids]
    items = RetroItem.find(params[:merge_ids])
    first_item = items.first
    puts items.inspect
    items.each do |item|
      next if (item.category.downcase != first_item.category.downcase or item == first_item)
      first_item.tag_list.add(item.tag_list)
      first_item.update_attribute(:count, first_item.count + item.count)
      item.destroy
    end
    first_item.save!
    redirect_to :action => :list
  end
  
  def list
    @items = RetroItem.all
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