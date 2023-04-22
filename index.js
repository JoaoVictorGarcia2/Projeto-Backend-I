const express = require("express");
const { v4: uuidv4 } = require('uuid');


const app = express();
const port = 8080;

app.use(express.json())

let Tarefas = [
    {
        id: '1',
        titulo: 'Atividade professor Leonardo',
        descricao: 'Fazer a atividade.',
        finalizada: false
    }
];

app.get('/getTarefas', (req, res) => {
    console.log(Tarefas);
    res.send(Tarefas);
});

app.get('/getTarefas/:id', (req, res) => {
    const tarefa = Tarefas.find(t => t.id === req.params.id);
    if (!tarefa) {
        res.status(404).send('Tarefa não encontrada');
    } else {
        res.send(tarefa);
    }
});

app.post('/includeTarefas', (req, res) => {
    const tarefa = {
        id: uuidv4(),
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        finalizada: false
    };
    Tarefas.push(tarefa);
    console.log(Tarefas);
    res.send(`<h1> A seguinte lista ${JSON.stringify(tarefa)} foi adicionada </h1>`);
});

app.put('/updateTarefas/:id', (req, res) => {
    const index = Tarefas.findIndex(t => t.id === req.params.id);
    if (index === -1) {
        res.status(404).send('Tarefa não encontrada');
    } else {
        const tarefa = {
            id: req.params.id,
            titulo: req.body.titulo || Tarefas[index].titulo,
            descricao: req.body.descricao || Tarefas[index].descricao,
            finalizada: req.body.finalizada || Tarefas[index].finalizada
        };
        Tarefas[index] = tarefa;
        console.log(Tarefas);
        res.send(`<h1> A seguinte lista ${JSON.stringify(tarefa)} foi atualizada </h1>`);
    }
});

app.delete('/deleteTarefas/:id', (req, res) => {
    Tarefas = Tarefas.filter(tarefa => tarefa.id !== req.params.id);
    console.log(Tarefas);
    res.json({ message: 'Tarefa removida' });
});

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});
//{
//    "titulo": "Comprar rosca",
//   "descricao": "Comprar rosca  no mercado",
//    "finalizada": true
//  }localhost:8080/includeTarefas
  
