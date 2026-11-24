export function formatarNota(nota){
    if (!nota || nota === 0){
        return "Sem nota"
    }
    return `★ ${Number(nota).toFixed(1).replace('.', ',')}` 
}

