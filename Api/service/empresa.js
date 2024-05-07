import  pool  from '../data/index.js';

export const consultar = async (filtro = '') => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = `SELECT * FROM empresa WHERE empresa.nome LIKE ?`;
        const [dados, meta_dados] = await cx.query(cmdSql, [`%${filtro}%`]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM empresa WHERE empresa.id = ?';
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const cadastrar = async (Nome, ValorDeMercado) => {
    try {
        const cx = await pool.getConnection();
        // Inserir os dados na tabela empresa
        const cmdSql = 'INSERT INTO empresa(Nome, ValorDeMercado) VALUES (?, ?)';
        await cx.query(cmdSql, [Nome, ValorDeMercado]);

        // Recuperar o último ID inserido
        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        // Consultar a empresa recém-cadastrada pelo último ID
        const [dados, meta_dados] = await cx.query('SELECT * FROM empresa WHERE id = ?', [lastId]);
        cx.release();
        return dados;
    } catch (error) {
        throw error;
    }
};

export const alterar = async (Id, Nome, ValorDeMercado) => {
    try {
        const cx = await pool.getConnection();
        // Inserir os dados na tabela empresa
        const cmdSql = 'UPDATE empresa SET Nome = ?, ValorDeMercado = ? WHERE id=?';
        const exec = await cx.query(cmdSql, [Nome, ValorDeMercado, Id]);
        if(exec.affectedRows > 0){
            const [NovosDados, meta_dados] = await cx.query('SELECT * FROM empresa WHERE id = ?', [Id]);
        cx.release();
        return NovosDados
        }
        return exec;
    } catch (error) {
        throw error;
    }
};

export const deletar = async (Id) => {
    try {
        const cx = await pool.getConnection();
        // Inserir os dados na tabela empresa
        const cmdSql = 'DELETE FROM empresa WHERE Id = ?';
        const exec = await cx.query(cmdSql, [Id]);
        if(exec.affectedRows > 0){
            cx.release();
            return [];
        }
        cx.return();
    } catch (error) {
        throw error;
    }
};