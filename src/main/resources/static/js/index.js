// Шаблон для создания календаря взят с ресурса https://proglib.io/p/javascript-i-html-delaem-prostoy-kalendar-za-5-minut-2022-06-01  
//                                                     и допилен под задание Neoflex                                                            

var vacationDays;
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
      var dow = new Date(y, m, i).getDay(); // day of the week
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
            html += '<td id="highlight1" class="today highlight1">' + i + '</td>';
        }
        else if(checkHighlightedDate(i,m,y) == 2){
            html += '<td id="highlight2" class="today highlight2">' + i + '</td>';
        }
        else {
            html += '<td class="today">' + i + '</td>';
        }
      } else {
        if(checkHighlightedDate(i,m,y) == 1){
            html += '<td id="highlight1" class="normal highlight1">' + i + '</td>';
        }
        else if(checkHighlightedDate(i,m,y) == 2){
            html += '<td id="highlight2" class="normal highlight2">' + i + '</td>';
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

    if(getId("highlight1") != null)
        selectedTdFrst = getId("highlight1");
    if(getId("highlight2") != null)
        selectedTdScnd = getId("highlight2" );
    bindHighlighter(this.currMonth, this.currYear);
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

function bindHighlighter(currMonth, currYear){
    const regex = new RegExp("\\W");
    table.onclick = function(event) {
        let target = event.target; // где был клик?
        if (target.tagName != 'TD') return; // не на TD? тогда не интересует

        if(target.innerHTML.search(regex) == -1){
            highlight(target); // подсветить TD
            bindDay(target.innerHTML, currMonth, currYear)
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
            selectedTdFrst.classList.add('highlight1');
        }
        else{
            selectedTdScnd = td;
            selectedTdScnd.classList.add('highlight2');
        }
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

function bindDay(day, month, year){
    if(!pickedFirst){
        this.vacationStartsAtDay = parseInt(day);
        this.vacationStartsAtMonth = parseInt(month);
        this.vacationStartsAtYear = parseInt(year);
        pickedFirst = true; 
    }
    else{
        this.vacationEndsAtDay = parseInt(day);
        this.vacationEndsAtMonth = parseInt(month);
        this.vacationEndsAtYear = parseInt(year);
        pickedSecond = true;
    }

    getId("inputDate").value = day + "-" + (parseInt(month) + 1) + "-" + year;
}




// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}

var validInput1 = false;
var validInput2 = false;
var secondInputWasLast = false;
function sendRequest(){
    if(validInput1 || validInput2){ // проверяем среднюю годовую зарплату
        var x = new XMLHttpRequest();
         
        if(secondInputWasLast) 
            yearSalary = getId("inputSalary2").value;
        else
            yearSalary = getId("inputSalary1").value;
        
        requestString = "/calculate?";
        if(validateDate(vacationStartsAtDay, vacationStartsAtMonth, vacationStartsAtYear)){ // если есть значение даты начала отпуска
            vacationStartsAt = vacationStartsAtDay + "-" + (vacationStartsAtMonth + 1) + "-" + vacationStartsAtYear;
            if(Number(vacationDays) != NaN && vacationDays != undefined && secondInputWasLast){ // если определено количество дней оптуска 
                requestString += "yearSalary=" + yearSalary +
                                        "&vacationStartsAt=" + vacationStartsAt +
                                        "&vacationDays=" + vacationDays;
            }
            else{ // если не определено колиечество дней отпуска
                if(validateDate(vacationStartsAtDay, vacationStartsAtMonth, vacationStartsAtYear)){ // если определена дата конца отпуска
                    vacationEndsAt = vacationEndsAtDay + "-" + (vacationEndsAtMonth + 1) + "-" + vacationEndsAtYear;
                    requestString += "yearSalary=" + yearSalary +
                                            "&vacationStartsAt=" + vacationStartsAt +
                                            "&vacationEndsAt=" + vacationEndsAt;
                }
            }
        }
        else{ // если нет знаения даты начала отпуска
            if(Number(vacationDays) != NaN && vacationDays != undefined) // если есть кол-во дней отпуска
                requestString += "yearSalary=" + yearSalary +
                                    "&vacationDays=" + vacationDays;
        }
        x.onreadystatechange = function () {
            if (x.readyState == XMLHttpRequest.DONE){
                result = getId("result");
                result.innerHTML = "Отпусные: " + JSON.parse(x.responseText).holidayPay;
            }
        }
        x.open("GET", requestString, true);
        x.send(null);
    }
}


function frstInput(){
    let input = {Name: "inputSalary1", Valid: validInput1}
    validateInput(input);
    validInput1 = input.Valid;
    secondInputWasLast = false;
}

function scndInput(){
    let input = {Name: "inputSalary2", Valid: validInput2}
    validateInput(input);
    validInput1 = input.Valid;
    secondInputWasLast = true;
}

function validateInput(input){
    let inp = getId(input.Name);
    if(inp != null){
        regex = new RegExp("[^\\d\\.]");
        if((inp.value.search(regex) == -1) && Number(inp.value) != NaN){
            input.Valid = true;
            inp.style.color = "black";
        }
        else {
            input.Valid = false;
            inp.style.color = "red";
        }
    }
}

function validateInputVacationDays(){
    let vacDays = getId("vacDays");
    if(parseInt(vacDays.value)){
        vacationDays = vacDays.value;
        vacDays.style.color = "black";
    }
    else{
        vacDays.style.color = "red";
    }
}

function validateInputDate() {
    let inputDate = getId("inputDate");
    regex = RegExp("\\d\\d-\\d\\d-\\d\\d\\d\\d");
    if(inputDate.value.search(regex) == 0)
        vacationStartsAt = inputDate.value;
}

function validateDate(str1, str2, str3){
    if(str1==undefined || str2 == undefined || str3 == undefined)
        return false;
    return true; 
}