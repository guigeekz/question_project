class Question < ActiveRecord::Base
  attr_accessible :subject, :user_id, :views

  belongs_to :user

  before_create :initialize_views

  validates :subject, presence: true
  validates :user_id, numericality: true, presence: true

  def initialize_views
    self.views = 0
  end

end
