class Message < ApplicationRecord
  belongs_to :user
  belongs_to :groups

  validates :content, presence: true, unless: :image?
end
