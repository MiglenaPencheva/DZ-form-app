export function generateText(data) {

    let commentText = `${data.names}, ${data.gender} на ${data.birthDate}г. в ${data.birthPlace}; гражданство - ${data.nationality}; ${data.idType} ${data.passNumber}, изд. на ${data.issued}, вал. до ${data.expires}; ${data.direction} ${data.destination} с полет ${data.flight} на ${data.dateEvent} в ${data.flightTime}ч.
${data.invocation} ${data.names} твърди, че ${data.passed} ${data.procedure} на ${data.dateProcedure} в болница "${data.hospital}" - ${data.place}, за което ${data.medDocument} документ от болничното заведение.
ПРД (3м): "${data.prd}"; 
Фон в района: ${data.background} μSv/h; Дозиметър: ${data.dose} μSv/h; 
Идентификатор ${data.identifier} (събитие ${data.eventNumber}) - ${data.percent}% ${data.isotope};
След извършване на вторична проверка и снемане на установъчни данни, лицето бе пропуснато.`;


    let dzText = `На ${data.dateEvent} в ${data.eventTime}ч. беше генерирана Гама аларма с максимална стойност ${data.sigma}(сигми) на портален монитор lane_${data.lane}. След извършен видеопреглед на събитието, установих лицето, генерирало алармата:
${commentText}
Към докладната записка прилагам:
- протокол за вторична инспекция;
- копие от ${data.id};
${data.attachment}`;

    let protocolText1 = `${data.names}, ${data.gender} на ${data.birthDate}г. 
в ${data.birthPlace}; гражданство - ${data.nationality}; 
${data.idType} ${data.passNumber}, изд. на ${data.issued}, вал. до ${data.expires}; 
${data.direction} ${data.destination} 
с полет ${data.flight} на ${data.dateEvent} в ${data.flightTime}ч.`;

    let protocolText2 = `
${data.invocation} ${data.names} твърди, че на ${data.dateProcedure}г. 
${data.passed} ${data.procedure} 
в болница "${data.hospital}" - ${data.place}, 
за което ${data.medDocument} документ от болничното заведение.`;

    return { commentText, dzText, protocolText1, protocolText2 };
}
