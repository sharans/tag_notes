require 'spec/spec_helper'

describe ItemsController do

  it "should merge specified items to the first in the list" do
    item1 = RetroItem.create!("category"=>"concerns", "count"=>"5", "tag_list"=>"C", "content"=>"content1")
    item2 = RetroItem.create!("category"=>"concerns", "count"=>"10", "tag_list"=>"A", "content"=>"content2")
    item3 = RetroItem.create!("category"=>"concerns", "count"=>"10", "tag_list"=>"B", "content"=>"content3")
    get :merge, :merge_ids => [item1.id, item2.id, item3.id]

    merged_item = RetroItem.find(item1.id)
    merged_item.should_not == nil
    merged_item.tag_list.sort.should == ["A","B","C"]
    merged_item.count.should == 25
    merged_item.content.should == 'content1'
    RetroItem.find_by_id(item2.id).should == nil
    RetroItem.find_by_id(item3.id).should == nil

  end
  
  it "should merge specified items only" do
    item1 = RetroItem.create!("category"=>"concerns", "count"=>"5", "tag_list"=>"C", "content"=>"content1")
    item2 = RetroItem.create!("category"=>"concerns", "count"=>"10", "tag_list"=>"A", "content"=>"content2")
    item3 = RetroItem.create!("category"=>"concerns", "count"=>"10", "tag_list"=>"B", "content"=>"content3")
    get :merge, :merge_ids => [item1.id, item2.id]

    new_item = RetroItem.find(item1.id)
    new_item.should_not == nil
    new_item.tag_list.sort.should == ["A","C"]
    new_item.count.should == 15
    RetroItem.find_by_id(item2.id).should == nil
    RetroItem.find_by_id(item3.id).should_not == nil
  end

  it "should merge items only if they are of same category" do
    item1 = RetroItem.create!("category"=>"concerns", "count"=>"5", "tag_list"=>"C", "content"=>"content1")
    item2 = RetroItem.create!("category"=>"concerns", "count"=>"10", "tag_list"=>"A", "content"=>"content2")
    item3 = RetroItem.create!("category"=>"risks", "count"=>"10", "tag_list"=>"B", "content"=>"content3")
    get :merge, :merge_ids => [item1.id, item2.id, item3.id]

    new_item = RetroItem.find(item1.id)
    new_item.should_not == nil
    new_item.tag_list.sort.should == ["A","C"]
    new_item.count.should == 15
    RetroItem.find_by_id(item2.id).should == nil
    RetroItem.find_by_id(item3.id).should_not == nil
  end

end