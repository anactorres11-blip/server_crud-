//const express = require ("express") // comon
import express from "express"// ESG
const app = express()
app.use(express.json())
let proximoId = 2

let LISTARALUNOS = [
    {
        id: 1, nome: "Victor"
    },
    {
        id: 35, nome: "Viviane"
    },
    {
        id: 36, nome: "Brito"
    }
]
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello World"
    })
})
app.get("/alunos", (req, res) => {
    res.status(200).json(LISTARALUNOS)
})

// Localiza Aluno
app.get("/alunos/:codigo", (req, res)=>{
    const idParametro = Number(req.params.codigo) // String, number, boo
    const aluno = LISTARALUNOS.find(a=>a.id===idParametro)
    if(!aluno){
        res.status(404).json({msg:"Aluno não encontrado"})
    }
    res.status(200).json(aluno)
})

//delete:
app.delete("/alunos/:codigo", (req, res)=>{
    const idParametro = Number(req.params.codigo) // String, number, boo
    const aluno = LISTARALUNOS.findIndex(a=>a.id===idParametro)
    console.log(aluno)

    if(aluno === -1){
        return res.status(404).json({msg:"Aluno não encontrado"})
    }
    LISTARALUNOS.splice(aluno,1)

    res.status(200).json({msg: "Aluno excluido com sucesso"})
})
app.delete("/alunos/", (req, res) =>{
    console.log("parametro: ", req.params)
    const idParametro = req.params.codigo ? Number(req.params.codigo) :0 
    if (idParametro === 0 ) {
        return res.status(400).json({msg:"Id é obrigatório"})
    } 
})

//alterar aluno
app.put("/alunos/:codigo", (req, res) => {
    const idParametro = Number(req.params.codigo) //string, number, boo
    const indiceAluno = LISTARALUNOS.findIndex(a => a.id === idParametro)
    const { nome } = req.body
    if (!indiceAluno) {
        return res.status(404).json({ msg: "Usuário não encontrado" })
    }
    if (!nome) {
        return res.status(400).json({ msg: "Nome é obrigatório" })
    }

    LISTARALUNOS[indiceAluno] ={id: idParametro, nome}
    
    res.status(200).json({msg: "Aluno atualizado com sucesso" , Indice: indiceAluno})

    // LISTARALUNOS.splice(aluno,1)
    // res.status(200).json(aluno,{msg:"Aluno excluido com sucesso!"})
})
app.put("/alunos/", (req,res)=> {
    console.log("Parametro:", req.params)
    const idParametro = req.params.codigo ? Number(req.params.codigo) :0   //variável fixa 
    if (idParametro ===0) {
        return res.status(400).json ({msg:"Id Parametro é obrigatório"})

    }
})

//Cadastro:
app.post("/alunos", (req, res) => {
    console.log(req.body)
    const { nome } = req.body;
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ msg: "Gentileza preencher o nome!" })
    }
   const id = LISTARALUNOS.length > 0 ? LISTARALUNOS[LISTARALUNOS.length - 1].id + 1 : 1

    const aluno = { id ,nome }
    LISTARALUNOS.push(aluno)
    res.status(201).json({ msg: "Aluno cadastrado com sucesso!" })
})

app.post("/alunos/:codigo", (req, res) =>{
    res.status(404).json({msg: "Não preencha o campo do id"})
})

app.listen(5000, () => {                        
    console.log("Servidor está ON")
})


// function saudacao(){
//     return"Hello World"
// }

// const saud =()=> {
//     return "Hello World"
// }