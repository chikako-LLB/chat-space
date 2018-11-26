// railsではデフォルトでturbolinksと呼ばれる読み込みを高速化する機能があるため画面遷移等で読み込まれたページでjsが読み込まれないことがある。
// これを回避するために再読み込みしてjqueryが正常に動作するようにしている。
$(document).on('turbolinks:load', function(){
// Jasonのデータを元にHTMLを組み立てる。
  function buildHTML(message){
    var message_content = message.content ? `<p class="lower-message__content">${message.content}</p>` : "";
    var image = message.image_url ? `<img class="lower-message__image" src="${message.image_url}" />`: "";
    var html =
      `<div class="chatmain__body__message__wrapper">
        <div class="chatmain__body__message__wrapper__member__name">
          ${message.user_name}
        </div>
        <div class="chatmain__body__message__wrapper__positing__time">
          ${message.date}
        </div>
        <div class="chatmain__body__message__wrapper__content">
          ${message_content}
          ${image}
        </div>
      </div>`;
    return html;
  };

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
  // //返ってきたJSONをdoneメソッドで受取り、function buildHTMLにデータを渡す。
    .done(function(data){
      var html = buildHTML(data);
      $('.chatmain__body').append(html);
      $('.chatmain__body').animate({scrollTop: $('.chatmain__body')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
  // アラートを表示する
    .fail(function(error){
      alert(error.responseText);
    });
    return false;
  });
});

