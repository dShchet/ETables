(function() {


  // Using this polyfill for safety.
  Element.prototype.hasClassName = function(name) {
    return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
  };
  
  Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
      this.className = this.className ? [this.className, name].join(' ') : name;
    }
  };
  
  Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
      var c = this.className;
      this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
    }
  };


    var  wrapYear={};
    wrapYear.cols_ = document.querySelectorAll('#headWrap  .wrapYear');
    [].forEach.call(wrapYear.cols_, function (col) {
        dropdawnBind(col, '.wrapYear');
    });

  // HeadBlocks
  var headBl={};
  headBl.id_ = 'headWrap';
    
  headBl.cols_ = document.querySelectorAll('#headWrap  .elDrag');
    [].forEach.call(headBl.cols_, function (col) {
        dropdawnBind(col, '.elDrag');
    });


  headBl.cols_ = document.querySelectorAll('#' + headBl.id_ + '.elDrag');
  headBl.dragSrcEl_ = null;
  
  headBl.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    headBl.dragSrcEl_ = this;
    this.addClassName('moving');
  };
  
  headBl.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); 
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  };
  
  headBl.handleDragEnter = function(e) {
    this.addClassName('over');
  };
  
  headBl.handleDragLeave = function(e) {
    this.removeClassName('over');
  };
  
  headBl.handleDrop = function(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }
  
    if ((headBl.dragSrcEl_ != this)&&
      ($(headBl.dragSrcEl_).hasClass('elDrag'))&&
      ($(this).hasClass('elDrag'))){
    
        headBl.dragSrcEl_.outerHTML = this.outerHTML;
        this.outerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  };
  
  headBl.handleDragEnd = function(e) {
    [].forEach.call(headBl.cols_, function (col) {
      col.removeClassName('over');
      col.removeClassName('moving');
    });
    headBl.reinst ();
  };
  
  headBl.handleClick = function(e) {
    [].forEach.call(headBl.cols_, function (col) {
      col.removeClassName('over');
      col.removeClassName('moving');
    });
    headBl.reinst ();
  };
  
  
  headBl.reinst = function (){
    headBl.cols_ = document.querySelectorAll('#' + headBl.id_ + ' .elDrag');
    [].forEach.call(headBl.cols_, function (col) {
      col.setAttribute('draggable', 'true');
      col.addEventListener('dragstart', headBl.handleDragStart, false);
      col.addEventListener('dragenter', headBl.handleDragEnter, false);
      col.addEventListener('dragover', headBl.handleDragOver, false);
      col.addEventListener('dragleave', headBl.handleDragLeave, false);
      col.addEventListener('drop', headBl.handleDrop, false);
      col.addEventListener('dragend', headBl.handleDragEnd, false);
    dropdawnBind(col, '.elDrag');
    });
  };
  headBl.unInst = function (){
    headBl.cols_ = document.querySelectorAll('#' + headBl.id_ + ' .elDrag');
    [].forEach.call(headBl.cols_, function (col) {
      col.setAttribute('draggable', 'false');
      col.removeAttribute('draggable');
      col.removeEventListener('dragstart', headBl.handleDragStart, false);
      col.removeEventListener('dragenter', headBl.handleDragEnter, false);
      col.removeEventListener('dragover', headBl.handleDragOver, false);
      col.removeEventListener('dragleave', headBl.handleDragLeave, false);
      col.removeEventListener('drop', headBl.handleDrop, false);
      col.removeEventListener('dragend', headBl.handleDragEnd, false);
    });
  };
  


// Blocks inside Rows

  var blocks={};
  blocks.id_ = 'content';
  blocks.cols_ = document.querySelectorAll('#' + blocks.id_ + '.wrapBlock');
  blocks.dragSrcEl_ = null;
  blocks.dragOrder = null;
  blocks.handleDragStart = function(e) {
    if(e.target.hasClassName('wrapBlock')){
      // console.log(e.target.getAttribute('data-block'));
        // blocks.dragOrder=e.target.getAttribute('data-block');
        e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text/html', this.outerHTML);
        blocks.dragSrcEl_ = this;
        this.addClassName('moving');
      }
  };
  
  blocks.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
  
    e.dataTransfer.dropEffect = 'move';
    return false;
  };
  
  blocks.handleDrop = function(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }
  
    if ((blocks.dragSrcEl_ != this)&&
      ($(blocks.dragSrcEl_).hasClass('wrapBlock'))&&
      ($(this).hasClass('wrapBlock'))){
      // console.log(blocks.dragOrder+":"+this.getAttribute('data-block') + ":" + blocks.dragSrcEl_.getAttribute('data-block'));
      if((!blocks.dragSrcEl_.hasClassName("wrapBlock1"))&&(!this.hasClassName("wrapBlock1"))){
        var orderTemp=blocks.dragSrcEl_.getAttribute('data-block');
        blocks.dragSrcEl_.setAttribute('data-block',this.getAttribute('data-block'));
        this.setAttribute('data-block',orderTemp);
      }else{
        var row=null;
        var wBlock=null;
        var rowTemp=null;
        if(blocks.dragSrcEl_.hasClassName("wrapBlock1")){
          row=blocks.dragSrcEl_;
          wBlock=this;
        }else{
          row=this;
          wBlock=blocks.dragSrcEl_;
        }
        rowNew=row.getAttribute('data-block');
        wBlNew=wBlock.getAttribute('data-block');

        if(Math.abs(wBlNew-rowNew)<=3){
          if(rowNew<wBlNew){
            rowNew=wBlNew;
            while (rowNew%3!==0) {rowNew++;}
          }else{
            rowNew=wBlNew;
            while (rowNew%3!==0) {rowNew--;}
          }
          row.setAttribute('data-block',rowNew);
        }else{
          if(rowNew<wBlNew){
            row.setAttribute('data-block',"9");
          }else{
            row.setAttribute('data-block',"3");
          }
        }
      }
    }else{console.log('not wrapBlock');}
    return false;
  };


  blocks.reinst = function (){
    blocks.cols_ = document.querySelectorAll('#' + blocks.id_ + ' .wrapBlock');
    [].forEach.call(blocks.cols_, function (col) {
      col.setAttribute('draggable', 'true');
      col.addEventListener('dragstart', blocks.handleDragStart, false);
      // col.addEventListener('mousedown', blocks.handleMousedown, false);
      // col.addEventListener('click', blocks.handleClick, false);
      col.addEventListener('dragenter', blocks.handleDragEnter, false);
      col.addEventListener('dragover', blocks.handleDragOver, false);
      col.addEventListener('dragleave', blocks.handleDragLeave, false);
      col.addEventListener('drop', blocks.handleDrop, false);
      col.addEventListener('dragend', blocks.handleDragEnd, false);
      // col.removeClassName('over');
      col.removeClassName('moving');
    });
    tableHide();
  }

  blocks.unInst = function (){
    blocks.cols_ = document.querySelectorAll('#' + blocks.id_ + ' .wrapBlock');
    [].forEach.call(blocks.cols_, function (col) {
      col.setAttribute('draggable', 'false');  
      col.removeAttribute('draggable');  
      col.removeEventListener('dragstart', blocks.handleDragStart, false);

      col.removeEventListener('dragenter', blocks.handleDragEnter, false);
      col.removeEventListener('dragover', blocks.handleDragOver, false);
      col.removeEventListener('dragleave', blocks.handleDragLeave, false);
      col.removeEventListener('drop', blocks.handleDrop, false);
      col.removeEventListener('dragend', blocks.handleDragEnd, false);
      // col.removeClassName('over');
      col.removeClassName('moving');
    });
    tableHide();
  }



// Tables inside top Row

  var tables={};
  tables.id_ = 'rightBlocks';
  tables.cols_ = document.querySelectorAll('#' + tables.id_ + '.tableBlock');
  tables.dragSrcEl_ = null;
  tables.handleDragStart = function(e) {
    if(e.target.hasClassName('tableBlock')){
        e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text/html', this.outerHTML);
        tables.dragSrcEl_ = this;
        this.addClassName('moving');
      }
  };
  
  tables.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
  
    e.dataTransfer.dropEffect = 'move';
    return false;
  };
  
  tables.handleDrop = function(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }
  
    if ((tables.dragSrcEl_ != this)&&
      ($(tables.dragSrcEl_).hasClass('tableBlock'))&&
      ($(this).hasClass('tableBlock'))){

      // tables.dragSrcEl_.outerHTML = this.outerHTML;
      // this.outerHTML = e.dataTransfer.getData('text/html');
      var startOrder=tables.dragSrcEl_.getAttribute('data-blockT');
      var endOrder=this.getAttribute('data-blockT');
      tables.dragSrcEl_.setAttribute('data-blockT',endOrder);
      this.setAttribute('data-blockT',startOrder);
    }else{console.log('not tableBlock');}
  
    return false;
  };
  
  tables.handleDragEnd = function(e) {
    tables.reinst ();
  };
  
  tables.reinst = function (){
    tables.cols_ = document.querySelectorAll('#' + tables.id_ + ' .tableBlock');
    [].forEach.call(tables.cols_, function (col) {
      col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
      col.addEventListener('dragstart', tables.handleDragStart, false);
      // col.addEventListener('mousedown', tables.handleMousedown, false);
      // col.addEventListener('click', tables.handleClick, false);
      col.addEventListener('dragenter', tables.handleDragEnter, false);
      col.addEventListener('dragover', tables.handleDragOver, false);
      col.addEventListener('dragleave', tables.handleDragLeave, false);
      col.addEventListener('drop', tables.handleDrop, false);
      col.addEventListener('dragend', tables.handleDragEnd, false);
      // col.removeClassName('over');
      col.removeClassName('moving');
    });
    tableHide();
  }
  tables.unInst = function (){
    tables.cols_ = document.querySelectorAll('#' + tables.id_ + ' .tableBlock');
    [].forEach.call(tables.cols_, function (col) {
      col.setAttribute('draggable', 'false'); 
      col.removeAttribute('draggable'); 
      col.removeEventListener('dragstart', tables.handleDragStart, false);

      col.removeEventListener('dragenter', tables.handleDragEnter, false);
      col.removeEventListener('dragover', tables.handleDragOver, false);
      col.removeEventListener('dragleave', tables.handleDragLeave, false);
      col.removeEventListener('drop', tables.handleDrop, false);
      col.removeEventListener('dragend', tables.handleDragEnd, false);
    });
    tableHide();
  }



// blocks inside top NPS

  var npsTables={};
  npsTables.id_ = 'npsTables';
  npsTables.cols_ = document.querySelectorAll('#' + npsTables.id_ + '.npsBlock');
  npsTables.dragSrcEl_ = null;
  npsTables.handleDragStart = function(e) {
    if(e.target.hasClassName('npsBlock')){
        e.dataTransfer.effectAllowed = 'move';

        npsTables.dragSrcEl_ = this;
        this.addClassName('moving');
      }
  };
  
  npsTables.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
  
    e.dataTransfer.dropEffect = 'move';
    return false;
  };
  
  npsTables.handleDrop = function(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }
  
    if ((npsTables.dragSrcEl_ != this)&&
      ($(npsTables.dragSrcEl_).hasClass('npsBlock'))&&
      ($(this).hasClass('npsBlock'))){
      // console.log("npsBlock");
      var startOrder=npsTables.dragSrcEl_.getAttribute('data-blockT');
      var endOrder=this.getAttribute('data-blockT');
      // console.log(npsTables.dragSrcEl_.getAttribute('data-blockT') + ":" + this.getAttribute('data-blockT'));
      npsTables.dragSrcEl_.setAttribute('data-blockT',endOrder);
      this.setAttribute('data-blockT',startOrder);
      // console.log(npsTables.dragSrcEl_.getAttribute('data-blockT') + ":" + this.getAttribute('data-blockT'));
    }else{console.log('not npsBlock');}
  
    return false;
  };
  
  npsTables.handleDragEnd = function(e) {
    npsTables.reinst ();
  };
  
  npsTables.reinst = function (){
    npsTables.cols_ = document.querySelectorAll('#' + npsTables.id_ + ' .npsBlock');
    [].forEach.call(npsTables.cols_, function (col) {
      col.setAttribute('draggable', 'true'); 
      col.addEventListener('dragstart', npsTables.handleDragStart, false);

      col.addEventListener('dragenter', npsTables.handleDragEnter, false);
      col.addEventListener('dragover', npsTables.handleDragOver, false);
      col.addEventListener('dragleave', npsTables.handleDragLeave, false);
      col.addEventListener('drop', npsTables.handleDrop, false);
      col.addEventListener('dragend', npsTables.handleDragEnd, false);
      // col.removeClassName('over');
      col.removeClassName('moving');
    });
    tableHide();
  }
  npsTables.unInst = function (){
    npsTables.cols_ = document.querySelectorAll('#' + npsTables.id_ + ' .npsBlock');
    [].forEach.call(npsTables.cols_, function (col) {
      col.setAttribute('draggable', 'false'); 
      col.removeAttribute('draggable'); 
      col.removeEventListener('dragstart', npsTables.handleDragStart, false);

      col.removeEventListener('dragenter', npsTables.handleDragEnter, false);
      col.removeEventListener('dragover', npsTables.handleDragOver, false);
      col.removeEventListener('dragleave', npsTables.handleDragLeave, false);
      col.removeEventListener('drop', npsTables.handleDrop, false);
      col.removeEventListener('dragend', npsTables.handleDragEnd, false);
      col.removeClassName('moving');
    });
    tableHide();
  }





  function tableHide(hide){
    $('.toHide_1').unbind().click(function(){$('.hide_1').toggle()});
    $('.toHide_2').unbind().click(function(){$('.hide_2').toggle()});
    $('.toHide_3').unbind().click(function(){$('.hide_3').toggle()});
    $('.toHide_4').unbind().click(function(){$('.hide_4').toggle()});
    $('.toHide_7').unbind().click(function(){$('.hide_7').toggle()});
    if(hide=='hide'){
      $('.hide_1').hide();
      $('.hide_2').hide();
      $('.hide_3').hide();
      $('.hide_4').hide();
      $('.hide_7').hide();
    }
  }
  tableHide('hide');
//redo this , its just one element, dontneed a cycle



function dropdawnBind(col, selector){
  if($(col).find($('.inputHelp').length)&&($(col).find($('select').length))){
    var select = $(col).find($('select'));
    var selected = $(col).find($('select option:selected'));
    var inputHelp=$(col).find($('.inputHelp'));
    inputHelp.val(selected.text());
    select.on('change', function() {
      var selected = $(col).find($('select option:selected'));
      inputHelp.val(selected.text());
      var options= select.find($('option'));
      [].forEach.call(options, function (opt) {
        opt.removeAttribute('selected')
      });
      selected.attr('selected', true);
      });
    }
  
    inputHelp.on('mousedown', function(e) {
      var mdown = document.createEvent("MouseEvents");
      mdown.initMouseEvent("mousedown", true, true, window, 0, e.screenX, e.screenY, e.clientX, e.clientY, true, false, false, true, 0, null);
      var clos=$(this).closest(selector)[0]
      clos.dispatchEvent(mdown);
    });
}



  function removeSize(){
    $("body").removeClass("size1 size2 size3 size4");
    $(".btSize1, .btSize2, .btSize3, .btSize4").removeClass("active");
  }
  function changeSize(sel,btn){
    $(btn).click(function(){
      removeSize();
      $("body").addClass(sel);
      $(btn).addClass("active");
    });
  }
  changeSize("size1",".btSize1");
  changeSize("size2",".btSize2");
  changeSize("size3",".btSize3");
  changeSize("size4",".btSize4");


//togle checkbox
$('#switch :checkbox').change(function() { 
    if (this.checked) {
      var start = new Date().getTime(); 
      headBl.reinst ();
      // rows.reinst ();
      blocks.reinst ();
      tables.reinst ();
      npsTables.reinst();
      $("body").removeClass("undraggable");
      $("body").addClass("draggable");
      var elapsed = new Date().getTime() - start; 
      // console.log("binding complete in " + elapsed);
    } else {
       var start = new Date().getTime(); 
       headBl.unInst();
       // rows.unInst();
       blocks.unInst();
       tables.unInst ();
       npsTables.unInst();
       $("body").removeClass("draggable");
       $("body").addClass("undraggable");
       var elapsed = new Date().getTime() - start; 
       // console.log("unBinding complete in " + elapsed);
    }
});


function isChrome49() {
  var test = navigator.userAgent.match(/chrom(?:e|ium)\/(\d+)\./i);
  if (test) {
    return (parseInt(test[1], 10) === 49);
  }
  return false;
}

if (isChrome49()) {
  var styles = document.createElement('style');
  styles.textContent = '.wrapYear{top:-3px!important;}';
  document.head.appendChild(styles);
}


  $('#hamb').click(function(){
    // $(this).toggleClass('open');
  });


//Rows inside "name"

    var updateOutput = function(e)
    {
        var list   = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
            output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
        } else {
            output.val('JSON browser support required for this demo.');
        }
    };

    // activate Nestable for list 1
    $('#nestable').nestable({
        group: 1
    })
    .on('change', updateOutput);

    // activate Nestable for list 2
    $('#nestable2').nestable({
        group: 1
    })
    .on('change', updateOutput);

    // output initial serialised data
    updateOutput($('#nestable').data('output', $('#nestable-output')));
    updateOutput($('#nestable2').data('output', $('#nestable2-output')));

    $('#nestable-menu').on('click', function(e)
    {
        var target = $(e.target),
            action = target.data('action');
        if (action === 'expand-all') {
            $('.dd').nestable('expandAll');
        }
        if (action === 'collapse-all') {
            $('.dd').nestable('collapseAll');
        }
    });

    $('#nestable3').nestable();

function hideWheels(){
  $('.wheelNHide').hide();
  $('.wheelRHide').hide();
  $('.wheelVHide').hide();
  $('.wheelMHide').hide();
}
$('.wheelN').unbind().click(function(){
  hideWheels();
  $('.wheelNHide').css("display","table-cell")});



$('.wheelTable>.title').click(function(){
  $(".tableOpt").toggle()
})


$.jqplot.config.enablePlugins = true;

var s1 = [[[1, 2800],[2,2100],[3,2450],[4,1400],[5,1750],[6,3500],[7,3150]]];

var ticks = ['M', 'T', 'W', 'Th','F','S','Su'];
 
gabe = {
  grid: {
      backgroundColor: '#fff',
      gridLineColor: '#fff',
            gridLineWidth: 0
  },
  seriesStyles: {
      color: "#1b96ba",
      lineWidth: 5
  },
}

graphColumn=$.jqplot('graphColumn', s1, {
    seriesDefaults:{
        renderer:$.jqplot.BarRenderer,
        pointLabels: { show:true }
    }
    ,    axes: {
        xaxis: {
            renderer: $.jqplot.CategoryAxisRenderer,
            ticks: ticks
        }
    }
});

graphColumn.themeEngine.newTheme('gabe', gabe);
graphColumn.activateTheme('gabe');


var s2 = [[[ 2800,1],[2100,2],[2450,3],[1400,4],[1750,5],[3500,6],[3150,7]]];
graphBar = $.jqplot('graphBar', s2, {
  seriesDefaults: {
      renderer:$.jqplot.BarRenderer,
      pointLabels: { show: true},
      shadowAngle: 180,
      rendererOptions: {
          barDirection: 'horizontal'
      }
  },

  rendererOptions: {
      varyBarColor: true
  }
  ,axes: {
        yaxis: {
            renderer: $.jqplot.CategoryAxisRenderer,
            ticks: ticks
        }
      }
    });
graphBar.themeEngine.newTheme('gabe', gabe);
graphBar.activateTheme('gabe');

var s1 = [[[1, 2800],[2,2100],[3,2450],[4,1400],[5,1750],[6,3500],[7,3150]]];
var line1 = [2800, 2100, 2450, 1400, 1750, 3500,3150];

var graphLine = $.jqplot('graphLine', [line1], {
    legend: {show:false},
    renderer:$.jqplot.BarRenderer,

    axes:{
      xaxis:{
      tickRenderer:$.jqplot.CanvasAxisTickRenderer
      }, 

      yaxis:{
        renderer:$.jqplot.LogAxisRenderer,
        tickRenderer:$.jqplot.CanvasAxisTickRenderer,
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      }
    }
});

graphLineTheme = {
  grid: {
      backgroundColor: '#fff',
      gridLineColor: '#fff',
            gridLineWidth: 0
  },
  seriesStyles: {
      color: "#fff",
      lineWidth: 5
  },
}
graphLine.themeEngine.newTheme('gabe', gabe);
graphLine.activateTheme('gabe');

//ColorPicker
$('.colorPicker').ColorPicker({
  color: '#0000ff'
  ,onSubmit: function(hsb, hex, rgb) {
        $('.colorPicker').css('color', '#' + hex);
      }
  });
$('.colorPicker1').ColorPicker({
  color: '#00ff00'
  ,onSubmit: function(hsb, hex, rgb) {
        $('.colorPicker1').css('color', '#' + hex);
      }
  });
$('.colorPicker2').ColorPicker({
  color: '#ff0000'
  ,onSubmit: function(hsb, hex, rgb) {
        $('.colorPicker2').css('color', '#' + hex);
      }
  });



function calPickmeup(input, button){
var pickOpt = {
    position       : 'bottom',
    hide_on_select : true,
    format         : "m-d-Y"
    // ,flat:true
  };
  var input = document.querySelector(input);
  var cal= pickmeup(input, pickOpt);
  $(button).click(function(){
    cal.show();
  });
  input.addEventListener('click', function (e) {
    requestAnimationFrame(function () {
      cal.hide();
    });
  });
}
calPickmeup('#tableDateFrom','#cal1')
calPickmeup('#tableDateTo','#cal2')
calPickmeup('#graphDateFrom','#cal3')
calPickmeup('#graphDateTo','#cal4')


$(" .volumeBlock tr:not(:first-child)> td:nth-child(1)").mouseenter(
  function(e){
    if($("body").hasClass("undraggable")){
      $('.wheelsWrap2, .shadow').css("left","0%");
      $('.wheelNHide,.wheelRHide,.wheelVHide,.wheelMHide,.wheelGraph').hide();
      $(".wheelTable").css("display","table-cell");
    }
});
$(" .volumeBlock tr:not(:first-child)> td:nth-child(2)").mouseenter(
  function(e){
  if($("body").hasClass("undraggable")){
    $('.wheelsWrap2, .shadow').css("left","0%");
    $('.wheelNHide,.wheelRHide,.wheelVHide,.wheelMHide,.wheelTable').hide();
    $(".wheelGraph").css("display","table-cell");
  }
});



$("#hamb").click(function() {
  $(".shadow1").show();
  $("#aside").css('left','0px')
})
$(".shadow1, .asideClose").click(function() {
  $(".shadow1").hide();
  $("#aside").css('left','-300px')
});


})();







