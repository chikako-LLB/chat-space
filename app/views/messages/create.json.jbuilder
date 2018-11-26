# json形式で見た目を作るのに必要な項目
json.userName @message.user.name
json.date format_posted_time(@message.created_at)
json.content @message.content
json.imageUrl @message.image.url
