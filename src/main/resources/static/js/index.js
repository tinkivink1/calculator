// Шаблон для создания календаря взят с ресурса https://proglib.io/p/javascript-i-html-delaem-prostoy-kalendar-za-5-minut-2022-06-01  
//                                                     и допилен под задание Neoflex                                                            

var vacationStartsAtDay, vacationStartsAtMonth, vacationStartsAtYear;
var vacationEndsAtDay, vacationEndsAtMonth, vacationEndsAtYear;
var pickedFirst = false;
var pickedSecond = false;
var selectedTdFrst, selectedTdScnd;

var Cal = function(divId) {
    
    
    //Сохраняем идентификатор div
    this.divId = divId;
    // Дни недели с понедельника
    this.DaysOfWeek = [
      'Пн',
      'Вт',
      'Ср',
      'Чтв',
      'Птн',
      'Суб',
      'Вск'
    ];  
    // Месяцы начиная с января
    this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    //Устанавливаем текущий месяц, год
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
    };
    // Переход к следующему месяцу
    Cal.prototype.nextMonth = function() {
        if ( this.currMonth == 11 ) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
        }
        else {
        this.currMonth = this.currMonth + 1;
        }
        this.showcurr();
    };
    // Переход к предыдущему месяцу
    Cal.prototype.previousMonth = function() {
        if ( this.currMonth == 0 ) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
        }
        else {
        this.currMonth = this.currMonth - 1;
        }
        this.showcurr();
    };
    // Показать текущий месяц
    Cal.prototype.showcurr = function() {
        this.showMonth(this.currYear, this.currMonth);
};
    // Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {
    
    var d = new Date()
    // Первый день недели в выбранном месяце 
    , firstDayOfMonth = new Date(y, m, 7).getDay()
    // Последний день выбранного месяца
    , lastDateOfMonth =  new Date(y, m + 1, 0).getDate()
    // Последний день предыдущего месяца
    , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table id="table">';
    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    // заголовок дней недели
    html += '<tr class="days">';
    for(var i=0; i < this.DaysOfWeek.length;i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    // Записываем дни
    var i=1;
    do {
      var dow = new Date(y, m, i).getDay();
      // Начать новую строку в понедельник
      if ( dow == 1 ) {
        html += '<tr>';
      }
      // Если первый день недели не понедельник показать последние дни предыдущего месяца
      else if ( i == 1 ) {
        html += '<tr>';
        var k = lastDayOfLastMonth - firstDayOfMonth+1;
        for(var j=0; j < firstDayOfMonth; j++) {
            html += '<td class="not-current">' + k + '</td>';
            k++;
        }
      }
      // Записываем текущий день в цикл
      var chk = new Date();
      var chkY = chk.getFullYear();
      var chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        if(checkHighlightedDate(i,m,y) == 1){
            html += '<td class="today highlight1">' + i + '</td>';
        }
        else if(checkHighlightedDate(i,m,y) == 2){
            html += '<td class="today highlight2">' + i + '</td>';
        }
        else {
            html += '<td class="today">' + i + '</td>';
        }
      } else {
        if(checkHighlightedDate(i,m,y) == 1){
            html += '<td class="normal highlight1">' + i + '</td>';
        }
        else if(checkHighlightedDate(i,m,y) == 2){
            html += '<td class="normal highlight2">' + i + '</td>';
        }
        else {
            html += '<td class="normal">' + i + '</td>';
        }
      }
      // закрыть строку в воскресенье
      if ( dow == 0 ) {
        html += '</tr>';
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if ( i == lastDateOfMonth ) {
        var k=1;
        for(dow; dow < 7; dow++) {
            html += '<td class="not-current">' + k + '</td>';
            k++;
        }
      }
      i++;
    } while(i <= lastDateOfMonth);
    // Конец таблицы
    html += '</table>';
    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;

    bindHighlighter(chkM, chkY);
};

  

  // При загрузке окна
  window.onload = function() {
    // Начать календарь
    var c = new Cal("divCal");			
    c.showcurr();
    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };

   
}


function bindDay(day, month, year){
    if(!pickedFirst){
        this.vacationStartsAtDay = day;
        this.vacationStartsAtMonth = month;
        this.vacationStartsAtYear = year;
        pickedFirst = true; 
    }
    else{
        this.vacationEndsAtDay = day;
        this.vacationEndsAtMonth = month;
        this.vacationEndsAtYear = year;
        pickedSecond = true;
    }
}
function checkHighlightedDate(day,month,year){
    if(day == vacationStartsAtDay &&
        month == vacationStartsAtMonth && 
        year == vacationStartsAtYear)
        return 1;
    if(day == vacationEndsAtDay &&
        month == vacationEndsAtMonth && 
        year == vacationEndsAtYear)
        return 2;
    return -1;
}
function bindHighlighter(chkM, chkY){
    const regex = new RegExp("\\W");
    table.onclick = function(event) {
        let target = event.target; // где был клик?
        if (target.tagName != 'TD') return; // не на TD? тогда не интересует

        if(target.innerHTML.search(regex) == -1){
            highlight(target); // подсветить TD
            bindDay(target.innerHTML, chkM, chkY)
        }
    };
    function highlight(td) {

        if(pickedFirst && pickedSecond){
            selectedTdFrst.classList.remove('highlight1');
            selectedTdScnd.classList.remove('highlight2');
            pickedFirst = false;
            pickedSecond = false;
        }

        if(td == selectedTdFrst)
            selectedTdFrst.classList.remove('highlight1');
        if(td == selectedTdScnd)
            selectedTdFrst.classList.remove('highlight2');

        if(!pickedFirst){
            selectedTdFrst = td;
            selectedTdFrst.classList.add('highlight1'); // подсветить новый td
        }
        else{
            selectedTdScnd = td;
            selectedTdScnd.classList.add('highlight2');
        }
    }
}


// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}


function sendRequest(){ 
    var x = new XMLHttpRequest();
    yearSalary = getId("inp").value;
    vacationStartsAt = vacationStartsAtDay + "-" + vacationStartsAtMonth + "-" + vacationStartsAtYear;
    vacationEndsAt   = vacationEndsAtDay + "-" + vacationEndsAtMonth + "-" + vacationEndsAtYear;
    requestString = "/calculate?" + "yearSalary=" + yearSalary +
                                    "&vacationStartsAt=" + vacationStartsAt +
                                    "&vacationEndsAt=" + vacationEndsAt;
                   
    x.open("GET", requestString, true);
    x.send(null);
}