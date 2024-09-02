

const db = []
const nextId = 1
const model = (body, id = nextId++) => {
const telefone = body.telefone
        .replaceAll("-", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")

    let soNumeros = true

    telefone.split("").forEach(el => {
        if(isNaN(Number(el))) {
            soNumeros = false
        }
    })

    if (body.nome != undefined &&
        body.email != undefined &&
        telefone != undefined &&
        body.nome != "" &&
        body.email != "" &&
        body.email.includes("@") &&
        telefone != "" &&
        telefone.length >= 11 &&
        telefone.length <= 12 &&
        soNumeros
    ) {
        return {
            id,
            telefone: telefone,
            nome: body.nome,
            email: body.email,
            senha: body.senha
        }
    }
}


const store = body => {
    const novo = model(body)
    if(novo){
        db.push(novo)

        return 201
    }
    return 400
}

const index = () => db;

const show = id => db.find((el) => el.id == id)

const update = (id, body) => {
    const index = findIndex(el => el.id == id)
    const novo = model(body, parseInt(id))
    if(index != -1 && novo){
        db[index] = novo
        return 200
    }
    return 400
}

const destroy = (id) => {
    const index = db.find(el => el.id == id)
    if(index != -1){
        db.splice(index,1)
        return 200
    }
    return 400
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}