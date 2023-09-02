let vermilion = '#fed0b7';

function onNotTodayCheck() {
    document.getElementById('today').checked
        ? document.getElementById("eventDateInput").style.display = 'none'
        : document.getElementById("eventDateInput").style.display = 'inline-block';
}

function getDataAndGenerateText(event) {
    event.preventDefault();

    let messageAlert = [];

    function validateNumberElement(element, message) {
        let value = Number(element.value.trim());
        if (value == '' || isNaN(value) || Number(value) < 0) {
            messageAlert.push(message);
            element.style.background = vermilion;
            return;
        } else {
            element.style.background = 'none';
            return value;
        }
    }
    function validateTextElement(element, message) {
        let value = element.value.trim();
        if (value == '') {
            messageAlert.push(message);
            element.style.background = vermilion;
            return;
        } else {
            element.style.background = 'none';
            return value;
        }
    }
    function validateDateElement(element, message) {
        let value = element.value;
        if (value == '') {
            messageAlert.push(message);
            element.style.background = vermilion;
            return;
        } else {
            let valueArr = value.split('-');
            let valueStr = valueArr.reverse().join('.');
            element.style.background = 'none';
            return valueStr;
        }
    }

    // -----------------------  Event data  --------------------------

    let lane = validateNumberElement(document.getElementById('laneInput'), 'Попълни поле "lane" с число от 1 до 19');
    if (lane.toString.length == 1) lane = '0' + lane;
    let sigma = validateNumberElement(document.getElementById('sigmaInput'), 'Попълни поле "сигми" с положително число');
    let [month, day, year] = new Date().toLocaleString().split(',')[0].split('/');
    if (month.length == 1) month = '0' + month;
    if (day.length == 1) day = '0' + day;
    let dateEvent = day + '.' + month + '.' + year;
    if (document.getElementById('notToday').checked) {
        dateEvent = validateDateElement(document.getElementById('eventDateInput'), 'Въведи дата на събитието');
    }
    let eventTime = validateTextElement(document.getElementById('eventTimeInput'), 'Попълни поле "час на събитието"');

    // ------------------------  Result  --------------------------------

    let background = validateNumberElement(document.getElementById('backgroundInput'), 'Попълни поле "фон" с положително число');
    let dose = validateNumberElement(document.getElementById('doseInput'), 'Попълни поле "дозиметър" с положително число');
    let prd = validateNumberElement(document.getElementById('prdInput'), 'Попълни поле "пейджър" с число от 1 до 9');
    let identifier = document.getElementById('1171').checked ? '1171' : '220049';
    let eventNumber = validateNumberElement(document.getElementById('eventInput'), 'Попълни поле "събитие" с положително число');
    let percent = validateNumberElement(document.getElementById('percentInput'), 'Попълни поле "съвпадение" с число от 0 до 100');
    let isotope = validateTextElement(document.getElementById('isotopeInput'), 'Попълни поле "изотоп"');
    let endTime = validateTextElement(document.getElementById('endTimeInput'), 'Попълни поле "час на завършване на проверката"');

    // ----------------------  Personal data ------------------------------

    let names = validateTextElement(document.getElementById('namesInput'), 'Попълни поле "имена"');
    let gender = '';
    let invocation = 'Г-н';
    let passed = 'е преминал';
    if (document.getElementById('male').checked) {
        gender = 'роден';
    } else if (document.getElementById('female').checked) {
        gender = 'родена';
        invocation = 'Г-жа';
        passed = 'е преминала';
    } else messageAlert.push('Избери пол');
    let birthDate = validateDateElement(document.getElementById('birthDateInput'), 'Попълни поле "дата на раждане"');
    let birthPlace = validateTextElement(document.getElementById('birthPlaceInput'), 'Попълни поле "месторождение"');
    let nationality = validateTextElement(document.getElementById('nationalityInput'), 'Попълни поле "гражданство"');
    let id = '';
    if (document.getElementById('passport').checked) id = 'паспорт';
    else if (document.getElementById('idCard').checked) id = 'лична карта';
    else messageAlert.push('Избери документ за самоличност');
    let passNumber = validateTextElement(document.getElementById('passNumberInput'), 'Попълни номер на документ за самоличност');
    let issued = validateDateElement(document.getElementById('issuedInput'), 'Попълни дата на издаване');
    let expires = validateDateElement(document.getElementById('expiresInput'), 'Попълни дата на валидност');
    let flight = validateTextElement(document.getElementById('flightInput'), 'Попълни поле "полет"');
    let destination = validateTextElement(document.getElementById('destinationInput'), 'Попълни дестинация');
    let direction = '';
    if (document.getElementById('arrival').checked) direction = 'пристига на летище Бургас от';
    else if (document.getElementById('departure').checked) direction = 'заминава от летище Бургас за';
    else messageAlert.push('Избери направление');
    let flightTime = validateTextElement(document.getElementById('flightTimeInput'), 'Въведи часa на полета');
    let medDocument = '';
    let attachment = '';
    if (document.getElementById('hasDoc').checked) {
        medDocument = 'представя';
        attachment = '- документ от болничното заведение;';
    } else if (document.getElementById('noDoc').checked) {
        medDocument = 'не представя';
    } else {
        messageAlert.push('Избери представен ли е документ');
    }
    let procedure = 'курс на лечение с радиоактивен медицински изотоп';
    if (document.getElementById('scanner').checked) procedure = 'диагностика със скенер';
    let dateProcedure = validateDateElement(document.getElementById('dateProcedure'), 'Попълни дата на медицинската процедура');
    let hospital = validateTextElement(document.getElementById('hospitalInput'), 'Попълни име на болничното заведение');
    let place = validateTextElement(document.getElementById('placeInput'), 'Попълни град на болничното заведение');

    if (messageAlert.length > 0) {
        alert(messageAlert.join('\n'));
        return;
    }

    // ----------------------- generate comment --------------------------

    let commentText = `${names}, ${gender} на ${birthDate} в ${birthPlace}; гражданство - ${nationality}; ${id} ${passNumber}, изд. на ${issued}, вал. до ${expires}; ${direction} ${destination} с полет ${flight} на ${dateEvent} в ${flightTime}ч.
${invocation} ${names} твърди, че ${passed} ${procedure} на ${dateProcedure} в болница "${hospital}" - ${place}, за което ${medDocument} документ от болничното заведение.
ПРД (3м): "${prd}"; 
Фон в района: ${background} μSv/h; Дозиметър: ${dose} μSv/h; 
Идентификатор ${identifier} (събитие ${eventNumber}) - ${percent}% ${isotope};
След извършване на вторична проверка и снемане на установъчни данни, лицето бе пропуснато.`;

    document.getElementById('comment').textContent = commentText;

    // ----------------------- generate dz --------------------------

    let dzText = `На ${dateEvent} в ${eventTime}ч. беше генерирана Гама аларма с максимална стойност ${sigma}(сигми) на портален монитор lane_${lane}. След извършен видеопреглед на събитието, установих лицето, генерирало алармата:
${commentText}
Към докладната записка прилагам:
- протокол за вторична инспекция;
- копие от ${id};
${attachment}`;

    document.getElementById('dz').textContent = dzText;

    document.getElementById('comentarSection').scrollIntoView();
}

async function copyText(event) {
    let textForCopy = event.target.parentNode.querySelector('P').textContent;
    try {
        if (textForCopy.length > 0) {
            alert('Текстът е копиран.')
            await navigator.clipboard.writeText(textForCopy);
        } else {
            alert('Липсва текст.')
        }
    } catch (err) {
    }
}

function getProtocol(event) {
    alert('Функционалността не е имплементирана все още...')
}
