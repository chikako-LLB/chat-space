class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    respond_to do |format|
      format.html { @messages = @group.messages }
      format.json { @new_messages = @group.messages.where('id > ?', params[:id]) }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    # メッセージが保存された場合
    if @message.save
      respond_to do |format|
      format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
      format.json
      end
    #メッセージが保存されなかった場合
    else
      respond_to do |format|
        format.html do
          @messages = @group.messages.includes(:user)
          flash.now[:alert] = 'メッセージを入力してください。'
          render :index
        end
        format.json { render json: 'メッセージを入力してください。', status: :unprocessable_entity }
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user: current_user)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
