
$(document).ready(()=>{

  let columns = 3;
  let colum_html='';
  let data_result =[];
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
      $('a').css({'background-color':'#525252','color':'white'});
      $('label p').css({'background-color':'#525252','color':'white'});
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
      $('a').css({'background-color':'transparent','color':'black'});
      $('label p').css({'background-color':'transparent','color':'black'});
      $('a').css({'color':'black'});
      $('p').css({'color':'black'});
      $('.sidebar').css('border-color','black');
    }
  })

  function add_column() {
    columns++;
    $('.main').append('<td><input type="text"></td>');
    setTheme(themeInd);
  }
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
  $('.add_column').on('click',add_column)


  $('.close_modal').on('click',()=>{
    $('.wrap-modal').css({'display':'none'});
  })



 //Export ; Load ; new
 $('.new').on('click',()=>{
   document.location.reload();
 })
  $('.export').on('click',()=>{
    keys =[]
    for (var i = 0; i != $('.main:eq(0) td').length; i++) {
      keys.push($('.main:eq(0) td:eq('+i+') input').val());
    }

    for (var a = 1; a != $('.main').length; a++) {
      row_obj={};
      for (var i = 0; i !=keys.length; i++) {
        row_obj[keys[i]] = $('.main:eq('+a+') td:eq('+i+') input').val();
      }
      data_result.push(row_obj)
    }
    console.log(keys);
    link = document.querySelector('.export');
    link.download = $('.setName').val()+'.json';
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(data_result)));
    $('.wrap-modal').css({'display':'block'});
  });

  $('.load').on('change',()=>{
    let fr = new FileReader();
    fr.readAsText(document.querySelector('.load').files[0]);
    fr.onload = ()=>{
      $('tr').remove()
      load_data = JSON.parse(fr.result);
      onload = true;
      $('.setName').val(document.querySelector('.load').files[0].name)
      keys =Object.keys( load_data[0] );
      columns = keys.length;
      for (var i = 0; i != load_data.length+1; i++) {
        add_row()
      }

      for (var a = 0; a != load_data.length; a++) {
        for (var i = 0; i != keys.length; i++) {
          $('.main:eq('+(a+1)+') td:eq('+i+') input').val(load_data[a][keys[i]]);
        }
      }
      for (var i = 0; i != keys.length; i++) {
        $('.main input:eq('+i+')').val(keys[i]);
      }
    }
  })
})
