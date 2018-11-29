// railsではデフォルトでturbolinksと呼ばれる読み込みを高速化する機能があるため画面遷移等で読み込まれたページでjsが読み込まれないことがある。
// これを回避するために再読み込みしてjqueryが正常に動作するようにしている。
$(document).on('turbolinks:load', function(){
// ＊ーーーここからJsonのデータを使ってHTMLの組み立てーーー＊
  function buildHTML(message){
    var messageContent = message.content ? `<p class="lower-message__content">${message.content}</p>` : "";
    var messageImage = message.image ? `<img class="lower-message__image" src="${message.image}" />`: "";
    var html =
      `<div class="chatmain__body__message__wrapper" data-id="${message.id}">
        <div class="chatmain__body__message__wrapper__member__name">
          ${message.name}
        </div>
        <div class="chatmain__body__message__wrapper__positing__time">
          ${message.date}
        </div>
        <div class="chatmain__body__message__wrapper__content">
          ${messageContent}
          ${messageImage}
        </div>
      </div>`;
    return html;
  }
// ＊ーーーここからメッセージが送信された時の非同期通信ーーー＊
// SENDボタンが押されたらイベントを発火させ、ajaxを使ってアクションが動かす
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
  // //返ってきたJSONをdoneメソッドで受取りbuildHTMLにデータを渡す。
    .done(function(data){
      var html = buildHTML(data);
      $('.chatmain__body').append(html);
      $('.chatmain__body').animate({scrollTop: $('.chatmain__body')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(error){
      alert(error.responseText);
    })
    .always(function(){
      $('.submit').prop("disabled", false);
    })
  })
  // ＊ーーーここからメッセージの自動更新ーーー＊
  // ５秒(=5000ミリ秒)ごとに関数updateMessagを呼び出す
  var interval = setInterval(updateMessage,5000);

  function updateMessage() {
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      var messageAlreadyAdded = $('.chatmain__body__message__wrapper:last').data('id');
      $.ajax({
        url: location.href.json,
        type: 'GET',
        data: {id: messageAlreadyAdded},
        dataType: 'json'
      })
      .done(function(messages) {
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.chatmain__body').append(html);
          $('.chatmain__body').animate({scrollTop: $('.chatmain__body')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        clearInterval(interval);
        alert('自動更新に失敗しました');
      });
    }
  }
});
