$(document).on('turbolinks:load', function(){
// ＊ーーーJsonのデータを元にHTMLを組み立てるーーー＊
  var search_list = $("#user-search-result");
  var add_member = $("#chat-group-users");

  function appendUser(user) {
    var html =
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
      </div>`
    search_list.append(html);
  }
  function appendNoUser(user) {
      var html =
        `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
        </div>`
      search_list.append(html);
  }
  function addUser(id, name){
      var html =
        `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
          <input name='group[user_ids][]' type='hidden' value=${id}>
          <p class='chat-group-user__name'>${name}</p>
          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>`
      add_member.append(html);
    }
// ＊ーーー#user-search-fieldでのイベントを発火させるーーー＊
  $(function() {
    $('#user-search-field').on('keyup', function() {
      var input = $("#user-search-field").val();
      $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
// ＊ーーーー#user-search-fieldのjsonデータを受け取るーーーー＊
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  // ＊ーーーメンバーの追加ボタンでのイベントを発火させるーーー＊
  $(document).on('click', '.user-search-add', function() {
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    $(this).parent().remove()
    addUser(id, name);
  });
// ＊ーーーメンバーの削除ボタンでのイベントを発火させるーーー＊
  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove()
    });
  });
});
