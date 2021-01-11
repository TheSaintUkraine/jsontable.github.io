
$(document).ready(()=>{

  let columns = 3;
  let colum_html='';
  let data_result ={settings:{},data:[]};
  let keys = [];
  let row_obj={};
  let rows =1;
  let link;
  let load_data;
  let onload = false;
  let themeInd = 0;
  let maxThemes = 3;
  let darkTheme = false;



  function setTheme(num) {
    if (num == 0) {
      $('input,table,th,td').css('backgroundColor','white');
    }
    else if (num == 1) {
      $('input,table,th,td').css('backgroundColor','pink');
    }
    else if (num == 2) {
      $('input,table,th,td').css('backgroundColor','yellow');
    }
    else if (num == 3) {
      $('input,table,th,td').css('backgroundColor','gray')
    }
  }
  $('.sidebar-left, .sidebar-right').sortable({connectWith:'.sidebar-left, .sidebar-right',cancel: ''})
  $('.colorText').on('change',(e)=>{
    $('input').css({'color':$('.colorText').val()});
  })
  $('input').on('click',(e)=>{
    let clickedInput = $(e.target);
    $('textarea').val(clickedInput.val())
  })
  $('input').on('change',(e)=>{
    let clickedInput = $(e.target);
    $('textarea').val(clickedInput.val())
  })
  $('.button_left').on('click',()=>{
    themeInd--;
    if (themeInd == -1) {
      themeInd = maxThemes;
    }
    setTheme(themeInd);
    $('.theme').attr({src:'img/Theme'+themeInd+'.png',onclick:'setTheme('+themeInd+')'})
  });
  $('.button_right').on('click',()=>{
    themeInd++;
    if (themeInd == maxThemes+1) {
      themeInd = 0;
    }
    setTheme(themeInd);
    $('.theme').attr({src:'img/Theme'+themeInd+'.png',onclick:'setTheme('+themeInd+')'})
  });
  $('.Darktheme').on('click',()=>{
    if (darkTheme == false) {
      $('.Darktheme').html('White Theme');
      darkTheme = true;
      $('body').css('background-color','#242424');
      $('header').css('border-color','white');
      $('button').css({'background-color':'#525252','color':'white'});
      $('a').css({'color':'white'});
      $('p').css({'color':'white'});
      $('.modal p').css({'color':'black'});
      $('.sidebar').css('border-color','white');
    }
    else {
      $('.Darktheme').html('Dark Theme');
      darkTheme = false;
      $('body').css('background-color','white');
      $('header').css('border-color','black');
      $('button').css({'background-color':'transparent','color':'black'});
      $('a').css({'color':'black'});
      $('p').css({'color':'black'});
      $('.sidebar').css('border-color','black');
    }
  })

  function add_row() {
    colum_html = '';
    if (onload == false) {
      rows++;
    }
    for (var i = 0; i < columns; i++) {
      colum_html+='<td><input type="text"></td>';
    }
    $('table').append('<tr class="main">'+colum_html+'</tr>');
    setTheme(themeInd);
  }
  $('.add_row').on('click',add_row);
  $('.remove_row').on('click',()=>{
    rows--;
    $('tr').last().remove();
    setTheme(themeInd);
  });
  $('.remove_column').on('click',()=>{
    columns--;
    for (var i = 0; i <= rows; i++) {
      $('tr:eq('+i+') td').last().remove();
    }
    setTheme(themeInd);
  });
  $('.add_column').on('click',()=>{
    columns++;
    $('#heading').append('<td class="bold"><input type="text"></td>');
    $('.main').append('<td><input type="text"></td>');
    setTheme(themeInd);
  });



  $('.close_modal').on('click',()=>{
    $('.wrap-modal').css({'display':'none'});
  })



 //Export ; Load ; new
 $('.new').on('click',()=>{
   document.location.reload();
 })
  $('.export').on('click',()=>{
    data_result.settings={
      col:columns,
      keys:keys,
      name:$('.setName').val()
    }
    for (var i = 0; i != columns; i++) {
      keys.push($('#heading td:eq('+i+') input').val());
    }
    for (var a = 0; a != rows; a++) {
      row_obj={};
      for (var i = 0; i != columns; i++) {
        row_obj[keys[i]] = $('.main:eq('+a+') td:eq('+i+') input').val();
      }
      data_result.data.push(row_obj)
    }
    link = document.querySelector('.export');
    link.download = $('.setName').val()+'.json';
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(data_result)));
    $('.wrap-modal').css({'display':'block'});
  });

  $('.load').on('change',()=>{
    let fr = new FileReader();
    fr.readAsText(document.querySelector('.load').files[0]);
    fr.onload = ()=>{
      load_data = JSON.parse(fr.result);
      columns = load_data.settings.col;
      keys = load_data.settings.keys;
      rows = load_data.data.length;
      onload = true;
      $('.setName').val(load_data.settings.name)
      for (var i = 0; i != rows-1; i++) {
        add_row()
      }
      for (var i = 0; i < columns; i++) {
        $('#heading input:eq('+i+')').val(load_data.settings.keys[i]);
      }
      for (var a = 0; a < rows; a++) {
        for (var i = 0; i != columns; i++) {
          $('.main:eq('+a+') td:eq('+i+') input').val(load_data.data[a][keys[i]]);
        }
      }
    }
  })
})
