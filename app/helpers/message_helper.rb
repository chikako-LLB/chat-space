module MessageHelper

  def format_posted_time(posting_time)
    posting_time.in_time_zone("Tokyo").strftime("%Y年%Y年%m月%d日 %H:%M:%S")
  end
end
