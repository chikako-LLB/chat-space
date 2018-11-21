FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/uploads/message/image/2/header.png")
    user
    group
  end
end
