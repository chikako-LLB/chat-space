# json形式でindexの見た目を作るのに必要な項目
json.array!(@messages) do |message|
  json.id message.id
  json.name message.user.name
  json.date format_posted_time(message.created_at)
  json.content message.content
  json.image message.image.url
end
