import express from 'express';
import cors from 'cors'; 
import * as Empresas from './service/empresa.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).json("{'result':'ok'}");
})

app.get('/empresa', async (req, res) => {
    try {
        let nome = req.query.nome;
        let result;

        // Consultar o banco de dados
        if (nome) {
            result = await Empresas.consultar(nome);
        } else {
            result = await Empresas.consultar();
        }

        // Verificar se há resultados
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            // Se nenhum resultado for encontrado, retornar 404
            res.status(404).json({ erro: 'Nenhum recurso encontrado' });
        }
    } catch (error) {
        // Lidar com erros de forma adequada, por exemplo, retornando um status 500
        console.error('Erro na consulta:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});


app.get('/empresa/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Empresas.consultarPorId(id);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ erro: 'Recurso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao consultar empresa por ID:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});


app.post('/empresa',async(req,res)=>{
    try {
        const { nome, valor } = req.body; // Supondo que os dados enviados tenham campos 'nome' e 'valorDeMercado'

        // Chamar a função cadastrar com os dados recebidos
        const novaEmpresa = await Empresas.cadastrar(nome, valor);

        // Enviar uma resposta com os dados da nova empresa cadastrada
        res.status(201).json(novaEmpresa);
    } catch (error) {
        // Lidar com erros, se houver algum
        console.error('Erro ao cadastrar empresa:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
})

app.delete('/empresa/:id', async(req,res)=>{
    try{
        let id = req.params.id;
        let result = await Empresas.deletar(id);
        if(result.length == 0) {
            res.status(204);
        }
    } catch (error) {
        // Lidar com erros, se houver algum
        console.error('Erro ao deletar empresa:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
})
app.listen(3000,()=>{
    let data = new Date();
    console.log(`Sistema inicializado: \nInf:${data}`);
    console.log('http://localhost:3000/');
})