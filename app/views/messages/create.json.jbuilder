# json形式で見た目を作るのに必要な項目
json.user_name @message.user.name
json.date format_posted_time(@message.created_at)
json.content @message.content
json.image_url @message.image.url
