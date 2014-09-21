class Answer < ActiveRecord::Base
  attr_accessible :content, :question_id, :user_id

  belongs_to :question, inverse_of: :answers
  belongs_to :user, inverse_of: :answers

  validates :content, presence: true
  validates :question_id, numericality: true, presence: true
  validates :user_id, numericality: true, presence: true

  def write_at
    self.created_at.strftime("%H:%M le %d/%m/%Y")
  end

end
