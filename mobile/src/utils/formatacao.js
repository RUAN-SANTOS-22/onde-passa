export function formatarNota(nota){
    if (!nota || nota === 0){
        return "Sem nota"
    }
    return `★ ${Number(nota).toFixed(1).replace('.', ',')}` 
}

export function formatarDuracao(minutos){
    if(!minutos || minutos === 0){
        return null
    }
    const horas = Math.floor(minutos / 60)
    const min = minutos % 60

    if(horas === 0){
        return `${min}min`
    }
    
    if(min === 0 ){
        return `${horas}h`
    }
    return `${horas}h ${min}min`
}

