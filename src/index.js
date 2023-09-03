import { data } from './dataObject.js';
import { generateText } from './generateText.js';

let vermilion = '#fed0b7';

document.getElementById('today').addEventListener('change', toggleDate);
document.getElementById('notToday').addEventListener('change', toggleDate);
document.getElementById('getDataBtn').addEventListener('click', getFormData);
document.getElementById('clearBtn').addEventListener('click', () => resetForm());
document.getElementById('copyComment').addEventListener('click', copyText);
document.getElementById('copyDz').addEventListener('click', copyText);
document.getElementById('copyProtocol1').addEventListener('click', copyText);
document.getElementById('copyProtocol2').addEventListener('click', copyText);

function toggleDate() {
    today.checked
        ? document.getElementById("eventDateInput").style.display = 'none'
        : document.getElementById("eventDateInput").style.display = 'inline-block';
}
function getFormData(event) {
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
    data.lane = validateNumberElement(document.getElementById('laneInput'), 'Попълни поле "lane" с число от 1 до 19');
    if (data.lane < 10) data.lane = '0' + data.lane;
    data.sigma = validateNumberElement(document.getElementById('sigmaInput'), 'Попълни поле "сигми" с положително число');
    let [month, day, year] = new Date().toLocaleString().split(',')[0].split('/');
    if (month.length == 1) month = '0' + month;
    if (day.length == 1) day = '0' + day;
    data.dateEvent = day + '.' + month + '.' + year;
    if (document.getElementById('notToday').checked) {
        data.dateEvent = validateDateElement(document.getElementById('eventDateInput'), 'Въведи дата на събитието');
    }
    data.eventTime = validateTextElement(document.getElementById('eventTimeInput'), 'Попълни поле "час на събитието"');
    // ------------------------  Result  --------------------------------
    data.background = validateNumberElement(document.getElementById('backgroundInput'), 'Попълни поле "фон" с положително число');
    data.dose = validateNumberElement(document.getElementById('doseInput'), 'Попълни поле "дозиметър" с положително число');
    data.prd = validateNumberElement(document.getElementById('prdInput'), 'Попълни поле "пейджър" с число от 1 до 9');
    data.identifier = document.getElementById('1171').checked ? '1171' : '220049';
    data.eventNumber = validateNumberElement(document.getElementById('eventInput'), 'Попълни поле "събитие" с положително число');
    data.percent = validateNumberElement(document.getElementById('percentInput'), 'Попълни поле "съвпадение" с число от 0 до 100');
    data.isotope = validateTextElement(document.getElementById('isotopeInput'), 'Попълни поле "изотоп"');
    data.endTime = validateTextElement(document.getElementById('endTimeInput'), 'Попълни поле "час на завършване на проверката"');
    // ----------------------  Personal data ------------------------------
    data.names = validateTextElement(document.getElementById('namesInput'), 'Попълни поле "имена"');
    if (document.getElementById('male').checked) {
        data.gender = 'роден';
        data.invocation = 'Г-н';
        data.passed = 'е преминал';
    } else if (document.getElementById('female').checked) {
        data.gender = 'родена';
        data.invocation = 'Г-жа';
        data.passed = 'е преминала';
    } else messageAlert.push('Избери пол');
    data.birthDate = validateDateElement(document.getElementById('birthDateInput'), 'Попълни поле "дата на раждане"');
    data.birthPlace = validateTextElement(document.getElementById('birthPlaceInput'), 'Попълни поле "месторождение"');
    data.nationality = validateTextElement(document.getElementById('nationalityInput'), 'Попълни поле "гражданство"');
    if (document.getElementById('passport').checked) data.idType = 'паспорт';
    else if (document.getElementById('idCard').checked) data.idType = 'лична карта';
    else messageAlert.push('Избери документ за самоличност');
    data.passNumber = validateTextElement(document.getElementById('passNumberInput'), 'Попълни номер на документ за самоличност');
    data.issued = validateDateElement(document.getElementById('issuedInput'), 'Попълни дата на издаване');
    data.expires = validateDateElement(document.getElementById('expiresInput'), 'Попълни дата на валидност');
    data.flight = validateTextElement(document.getElementById('flightInput'), 'Попълни поле "полет"');
    data.destination = validateTextElement(document.getElementById('destinationInput'), 'Попълни дестинация');
    if (document.getElementById('arrival').checked) data.direction = 'пристига на летище Бургас от';
    else if (document.getElementById('departure').checked) data.direction = 'заминава от летище Бургас за';
    else messageAlert.push('Избери направление');
    data.flightTime = validateTextElement(document.getElementById('flightTimeInput'), 'Въведи часa на полета');
    if (document.getElementById('hasDoc').checked) {
        data.medDocument = 'представя';
        data.attachment = '- документ от болничното заведение;';
    } else if (document.getElementById('noDoc').checked) {
        data.medDocument = 'не представя';
    } else {
        messageAlert.push('Избери представен ли е документ');
    }
    if (document.getElementById('scanner').checked) data.procedure = 'диагностика със скенер';
    data.dateProcedure = validateDateElement(document.getElementById('dateProcedure'), 'Попълни дата на медицинската процедура');
    data.hospital = validateTextElement(document.getElementById('hospitalInput'), 'Попълни име на болничното заведение');
    data.place = validateTextElement(document.getElementById('placeInput'), 'Попълни град на болничното заведение');

    // ----------------------  If all filled ------------------------------

    if (messageAlert.length > 0) {
        alert(messageAlert.join('\n'));
        return;
    } else {
        document.getElementById('comment').textContent = generateText(data).commentText;
        document.getElementById('dz').textContent = generateText(data).dzText;
        document.getElementById('protocol1').textContent = generateText(data).protocolText1;
        document.getElementById('protocol2').textContent = generateText(data).protocolText2;
        document.getElementById('commentSection').scrollIntoView();
    }
}

async function copyText(event) {
    let textForCopy = event.target.previousSibling.previousSibling.textContent;
    console.log(textForCopy);
    try {
        if (textForCopy.length > 0) {
            alert('Текстът е копиран.')
            await navigator.clipboard.writeText(textForCopy);
        } else {
            alert('Липсва текст.')
        }
    } catch (err) {
        console.log('copy problem:', err);
    }
}

