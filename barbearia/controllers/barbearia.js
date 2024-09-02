



const db = []
const nextId = 1
const model = (id = nextId++, body) => {
    if(
        body.nome != undefined &&
        body.fotos != undefined &&
        body.nome != "" &&
        Array.isArray(body.fotos) &&
        body.fotos.every(el => el != "") &&
        rede_controller.show(body.rede_id)
    ) {
    return {
        id,
        nome: body.nome,
        fotos: body.fotos,
        endereco: body.endereco,
        rede_id: body.rede_id
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